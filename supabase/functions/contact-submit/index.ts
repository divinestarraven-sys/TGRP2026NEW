import { createClient } from "npm:@supabase/supabase-js@2.49.1";

const PRODUCTION_DOMAIN = "https://www.thegreenresonanceproject.org";
const FROM_ADDRESS = "The Green Resonance Project <noreply@thegreenresonanceproject.org>";
const REPLY_TO = "DivineStarRaven@gmail.com";
const EMAIL_RE = /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/;
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const MAX_SEND_ATTEMPTS = 3;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

/* ── helpers ── */

async function sha256hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomToken(): string {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  return [...buf].map((b) => b.toString(16).padStart(2, "0")).join("");
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
    const json = await res.json();
    const domains = json.data ?? json;
    if (!Array.isArray(domains)) return false;
    return domains.some(
      (d: { name: string; status: string }) =>
        d.name === domain && d.status === "verified",
    );
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
    .eq("email", email.toLowerCase())
    .maybeSingle();
  return !!data;
}

async function sendEmailWithRetry(params: {
  apiKey: string;
  to: string;
  from: string;
  reply_to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
  supabase: ReturnType<typeof createClient>;
  idempotencyKey: string;
  scope: string;
  recordId: string;
}): Promise<{ sent: boolean; messageId?: string }> {
  const {
    apiKey,
    to,
    from,
    reply_to,
    subject,
    html,
    text,
    headers: emailHeaders,
    supabase,
    idempotencyKey,
    scope,
    recordId,
  } = params;

  // 1. Idempotency check
  const { data: existing } = await supabase
    .from("email_dispatches")
    .select("status, resend_message_id")
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();

  if (existing?.status === "sent") {
    return { sent: true, messageId: existing.resend_message_id ?? undefined };
  }

  // 2. Upsert pending row
  await supabase.from("email_dispatches").upsert(
    {
      idempotency_key: idempotencyKey,
      scope,
      record_id: recordId,
      recipient: to,
      subject,
      status: "pending",
      attempts: 0,
    },
    { onConflict: "idempotency_key" },
  );

  // 3. Retry loop
  for (let attempt = 1; attempt <= MAX_SEND_ATTEMPTS; attempt++) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to,
          subject,
          html,
          text,
          ...(emailHeaders ? { headers: emailHeaders } : {}),
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const messageId = json.id ?? null;
        await supabase
          .from("email_dispatches")
          .update({
            status: "sent",
            resend_message_id: messageId,
            attempts: attempt,
            sent_at: new Date().toISOString(),
          })
          .eq("idempotency_key", idempotencyKey);
        return { sent: true, messageId: messageId ?? undefined };
      }

      const errBody = await res.text();
      await supabase
        .from("email_dispatches")
        .update({
          attempts: attempt,
          error_detail: `Attempt ${attempt}: ${res.status} – ${errBody.slice(0, 500)}`,
        })
        .eq("idempotency_key", idempotencyKey);
    } catch (err) {
      await supabase
        .from("email_dispatches")
        .update({
          attempts: attempt,
          error_detail: `Attempt ${attempt}: ${(err as Error).message}`,
        })
        .eq("idempotency_key", idempotencyKey);
    }

    // Backoff before next attempt (skip on last attempt)
    if (attempt < MAX_SEND_ATTEMPTS) {
      await new Promise((r) => setTimeout(r, attempt * 1000));
    }
  }

  // 4. Exhausted retries
  await supabase
    .from("email_dispatches")
    .update({ status: "failed" })
    .eq("idempotency_key", idempotencyKey);

  return { sent: false };
}

/* ── email template ── */

function buildConfirmationEmail(
  name: string,
  token: string,
): { html: string; text: string } {
  const confirmUrl = `${PRODUCTION_DOMAIN}/confirm-email?token=${token}&scope=contact_newsletter`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Confirm your newsletter subscription</title></head>
<body style="margin:0;padding:0;background-color:#0a0f0d;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f0d;">
<tr><td align="center" style="padding:40px 16px;">
  <table role="presentation" width="580" cellpadding="0" cellspacing="0"
    style="background-color:#111916;border-radius:12px;border:1px solid rgba(16,185,129,0.15);max-width:580px;width:100%;">
    <!-- Header -->
    <tr><td style="padding:32px 32px 0;text-align:center;">
      <p style="margin:0;font-size:14px;letter-spacing:2px;color:rgba(16,185,129,0.7);text-transform:uppercase;">
        The Green Resonance Project
      </p>
      <h1 style="margin:12px 0 0;font-size:24px;color:#e2e8f0;font-weight:normal;">
        Confirm Your Subscription
      </h1>
    </td></tr>
    <!-- Body -->
    <tr><td style="padding:24px 32px;">
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#cbd5e1;">
        Hello ${name},
      </p>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#cbd5e1;">
        Thank you for reaching out through our contact form. You also indicated that
        you'd like to receive Green Resonance Project news and updates.
      </p>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#cbd5e1;">
        Please confirm your subscription by clicking the button below:
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
        <tr><td align="center" style="background-color:rgba(16,185,129,0.9);border-radius:8px;">
          <a href="${confirmUrl}"
             style="display:inline-block;padding:14px 32px;color:#0a0f0d;font-size:16px;font-weight:bold;text-decoration:none;font-family:Georgia,'Times New Roman',serif;"
             target="_blank">
            Confirm Subscription
          </a>
        </td></tr>
      </table>
      <p style="margin:0 0 16px;font-size:13px;line-height:1.5;color:#64748b;word-break:break-all;">
        Or copy this link into your browser:<br/>
        <a href="${confirmUrl}" style="color:rgba(16,185,129,0.8);text-decoration:underline;">${confirmUrl}</a>
      </p>
      <p style="margin:0;font-size:13px;line-height:1.5;color:#64748b;">
        This link expires in 24 hours. If you did not submit a contact form on our
        site, you can safely ignore this email.
      </p>
    </td></tr>
    <!-- Footer -->
    <tr><td style="padding:24px 32px;border-top:1px solid rgba(16,185,129,0.1);text-align:center;">
      <p style="margin:0;font-size:12px;color:#475569;">
        © ${new Date().getFullYear()} The Green Resonance Project · All rights reserved
      </p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = `The Green Resonance Project
──────────────────────────

Hello ${name},

Thank you for reaching out through our contact form. You also indicated that you'd like to receive Green Resonance Project news and updates.

Please confirm your subscription by visiting the link below:

${confirmUrl}

This link expires in 24 hours. If you did not submit a contact form on our site, you can safely ignore this email.

© ${new Date().getFullYear()} The Green Resonance Project`;

  return { html, text };
}

