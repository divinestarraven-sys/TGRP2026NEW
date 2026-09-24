import { createClient } from "npm:@supabase/supabase-js@2.49.1";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_COOLDOWN_MS = 2 * 60 * 1000;
const RESEND_LIMIT_PER_HOUR = 2;
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;
const MAX_SEND_ATTEMPTS = 3;
const PRODUCTION_DOMAIN = "https://www.thegreenresonanceproject.org";
const FROM_ADDRESS =
  "The Green Resonance Project <noreply@thegreenresonanceproject.org>";
const REPLY_TO = "DivineStarRaven@gmail.com";

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function sha256hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkResendDomainReady(
  apiKey: string,
  domain: string,
): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) return false;
    const body = await res.json();
    const domains: Array<{ name: string; status: string }> = body.data ?? body;
    return domains.some((d) => d.name === domain && d.status === "verified");
  } catch {
    return false;
  }
}

async function isRecipientSuppressed(
  supabase: ReturnType<typeof createClient>,
  email: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("suppressed_recipients")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  return data !== null;
}

async function sendEmailWithRetry(params: {
  apiKey: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
  supabase: ReturnType<typeof createClient>;
  idempotencyKey: string;
  scope: string;
  recordId: string;
}): Promise<{ sent: boolean; messageId?: string }> {
  const { apiKey, to, subject, html, text, headers, supabase, idempotencyKey, scope, recordId } = params;

  const { data: existing } = await supabase
    .from("email_dispatches")
    .select("id, status, resend_message_id")
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();

  if (existing?.status === "sent") {
    return { sent: true, messageId: existing.resend_message_id ?? undefined };
  }

  if (!existing) {
    await supabase.from("email_dispatches").insert({
      idempotency_key: idempotencyKey,
      recipient: to,
      subject,
      scope,
      record_id: recordId,
      status: "pending",
    });
  }

  for (let attempt = 1; attempt <= MAX_SEND_ATTEMPTS; attempt++) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_ADDRESS,
          reply_to: REPLY_TO,
          to,
          subject,
          html,
          text,
          headers: headers ?? {},
        }),
      });

      await supabase
        .from("email_dispatches")
        .update({ attempts: attempt, last_attempt_at: new Date().toISOString() })
        .eq("idempotency_key", idempotencyKey);

      if (res.ok) {
        const resBody = await res.json();
        const messageId = resBody?.id ?? null;
        await supabase
          .from("email_dispatches")
          .update({ status: "sent", resend_message_id: messageId })
          .eq("idempotency_key", idempotencyKey);
        return { sent: true, messageId: messageId ?? undefined };
      }

      const detail = await res.text().catch(() => "unknown");
      console.error(`Resend attempt ${attempt}/${MAX_SEND_ATTEMPTS}: ${res.status} ${detail}`);
      await supabase
        .from("email_dispatches")
        .update({ error_detail: `${res.status}: ${detail.slice(0, 500)}` })
        .eq("idempotency_key", idempotencyKey);
    } catch (err) {
      console.error(`Resend attempt ${attempt}/${MAX_SEND_ATTEMPTS} threw:`, err);
      await supabase
        .from("email_dispatches")
        .update({
          attempts: attempt,
          last_attempt_at: new Date().toISOString(),
          error_detail: String(err).slice(0, 500),
        })
        .eq("idempotency_key", idempotencyKey);
    }

    if (attempt < MAX_SEND_ATTEMPTS) {
      await new Promise((r) => setTimeout(r, attempt * 1000));
    }
  }

  await supabase
    .from("email_dispatches")
    .update({ status: "failed" })
    .eq("idempotency_key", idempotencyKey);
  return { sent: false };
}

function scopeLabel(scope: string): string {
  switch (scope) {
    case "seed_waitlist": return "Seed access request";
    case "mycelium_waitlist": return "Mycelium membership interest";
    case "newsletter": return "newsletter subscription";
    case "contact_newsletter": return "newsletter subscription";
    default: return "email";
  }
}

