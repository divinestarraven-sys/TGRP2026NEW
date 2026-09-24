import { createClient } from "npm:@supabase/supabase-js@2.49.1";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function verifyResendSignature(
  body: string,
  signatureHeader: string | null,
  webhookSecret: string,
): Promise<boolean> {
  if (!signatureHeader) return false;

  const parts: Record<string, string> = {};
  for (const pair of signatureHeader.split(",")) {
    const [k, v] = pair.split("=", 2);
    if (k && v) parts[k.trim()] = v.trim();
  }

  const timestamp = parts["t"];
  const v1Signature = parts["v1"];
  if (!timestamp || !v1Signature) return false;

  // Reject timestamps older than 5 minutes
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts) || Math.abs(Date.now() / 1000 - ts) > 300) return false;

  const payload = `${timestamp}.${body}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const expectedHex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return timingSafeEqualHex(expectedHex, v1Signature);
}

// Compare two hex digests without leaking how many leading characters matched.
// A plain `===` short-circuits on the first differing character, which lets a
// caller recover the expected signature one character at a time by timing the
// responses.
function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const webhookSecret = Deno.env.get("RESEND_WEBHOOK_SECRET");
    if (!webhookSecret) {
      console.error("RESEND_WEBHOOK_SECRET not configured");
      return jsonResponse({ error: "Not configured" }, 500);
    }

    const rawBody = await req.text();
    const signatureHeader = req.headers.get("svix-signature");

    const valid = await verifyResendSignature(rawBody, signatureHeader, webhookSecret);
    if (!valid) {
      console.error("Invalid Resend webhook signature");
      return jsonResponse({ error: "Invalid signature" }, 401);
    }

    const event = JSON.parse(rawBody);
    const eventType: string = event.type ?? "";
    const eventData = event.data ?? {};
    const eventId: string = event.id ?? event.data?.email_id ?? crypto.randomUUID();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Idempotency: check if we've already processed this event
    const { data: existingSuppress } = await supabase
      .from("suppressed_recipients")
      .select("id")
      .eq("source_event_id", eventId)
      .maybeSingle();

    if (existingSuppress) {
      return jsonResponse({ received: true });
    }

    const recipientEmail: string = (
      eventData.to?.[0] ?? eventData.email ?? ""
    ).toLowerCase().trim();

    if (!recipientEmail) {
      return jsonResponse({ received: true });
    }

    // Update email_dispatches if we have a matching message ID
    const resendMessageId: string | undefined =
      eventData.email_id ?? eventData.id;

    if (resendMessageId) {
      if (eventType === "email.delivered") {
        await supabase
          .from("email_dispatches")
          .update({ status: "delivered" })
          .eq("resend_message_id", resendMessageId);
      } else if (eventType === "email.bounced") {
        await supabase
          .from("email_dispatches")
          .update({ status: "bounced" })
          .eq("resend_message_id", resendMessageId);
      } else if (eventType === "email.complained") {
        await supabase
          .from("email_dispatches")
          .update({ status: "complained" })
          .eq("resend_message_id", resendMessageId);
      }
    }

    // Suppress recipient on hard bounce or complaint
    if (eventType === "email.bounced" || eventType === "email.complained") {
      const reason = eventType === "email.bounced" ? "hard_bounce" : "complaint";

      // Add to suppressed_recipients (upsert by email)
      await supabase.from("suppressed_recipients").upsert(
        {
          email: recipientEmail,
          reason,
          source_event_id: eventId,
          suppressed_at: new Date().toISOString(),
        },
        { onConflict: "email" },
      );

      // Mark subscriber record
      if (eventType === "email.bounced") {
        await supabase
          .from("email_subscribers")
          .update({ hard_bounced_at: new Date().toISOString() })
          .eq("email", recipientEmail)
          .is("hard_bounced_at", null);
      } else {
        await supabase
          .from("email_subscribers")
          .update({ complained_at: new Date().toISOString() })
          .eq("email", recipientEmail)
          .is("complained_at", null);
      }
    }

    return jsonResponse({ received: true });
  } catch (err) {
    console.error("resend-webhook error:", err);
    return jsonResponse({ error: "Internal error" }, 500);
  }
});
