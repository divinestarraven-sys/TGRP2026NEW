/*
  # Harden the public INSERT policy on members

  ## Problem
  The policy `anon_insert_members` allowed any unauthenticated caller to insert a
  members row with:
    - `membership_status = 'active'` and any `membership_tier` (fabricated paid membership)
    - any `user_id` (identity binding taken from the request body)
    - any `stripe_customer_id`, `stripe_subscription_id`, `resend_contact_id`, `joined_at`
      (forged external billing / email-provider references)

  ## Change
  Replace the policy with one that pins every privilege- and value-carrying column
  to a safe value on client inserts. Promotion of tier/status, linking to Stripe or
  Resend, and setting joined_at remain the service role's job.

  ## Notes
  - No client code inserts into `members` (all four site forms write to the waitlist,
    subscriber and contact tables), so no existing behaviour depends on the wider rule.
  - Column defaults already are 'pending' / 'community', so an insert that omits these
    columns still succeeds exactly as before.
*/

DROP POLICY IF EXISTS "anon_insert_members" ON public.members;

CREATE POLICY "public_insert_members_pending_only"
  ON public.members
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    coalesce(membership_status, 'pending') = 'pending'
    AND coalesce(membership_tier, 'community') = 'community'
    AND (user_id IS NULL OR user_id = auth.uid())
    AND stripe_customer_id IS NULL
    AND stripe_subscription_id IS NULL
    AND resend_contact_id IS NULL
    AND joined_at IS NULL
  );