function buildResendConfirmationEmail(
  name: string,
  confirmUrl: string,
  scope: string,
): { html: string; text: string } {
  const safeName = name.replace(/[<>&"]/g, "");
  const label = scopeLabel(scope);
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Confirm your ${label}</title></head>
<body style="margin:0;padding:0;background-color:#0a0f0d;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f0d;">
<tr><td align="center" style="padding:40px 20px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0"
  style="max-width:560px;width:100%;background-color:#111916;border:1px solid rgba(16,185,129,0.2);border-radius:16px;">
<tr><td style="padding:40px 32px 24px;text-align:center;">
  <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.3em;color:rgba(16,185,129,0.6);text-transform:uppercase;">
    The Green Resonance Project</p>
  <h1 style="margin:0;font-size:24px;color:#e8e4d9;font-weight:normal;letter-spacing:0.05em;">
    New Confirmation Link</h1>
</td></tr>
<tr><td style="padding:0 32px 24px;">
  <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:rgba(232,228,217,0.65);">
    Hello ${safeName},</p>
  <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:rgba(232,228,217,0.65);">
    You requested a new confirmation link for your ${label}.
    Press the button below to confirm your email address.</p>
  <p style="margin:0;font-size:14px;color:rgba(232,228,217,0.4);">
    This link expires in 24 hours.</p>
</td></tr>
<tr><td align="center" style="padding:0 32px 32px;">
  <a href="${confirmUrl}"
     style="display:inline-block;padding:14px 32px;background-color:rgba(16,185,129,0.15);
            border:1px solid rgba(16,185,129,0.35);border-radius:999px;
            color:#10b981;text-decoration:none;font-size:14px;letter-spacing:0.1em;">
    Confirm Email Address</a>
</td></tr>
<tr><td style="padding:0 32px 24px;">
  <p style="margin:0;font-size:13px;line-height:1.5;color:rgba(232,228,217,0.35);">
    If the button does not work, copy and paste this URL into your browser:</p>
  <p style="margin:8px 0 0;font-size:13px;line-height:1.5;color:rgba(16,185,129,0.5);word-break:break-all;">
    ${confirmUrl}</p>
</td></tr>
<tr><td style="padding:16px 32px 32px;border-top:1px solid rgba(16,185,129,0.1);">
  <p style="margin:0;font-size:12px;color:rgba(232,228,217,0.25);text-align:center;">
    The Green Resonance Project &middot; thegreenresonanceproject.org</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  const text = `The Green Resonance Project — New Confirmation Link

Hello ${name},

You requested a new confirmation link for your ${label}.
Visit the link below and press the Confirm button:

${confirmUrl}

This link expires in 24 hours.

---
The Green Resonance Project
thegreenresonanceproject.org`;

  return { html, text };
}

async function activateNewsletter(
  supabase: ReturnType<typeof createClient>,
  email: string,
  firstName: string,
  consentWording: string | null,
  consentVersion: string | null,
  source: string,
): Promise<void> {
  const { data: existingSub } = await supabase
    .from("email_subscribers")
    .select("id, unsubscribed_at")
    .eq("email", email)
    .maybeSingle();

  if (existingSub?.unsubscribed_at) return;

  if (existingSub) {
    await supabase
      .from("email_subscribers")
      .update({
        email_verified: true,
        email_verified_at: new Date().toISOString(),
        newsletter_consent: true,
        consent_wording: consentWording,
        consent_version: consentVersion,
        consent_recorded_at: new Date().toISOString(),
      })
      .eq("id", existingSub.id)
      .is("unsubscribed_at", null);
  } else {
    await supabase.from("email_subscribers").insert({
      email,
      first_name: firstName,
      source,
      newsletter_consent: true,
      community_events_consent: false,
      email_verified: true,
      email_verified_at: new Date().toISOString(),
      consent_wording: consentWording,
      consent_version: consentVersion,
      consent_recorded_at: new Date().toISOString(),
    });
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const action: string = body.action ?? "";
    const rawToken: string = body.token ?? "";

    if (!rawToken || rawToken.length !== 64) {
      return jsonResponse({ status: "invalid" });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const tokenHash = await sha256hex(rawToken);

    // ===== CONFIRM =====
    if (action === "confirm") {
      const { data, error } = await supabase
        .rpc("consume_confirmation_token", { p_token_hash: tokenHash })
        .single();

      if (error) {
        console.error("consume_confirmation_token RPC error:", error);
        return jsonResponse({ status: "error" }, 500);
      }

      const result = data as {
        out_record_id: string | null;
        out_email: string | null;
        out_scope: string | null;
        out_status: string;
      };

      if (result.out_status === "confirmed") {
        // Activate newsletter if verified + consented, for scopes that carry consent
        if (result.out_scope === "seed_waitlist") {
          const { data: record } = await supabase
            .from("seed_membership_waitlist")
            .select("email, name, newsletter_consent, consent_wording, consent_version")
            .eq("id", result.out_record_id!)
            .maybeSingle();
          if (record?.newsletter_consent) {
            await activateNewsletter(
              supabase,
              record.email,
              record.name,
              record.consent_wording,
              record.consent_version,
              "seed_form_confirmed",
            );
          }
        } else if (result.out_scope === "newsletter") {
          const { data: record } = await supabase
            .from("email_subscribers")
            .select("email, first_name, consent_wording, consent_version, unsubscribed_at")
            .eq("id", result.out_record_id!)
            .maybeSingle();
          if (record && !record.unsubscribed_at) {
            // Already marked verified by consume function; no extra action needed
          }
        } else if (result.out_scope === "contact_newsletter") {
          const { data: record } = await supabase
            .from("contact_messages")
            .select("email, name, newsletter_consent, consent_wording, consent_version")
            .eq("id", result.out_record_id!)
            .maybeSingle();
          if (record?.newsletter_consent) {
            await activateNewsletter(
              supabase,
              record.email,
              record.name,
              record.consent_wording,
              record.consent_version,
              "contact_form_confirmed",
            );
          }
        }
        // mycelium_waitlist: no newsletter activation, just waitlist confirmation
      }

      return jsonResponse({ status: result.out_status });
    }

    // ===== RESEND =====
    if (action === "resend") {
      const { data: tokenRecord } = await supabase
        .from("email_confirmation_tokens")
        .select("email, scope, record_id")
        .eq("token_hash", tokenHash)
        .maybeSingle();

      if (!tokenRecord) return jsonResponse({ status: "resend_queued" });

      // Rate limit
      const windowStart = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { count: recentResends } = await supabase
        .from("submission_rate_limits")
        .select("*", { count: "exact", head: true })
        .eq("identifier", tokenRecord.email)
        .eq("action", "resend_confirmation")
        .gte("attempted_at", windowStart);

      if ((recentResends ?? 0) >= RESEND_LIMIT_PER_HOUR)
        return jsonResponse({ status: "resend_queued" });

      // Cooldown
      const { data: lastResend } = await supabase
        .from("submission_rate_limits")
        .select("attempted_at")
        .eq("identifier", tokenRecord.email)
        .eq("action", "resend_confirmation")
        .order("attempted_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (
        lastResend &&
        Date.now() - new Date(lastResend.attempted_at).getTime() < RESEND_COOLDOWN_MS
      )
        return jsonResponse({ status: "resend_queued" });

      // Look up the record by scope to get name and check verification status
      let recordName = "";
      let isVerified = false;
      const scope = tokenRecord.scope;

      if (scope === "seed_waitlist") {
        const { data: r } = await supabase
          .from("seed_membership_waitlist")
          .select("name, email_verified")
          .eq("id", tokenRecord.record_id)
          .maybeSingle();
        if (!r) return jsonResponse({ status: "resend_queued" });
        recordName = r.name;
        isVerified = r.email_verified;
      } else if (scope === "mycelium_waitlist") {
        const { data: r } = await supabase
          .from("mycelium_membership_waitlist")
          .select("name, email_verified")
          .eq("id", tokenRecord.record_id)
          .maybeSingle();
        if (!r) return jsonResponse({ status: "resend_queued" });
        recordName = r.name;
        isVerified = r.email_verified;
      } else if (scope === "newsletter") {
        const { data: r } = await supabase
          .from("email_subscribers")
          .select("first_name, email_verified")
          .eq("id", tokenRecord.record_id)
          .maybeSingle();
        if (!r) return jsonResponse({ status: "resend_queued" });
        recordName = r.first_name ?? "";
        isVerified = r.email_verified;
      } else if (scope === "contact_newsletter") {
        const { data: r } = await supabase
          .from("contact_messages")
          .select("name, email_verified")
          .eq("id", tokenRecord.record_id)
          .maybeSingle();
        if (!r) return jsonResponse({ status: "resend_queued" });
        recordName = r.name;
        isVerified = r.email_verified;
      } else {
        return jsonResponse({ status: "resend_queued" });
      }

      if (isVerified) return jsonResponse({ status: "resend_queued" });
      if (await isRecipientSuppressed(supabase, tokenRecord.email))
        return jsonResponse({ status: "resend_queued" });

      await supabase.from("submission_rate_limits").insert({
        identifier: tokenRecord.email,
        action: "resend_confirmation",
      });

      await supabase
        .from("email_confirmation_tokens")
        .update({ consumed_at: new Date().toISOString() })
        .eq("record_id", tokenRecord.record_id)
        .is("consumed_at", null);

      const newToken = randomToken();
      const newHash = await sha256hex(newToken);

      await supabase.from("email_confirmation_tokens").insert({
        token_hash: newHash,
        email: tokenRecord.email,
        scope,
        record_id: tokenRecord.record_id,
        expires_at: new Date(Date.now() + TOKEN_EXPIRY_MS).toISOString(),
      });

      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      if (!RESEND_API_KEY) {
        console.error("RESEND_API_KEY not configured");
        return jsonResponse({ status: "resend_queued" });
      }

      const domainReady = await checkResendDomainReady(RESEND_API_KEY, "thegreenresonanceproject.org");
      if (!domainReady) {
        console.error("Resend domain not verified");
        return jsonResponse({ status: "resend_queued" });
      }

      const confirmUrl = `${PRODUCTION_DOMAIN}/confirm-email?token=${newToken}`;
      const { html, text } = buildResendConfirmationEmail(recordName, confirmUrl, scope);

      await sendEmailWithRetry({
        apiKey: RESEND_API_KEY,
        to: tokenRecord.email,
        subject: `Confirm your ${scopeLabel(scope)}`,
        html,
        text,
        supabase,
        idempotencyKey: `resend_${tokenRecord.record_id}_${newHash.slice(0, 16)}`,
        scope: `${scope}_resend`,
        recordId: tokenRecord.record_id,
      });

      return jsonResponse({ status: "resend_queued" });
    }

    return jsonResponse({ status: "invalid" });
  } catch (err) {
    console.error("confirm-email error:", err);
    return jsonResponse({ error: "Internal error" }, 500);
  }
});
