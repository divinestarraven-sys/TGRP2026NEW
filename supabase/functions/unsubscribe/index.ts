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

async function sha256hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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
    const rawToken: string = body.token ?? "";

    if (!rawToken || rawToken.length !== 64) {
      return jsonResponse({ status: "invalid" });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const tokenHash = await sha256hex(rawToken);

    // Look up the original confirmation token to find the email
    const { data: tokenRecord } = await supabase
      .from("email_confirmation_tokens")
      .select("email, scope, record_id")
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (!tokenRecord) {
      return jsonResponse({ status: "invalid" });
    }

    const email = tokenRecord.email;

    // Check if already unsubscribed via suppressed_recipients
    const { data: alreadySuppressed } = await supabase
      .from("suppressed_recipients")
      .select("id")
      .eq("email", email)
      .eq("reason", "unsubscribe")
      .maybeSingle();

    if (alreadySuppressed) {
      return jsonResponse({ status: "already_unsubscribed" });
    }

    // Mark email_subscribers as unsubscribed
    await supabase
      .from("email_subscribers")
      .update({
        unsubscribed: true,
        unsubscribed_at: new Date().toISOString(),
        newsletter_consent: false,
        community_events_consent: false,
      })
      .eq("email", email);

    // Add to suppressed_recipients
    await supabase.from("suppressed_recipients").upsert(
      {
        email,
        reason: "unsubscribe",
        source_event_id: `unsub_${tokenHash.slice(0, 32)}`,
        suppressed_at: new Date().toISOString(),
      },
      { onConflict: "email" },
    );

    return jsonResponse({ status: "unsubscribed" });
  } catch (err) {
    console.error("unsubscribe error:", err);
    return jsonResponse({ error: "Internal error" }, 500);
  }
});
