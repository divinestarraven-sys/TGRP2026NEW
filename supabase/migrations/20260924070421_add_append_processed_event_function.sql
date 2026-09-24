/*
# Add helper function for webhook idempotency

Creates a SECURITY DEFINER function that atomically appends a Stripe
event ID to the processed_event_ids array on a members_entitlements row.
This is called by the stripe-webhook edge function after processing each event.

1. New Functions
   - `append_processed_event(p_user_id uuid, p_event_id text)` — appends
     the event ID to the array and returns void.

2. Security
   - SECURITY DEFINER with pinned search_path.
   - EXECUTE revoked from anon and authenticated (only service_role calls this).
*/

CREATE OR REPLACE FUNCTION public.append_processed_event(
  p_user_id uuid,
  p_event_id text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  UPDATE members_entitlements
  SET processed_event_ids = array_append(processed_event_ids, p_event_id),
      updated_at = now()
  WHERE user_id = p_user_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.append_processed_event FROM anon;
REVOKE EXECUTE ON FUNCTION public.append_processed_event FROM authenticated;
