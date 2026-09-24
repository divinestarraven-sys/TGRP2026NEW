/*
# Create members_entitlements table

Stores each user's membership tier and Stripe subscription state.
Every authenticated user gets a row automatically on signup via a trigger.

1. New Tables
   - `members_entitlements`
     - `id` (uuid, PK)
     - `user_id` (uuid, FK → auth.users, unique — one row per user)
     - `tier` (text: seed | mycelium | canopy, default 'seed')
     - `stripe_customer_id` (text, nullable — set when first Stripe checkout)
     - `stripe_subscription_id` (text, nullable — set when subscription active)
     - `status` (text: free | active | past_due | incomplete | canceled, default 'free')
     - `current_period_start` (timestamptz, nullable)
     - `current_period_end` (timestamptz, nullable)
     - `processed_event_ids` (text[], default '{}' — webhook idempotency)
     - `created_at` / `updated_at` (timestamptz)

2. New Functions
   - `handle_new_user()` — SECURITY DEFINER trigger function that creates
     a seed/free entitlement row when a user signs up.

3. Security
   - RLS enabled on `members_entitlements`.
   - Authenticated users can SELECT their own row only.
   - INSERT allowed for own row (trigger handles this).
   - UPDATE revoked from authenticated — only edge functions via
     service_role can change tier, status, or Stripe fields.
   - DELETE denied for all authenticated users.
   - Column-level REVOKE on all privilege-carrying columns.

4. Important notes
   - The trigger uses SECURITY DEFINER with pinned search_path.
   - EXECUTE on handle_new_user is revoked from anon and authenticated.
   - processed_event_ids is an array for O(1) idempotency checks via @>.
*/

-- Table
CREATE TABLE IF NOT EXISTS members_entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE DEFAULT auth.uid()
    REFERENCES auth.users(id) ON DELETE CASCADE,
  tier text NOT NULL DEFAULT 'seed'
    CHECK (tier IN ('seed', 'mycelium', 'canopy')),
  stripe_customer_id text,
  stripe_subscription_id text,
  status text NOT NULL DEFAULT 'free'
    CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete', 'free')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  processed_event_ids text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for webhook lookups
CREATE INDEX IF NOT EXISTS idx_entitlements_stripe_customer
  ON members_entitlements(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_entitlements_stripe_sub
  ON members_entitlements(stripe_subscription_id);

-- RLS
ALTER TABLE members_entitlements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_entitlement" ON members_entitlements;
CREATE POLICY "select_own_entitlement" ON members_entitlements FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_entitlement" ON members_entitlements;
CREATE POLICY "insert_own_entitlement" ON members_entitlements FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_entitlement" ON members_entitlements;
CREATE POLICY "update_own_entitlement" ON members_entitlements FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_entitlement" ON members_entitlements;
CREATE POLICY "delete_own_entitlement" ON members_entitlements FOR DELETE
  TO authenticated USING (false);

-- Column-level lockdown: authenticated cannot directly mutate privilege columns
REVOKE UPDATE ON members_entitlements FROM authenticated;

-- Auto-create entitlement on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.members_entitlements (user_id, tier, status)
  VALUES (NEW.id, 'seed', 'free')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user FROM authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
