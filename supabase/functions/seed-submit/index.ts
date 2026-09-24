import { createClient } from "npm:@supabase/supabase-js@2.49.1";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CONSENT_WORDING = "Send me Green Resonance Project news and updates.";
const CONSENT_VERSION = "seed-form-v1";
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const MAX_SEND_ATTEMPTS = 3;
const PRODUCTION_DOMAIN = "https://www.thegreenresonanceproject.org";
const FROM_ADDRESS =
  "The Green Resonance Project <noreply@thegreenresonanceproject.org>";
const REPLY_TO = "DivineStarRaven@gmail.com";
const EMAIL_RE = /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/;

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function genericSuccess(): Response {
  return jsonResponse({ ok: true });
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

function buildConfirmationEmail(
  name: string,
  confirmUrl: string,
): { html: string; text: string } {
  const safeName = name.replace(/[<>&"]/g, "");
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Confirm your Seed access request</title></head>
<body style="margin:0;padding:0;background-color:#0a0f0d;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f0d;">
<tr><td align="center" style="padding:40px 20px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0"
  style="max-width:560px;width:100%;background-color:#111916;border:1px solid rgba(16,185,129,0.2);border-radius:16px;">
<tr><td style="padding:40px 32px 24px;text-align:center;">
  <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.3em;color:rgba(16,185,129,0.6);text-transform:uppercase;">
    The Green Resonance Project</p>
  <h1 style="margin:0;font-size:24px;color:#e8e4d9;font-weight:normal;letter-spacing:0.05em;">
    Confirm Your Seed Access Request</h1>
</td></tr>
<tr><td style="padding:0 32px 24px;">
  <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:rgba(232,228,217,0.65);">
    Hello ${safeName},</p>
  <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:rgba(232,228,217,0.65);">
    Thank you for requesting Seed access. To confirm your email address and
    complete your request, please visit the link below and press the
    <strong style="color:rgba(232,228,217,0.85);">Confirm</strong> button.</p>
  <p style="margin:0 0 8px;font-size:14px;color:rgba(232,228,217,0.4);">
    This link expires in 24 hours. If you did not request this, you can safely ignore this email.</p>
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

  const text = `The Green Resonance Project — Confirm Your Seed Access Request

Hello ${name},

Thank you for requesting Seed access. To confirm your email address and
complete your request, visit the link below and press the Confirm button:

${confirmUrl}

This link expires in 24 hours. If you did not request this, you can safely
ignore this email.

---
The Green Resonance Project
thegreenresonanceproject.org`;

  return { html, text };
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
    const rawEmail: string = body.email ?? "";
    const rawName: string = body.name ?? "";
    const interests: string[] = Array.isArray(body.interests) ? body.interests : [];
    const message: string = body.message ?? "";
    const newsletterConsent: boolean = body.newsletter_consent === true;

    const email = rawEmail.toLowerCase().trim();
    const name = rawName.trim();

    if (!name || name.length > 200) return genericSuccess();
    if (!email || !EMAIL_RE.test(email) || email.length > 320) return genericSuccess();
    if (message.length > 5000) return genericSuccess();
    if (interests.length > 20) return genericSuccess();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const { count: recentAttempts } = await supabase
      .from("submission_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("identifier", email)
      .eq("action", "seed_submit")
      .gte("attempted_at", windowStart);

    if ((recentAttempts ?? 0) >= MAX_SUBMISSIONS_PER_WINDOW) return genericSuccess();

    await supabase.from("submission_rate_limits").insert({ identifier: email, action: "seed_submit" });

    const { data: existing } = await supabase
      .from("seed_membership_waitlist")
      .select("id, email_verified")
      .eq("email", email)
      .maybeSingle();

    let recordId: string;

    if (existing) {
      if (existing.email_verified) return genericSuccess();
      recordId = existing.id;
      await supabase
        .from("seed_membership_waitlist")
        .update({
          name,
          interests,
          message,
          newsletter_consent: newsletterConsent,
          consent_wording: newsletterConsent ? CONSENT_WORDING : null,
          consent_version: newsletterConsent ? CONSENT_VERSION : null,
          consent_recorded_at: newsletterConsent ? new Date().toISOString() : null,
        })
        .eq("id", recordId);
    } else {
      const { data: inserted, error: insertError } = await supabase
        .from("seed_membership_waitlist")
        .insert({
          name,
          email,
          interests,
          message,
          newsletter_consent: newsletterConsent,
          consent_wording: newsletterConsent ? CONSENT_WORDING : null,
          consent_version: newsletterConsent ? CONSENT_VERSION : null,
          consent_recorded_at: newsletterConsent ? new Date().toISOString() : null,
          email_verified: false,
        })
        .select("id")
        .single();

      if (insertError) {
        if (insertError.code === "23505") return genericSuccess();
        throw insertError;
      }
      recordId = inserted.id;
    }

    // Suppression check
    if (await isRecipientSuppressed(supabase, email)) {
      return genericSuccess();
    }

    const token = randomToken();
    const tokenHash = await sha256hex(token);

    await supabase
      .from("email_confirmation_tokens")
      .update({ consumed_at: new Date().toISOString() })
      .eq("record_id", recordId)
      .is("consumed_at", null);

    await supabase.from("email_confirmation_tokens").insert({
      token_hash: tokenHash,
      email,
      scope: "seed_waitlist",
      record_id: recordId,
      expires_at: new Date(Date.now() + TOKEN_EXPIRY_MS).toISOString(),
    });

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return jsonResponse({ ok: true, delivery: "unavailable" });
    }

    const domainReady = await checkResendDomainReady(RESEND_API_KEY, "thegreenresonanceproject.org");
    if (!domainReady) {
      console.error("Resend domain not verified");
      return jsonResponse({ ok: true, delivery: "unavailable" });
    }

    const confirmUrl = `${PRODUCTION_DOMAIN}/confirm-email?token=${token}`;
    const { html, text } = buildConfirmationEmail(name, confirmUrl);

    const result = await sendEmailWithRetry({
      apiKey: RESEND_API_KEY,
      to: email,
      subject: "Confirm your Seed access request",
      html,
      text,
      supabase,
      idempotencyKey: `seed_confirm_${recordId}_${tokenHash.slice(0, 16)}`,
      scope: "seed_confirmation",
      recordId,
    });

    return jsonResponse({ ok: true, delivery: result.sent ? "sent" : "uncertain" });
  } catch (err) {
    console.error("seed-submit error:", err);
    return jsonResponse({ error: "Internal error" }, 500);
  }
});
