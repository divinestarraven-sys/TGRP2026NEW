/*
# Add email confirmation flow for Seed access requests

## Summary
Adds server-side email confirmation infrastructure so that Seed waitlist
sign-ups must verify their email address before the request is considered
active.  Newsletter eligibility requires both a verified email AND explicit
newsletter consent.

## 1. Modified Tables
- `seed_membership_waitlist`
  - `email_verified` (boolean, default false) — whether the email has been confirmed
  - `email_verified_at` (timestamptz) — when confirmation happened
  - `consent_wording` (text) — exact checkbox label shown to the user
  - `consent_version` (text) — version tag for the consent language
  - `consent_recorded_at` (timestamptz) — when consent was given

## 2. New Tables
- `email_confirmation_tokens`
  - `id` (uuid, PK)
  - `token_hash` (text, unique) — SHA-256 hex of the raw token; raw is never stored
  - `email` (text) — the address being confirmed
  - `scope` (text) — which flow this token belongs to (e.g. 'seed_waitlist')
  - `record_id` (uuid) — the row in the target table
  - `expires_at` (timestamptz) — 24 h from creation
  - `consumed_at` (timestamptz, nullable) — set atomically on use
  - `created_at` (timestamptz)

- `submission_rate_limits`
  - `id` (uuid, PK)
  - `identifier` (text) — email or other key
  - `action` (text) — 'seed_submit', 'resend_confirmation', etc.
  - `attempted_at` (timestamptz)
  - Indexed for fast lookups.  Old rows are harmless and can be pruned later.

## 3. New Function
- `consume_confirmation_token(p_token_hash text)`
  Returns (out_record_id uuid, out_email text, out_scope text, out_status text).
  Atomically validates + consumes the token.  Status is one of:
  'confirmed', 'expired', 'already_used', 'invalid'.
  On 'confirmed', also marks the target record's email_verified = true.
  SECURITY INVOKER; EXECUTE revoked from anon/authenticated (service-role only).

## 4. Security
- RLS enabled on both new tables with NO client policies (service-role only).
- EXECUTE on the consume function revoked from anon and authenticated.
- Column-level grant: anon and authenticated may NOT read the new
  email_verified / consent columns on seed_membership_waitlist (they already
  have no SELECT on the table at all, but this is defense-in-depth).
*/

-- ============================================================
-- 1. Extend seed_membership_waitlist
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'seed_membership_waitlist'
      AND column_name = 'email_verified'
  ) THEN
    ALTER TABLE public.seed_membership_waitlist
      ADD COLUMN email_verified boolean NOT NULL DEFAULT false,
      ADD COLUMN email_verified_at timestamptz,
      ADD COLUMN consent_wording text,
      ADD COLUMN consent_version text,
      ADD COLUMN consent_recorded_at timestamptz;
  END IF;
END $$;

-- ============================================================
-- 2. email_confirmation_tokens
-- ============================================================
CREATE TABLE IF NOT EXISTS public.email_confirmation_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash text NOT NULL,
  email text NOT NULL,
  scope text NOT NULL,
  record_id uuid NOT NULL,
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_confirmation_tokens_hash
  ON public.email_confirmation_tokens (token_hash);

CREATE INDEX IF NOT EXISTS idx_confirmation_tokens_record
  ON public.email_confirmation_tokens (record_id, consumed_at);

ALTER TABLE public.email_confirmation_tokens ENABLE ROW LEVEL SECURITY;

-- No client policies — accessed only via service role from edge functions.

-- ============================================================
-- 3. submission_rate_limits
-- ============================================================
CREATE TABLE IF NOT EXISTS public.submission_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL,
  action text NOT NULL,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup
  ON public.submission_rate_limits (identifier, action, attempted_at DESC);

ALTER TABLE public.submission_rate_limits ENABLE ROW LEVEL SECURITY;

-- No client policies — accessed only via service role from edge functions.

-- ============================================================
-- 4. Revoke client grants on new tables
-- ============================================================
REVOKE ALL ON public.email_confirmation_tokens FROM anon, authenticated;
REVOKE ALL ON public.submission_rate_limits FROM anon, authenticated;

-- ============================================================
-- 5. Atomic token consumption function
-- ============================================================
CREATE OR REPLACE FUNCTION public.consume_confirmation_token(p_token_hash text)
RETURNS TABLE (
  out_record_id uuid,
  out_email text,
  out_scope text,
  out_status text
)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_token email_confirmation_tokens%ROWTYPE;
  v_updated_id uuid;
BEGIN
  -- Look up the token
  SELECT * INTO v_token
  FROM email_confirmation_tokens
  WHERE email_confirmation_tokens.token_hash = p_token_hash;

  IF NOT FOUND THEN
    out_status := 'invalid';
    RETURN NEXT;
    RETURN;
  END IF;

  -- Already consumed?
  IF v_token.consumed_at IS NOT NULL THEN
    out_record_id := v_token.record_id;
    out_email := v_token.email;
    out_scope := v_token.scope;
    out_status := 'already_used';
    RETURN NEXT;
    RETURN;
  END IF;

  -- Expired?
  IF v_token.expires_at < now() THEN
    out_record_id := v_token.record_id;
    out_email := v_token.email;
    out_scope := v_token.scope;
    out_status := 'expired';
    RETURN NEXT;
    RETURN;
  END IF;

  -- Atomically consume — guards against concurrent callers
  UPDATE email_confirmation_tokens
  SET consumed_at = now()
  WHERE id = v_token.id
    AND consumed_at IS NULL
  RETURNING id INTO v_updated_id;

  IF v_updated_id IS NULL THEN
    out_record_id := v_token.record_id;
    out_email := v_token.email;
    out_scope := v_token.scope;
    out_status := 'already_used';
    RETURN NEXT;
    RETURN;
  END IF;

  -- Mark the target record as verified
  IF v_token.scope = 'seed_waitlist' THEN
    UPDATE seed_membership_waitlist
    SET email_verified = true,
        email_verified_at = now()
    WHERE id = v_token.record_id;
  END IF;

  out_record_id := v_token.record_id;
  out_email := v_token.email;
  out_scope := v_token.scope;
  out_status := 'confirmed';
  RETURN NEXT;
END;
$$;

-- Only callable by service role (edge functions), not by browser clients
REVOKE EXECUTE ON FUNCTION public.consume_confirmation_token(text) FROM anon, authenticated;
