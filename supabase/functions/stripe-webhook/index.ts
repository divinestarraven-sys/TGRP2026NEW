import Stripe from "npm:stripe@17.7.0";
import { createClient } from "npm:@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const PRICE_TO_TIER: Record<string, string> = {
  [Deno.env.get("STRIPE_MYCELIUM_PRICE_ID") || "price_1UJ5djHNnEUdlUVcXmmJJDid"]: "mycelium",
  [Deno.env.get("STRIPE_CANOPY_PRICE_ID") || "price_1UJ5deHNnEUdlUVcOXvBoXT6"]: "canopy",
};

function mapStatus(stripeStatus: string): string {
  switch (stripeStatus) {
    case "active":
    case "trialing":
      return "active";
    case "past_due":
      return "past_due";
    case "incomplete":
    case "incomplete_expired":
      return "incomplete";
    case "canceled":
    case "unpaid":
      return "canceled";
    default:
      return "canceled";
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!stripeKey || !webhookSecret) {
      return jsonResponse({ error: "Webhook not configured" }, 503);
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-04-30.basil" });
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return jsonResponse({ error: "Missing signature" }, 400);
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return jsonResponse({ error: "Invalid signature" }, 400);
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Idempotency: check if this event was already processed
    const { data: alreadyProcessed } = await supabaseAdmin
      .from("members_entitlements")
      .select("id")
      .contains("processed_event_ids", [event.id])
      .maybeSingle();

    if (alreadyProcessed) {
      return jsonResponse({ received: true, note: "already processed" });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.subscription) break;

        const userId = session.client_reference_id;
        if (!userId) {
          console.error("checkout.session.completed: missing client_reference_id");
          break;
        }

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const priceId = subscription.items.data[0]?.price?.id;
        const tier = priceId ? PRICE_TO_TIER[priceId] : null;
        if (!tier) {
          console.error("checkout.session.completed: unknown price", priceId);
          break;
        }

        const status = mapStatus(subscription.status);

        await supabaseAdmin
          .from("members_entitlements")
          .update({
            tier,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: subscription.id,
            status,
            current_period_start: new Date(
              subscription.current_period_start * 1000
            ).toISOString(),
            current_period_end: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);

        await supabaseAdmin.rpc("append_processed_event", {
          p_user_id: userId,
          p_event_id: event.id,
        });

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price?.id;
        const tier = priceId ? PRICE_TO_TIER[priceId] : null;
        const status = mapStatus(subscription.status);

        const updateData: Record<string, unknown> = {
          status,
          current_period_start: new Date(
            subscription.current_period_start * 1000
          ).toISOString(),
          current_period_end: new Date(
            subscription.current_period_end * 1000
          ).toISOString(),
          updated_at: new Date().toISOString(),
        };
        if (tier) updateData.tier = tier;

        if (subscription.cancel_at_period_end) {
          updateData.status = "canceled";
        }

        await supabaseAdmin
          .from("members_entitlements")
          .update(updateData)
          .eq("stripe_subscription_id", subscription.id);

        // Record event for the row matched by subscription ID
        const { data: row } = await supabaseAdmin
          .from("members_entitlements")
          .select("user_id")
          .eq("stripe_subscription_id", subscription.id)
          .maybeSingle();

        if (row) {
          await supabaseAdmin.rpc("append_processed_event", {
            p_user_id: row.user_id,
            p_event_id: event.id,
          });
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const { data: row } = await supabaseAdmin
          .from("members_entitlements")
          .select("user_id")
          .eq("stripe_subscription_id", subscription.id)
          .maybeSingle();

        await supabaseAdmin
          .from("members_entitlements")
          .update({
            tier: "seed",
            status: "canceled",
            stripe_subscription_id: null,
            current_period_start: null,
            current_period_end: null,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        if (row) {
          await supabaseAdmin.rpc("append_processed_event", {
            p_user_id: row.user_id,
            p_event_id: event.id,
          });
        }

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          await supabaseAdmin
            .from("members_entitlements")
            .update({
              status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq(
              "stripe_subscription_id",
              invoice.subscription as string
            );
        }
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    return jsonResponse({ received: true });
  } catch (err) {
    console.error("stripe-webhook error:", err);
    return jsonResponse({ error: "Webhook processing failed" }, 500);
  }
});