/* ── main handler ── */

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { name, email, subject, inquiry_type, message, newsletter_consent } =
      body;

    // ── validate (silent success for anti-enumeration) ──
    if (
      typeof name !== "string" ||
      name.trim().length === 0 ||
      name.trim().length > 200 ||
      typeof email !== "string" ||
      !EMAIL_RE.test(email.trim()) ||
      typeof subject !== "string" ||
      subject.trim().length === 0 ||
      subject.trim().length > 300 ||
      typeof message !== "string" ||
      message.trim().length === 0 ||
      message.trim().length > 5000
    ) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();
    const cleanInquiry = typeof inquiry_type === "string" ? inquiry_type.trim() : "general";
    const wantsNewsletter = newsletter_consent === true;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // ── rate limit ──
    const windowStart = new Date(
      Date.now() - RATE_LIMIT_WINDOW_MS,
    ).toISOString();
    const { count } = await supabase
      .from("submission_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("identifier", cleanEmail)
      .eq("scope", "contact_submit")
      .gte("attempted_at", windowStart);

    if ((count ?? 0) >= MAX_SUBMISSIONS_PER_WINDOW) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Record rate-limit attempt
    await supabase.from("submission_rate_limits").insert({
      identifier: cleanEmail,
      scope: "contact_submit",
    });

    // ── insert contact message ──
    const insertPayload: Record<string, unknown> = {
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      inquiry_type: cleanInquiry,
      message: cleanMessage,
      newsletter_consent: wantsNewsletter,
      email_verified: false,
    };

    if (wantsNewsletter) {
      insertPayload.consent_wording =
        "Send me Green Resonance Project news and updates.";
      insertPayload.consent_version = "contact-form-v1";
    }

    const { data: inserted, error: insertErr } = await supabase
      .from("contact_messages")
      .insert(insertPayload)
      .select("id")
      .maybeSingle();

    // Handle 23505 duplicate gracefully
    if (insertErr) {
      if (insertErr.code === "23505") {
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`Insert failed: ${insertErr.message}`);
    }

    const recordId = inserted?.id;

    // ── newsletter confirmation flow ──
    if (!wantsNewsletter || !recordId) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check suppression
    if (await isRecipientSuppressed(supabase, cleanEmail)) {
      return new Response(
        JSON.stringify({ ok: true, delivery: "unavailable" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Generate & store token
    const token = randomToken();
    const tokenHash = await sha256hex(token);

    // Invalidate previous tokens for this record + scope
    await supabase
      .from("email_confirmation_tokens")
      .update({ invalidated_at: new Date().toISOString() })
      .eq("record_id", recordId)
      .eq("scope", "contact_newsletter")
      .is("invalidated_at", null);

    await supabase.from("email_confirmation_tokens").insert({
      token_hash: tokenHash,
      scope: "contact_newsletter",
      record_id: recordId,
      email: cleanEmail,
      expires_at: new Date(Date.now() + TOKEN_EXPIRY_MS).toISOString(),
    });

    // Check domain readiness
    const resendKey = Deno.env.get("RESEND_API_KEY") ?? "";
    const domainReady = await checkResendDomainReady(
      resendKey,
      "thegreenresonanceproject.org",
    );

    if (!domainReady) {
      return new Response(
        JSON.stringify({ ok: true, delivery: "unavailable" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Build & send email
    const { html, text } = buildConfirmationEmail(cleanName, token);
    const idempotencyKey = `contact_newsletter:${recordId}:${tokenHash.slice(0, 16)}`;

    const result = await sendEmailWithRetry({
      apiKey: resendKey,
      to: cleanEmail,
      from: FROM_ADDRESS,
      reply_to: REPLY_TO,
      subject: "Confirm your newsletter subscription",
      html,
      text,
      supabase,
      idempotencyKey,
      scope: "contact_newsletter",
      recordId,
    });

    const delivery = result.sent ? "sent" : "uncertain";

    return new Response(JSON.stringify({ ok: true, delivery }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("contact-submit error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
