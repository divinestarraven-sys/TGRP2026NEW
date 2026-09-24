/*
# Extend confirmation flow to all signup paths + add dispatch, suppression tables

## Summary
Extends the email-confirmation infrastructure to cover Mycelium waitlist,
newsletter (email_subscribers), and Contact forms. Adds durable email dispatch
tracking and a suppressed-recipients table for bounce/complaint handling.

## 1. Modified Tables
### mycelium_membership_waitlist — add verification + consent columns
### email_subscribers — add verification, consent wording, bounce/complaint columns
### contact_messages — add verification, consent wording columns

## 2. New Tables
### email_dispatches — durable email delivery tracking with idempotency
### suppressed_recipients — addresses that must not receive email

## 3. Modified Function
### consume_confirmation_token — handles all scopes

## 4. Security
- RLS enabled, no client policies on new tables
- Existing email_subscribers rows stay email_verified = false (no backfill)
*/

-- ============================================================
-- 1. Extend mycelium_membership_waitlist
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'mycelium_membership_waitlist'
      AND column_name = 'email_verified'
  ) THEN
    ALTER TABLE public.mycelium_membership_waitlist
      ADD COLUMN email_verified boolean NOT NULL DEFAULT false,
      ADD COLUMN email_verified_at timestamptz,
      ADD COLUMN consent_wording text,
      ADD COLUMN consent_version text,
      ADD COLUMN consent_recorded_at timestamptz;
  END IF;
END $$;

-- ============================================================
-- 2. Extend email_subscribers (some columns may already exist)
-- ============================================================
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='email_subscribers' AND column_name='email_verified') THEN
    ALTER TABLE public.email_subscribers ADD COLUMN email_verified boolean NOT NULL DEFAULT false;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='email_subscribers' AND column_name='email_verified_at') THEN
    ALTER TABLE public.email_subscribers ADD COLUMN email_verified_at timestamptz;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='email_subscribers' AND column_name='consent_wording') THEN
    ALTER TABLE public.email_subscribers ADD COLUMN consent_wording text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='email_subscribers' AND column_name='consent_version') THEN
    ALTER TABLE public.email_subscribers ADD COLUMN consent_version text;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='email_subscribers' AND column_name='consent_recorded_at') THEN
    ALTER TABLE public.email_subscribers ADD COLUMN consent_recorded_at timestamptz;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='email_subscribers' AND column_name='hard_bounced_at') THEN
    ALTER TABLE public.email_subscribers ADD COLUMN hard_bounced_at timestamptz;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='email_subscribers' AND column_name='complained_at') THEN
    ALTER TABLE public.email_subscribers ADD COLUMN complained_at timestamptz;
  END IF;
END $$;

-- ============================================================
-- 3. Extend contact_messages
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'contact_messages'
      AND column_name = 'email_verified'
  ) THEN
    ALTER TABLE public.contact_messages
      ADD COLUMN email_verified boolean NOT NULL DEFAULT false,
      ADD COLUMN consent_wording text,
      ADD COLUMN consent_version text;
  END IF;
END $$;

-- ============================================================
-- 4. email_dispatches
-- ============================================================
CREATE TABLE IF NOT EXISTS public.email_dispatches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key text NOT NULL,
  recipient text NOT NULL,
  subject text NOT NULL,
  scope text NOT NULL,
  record_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  resend_message_id text,
  attempts int NOT NULL DEFAULT 0,
  max_attempts int NOT NULL DEFAULT 3,
  last_attempt_at timestamptz,
  error_detail text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_email_dispatches_idempotency
  ON public.email_dispatches (idempotency_key);
CREATE INDEX IF NOT EXISTS idx_email_dispatches_recipient
  ON public.email_dispatches (recipient, scope);
CREATE INDEX IF NOT EXISTS idx_email_dispatches_resend_id
  ON public.email_dispatches (resend_message_id)
  WHERE resend_message_id IS NOT NULL;
ALTER TABLE public.email_dispatches ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.email_dispatches FROM anon, authenticated;

-- ============================================================
-- 5. suppressed_recipients
-- ============================================================
CREATE TABLE IF NOT EXISTS public.suppressed_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  reason text NOT NULL,
  source_event_id text,
  suppressed_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_suppressed_recipients_email
  ON public.suppressed_recipients (email);
ALTER TABLE public.suppressed_recipients ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.suppressed_recipients FROM anon, authenticated;

-- ============================================================
-- 6. Update consume_confirmation_token for all scopes
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
  SELECT * INTO v_token
  FROM email_confirmation_tokens
  WHERE email_confirmation_tokens.token_hash = p_token_hash;

  IF NOT FOUND THEN
    out_status := 'invalid';
    RETURN NEXT; RETURN;
  END IF;

  IF v_token.consumed_at IS NOT NULL THEN
    out_record_id := v_token.record_id;
    out_email := v_token.email;
    out_scope := v_token.scope;
    out_status := 'already_used';
    RETURN NEXT; RETURN;
  END IF;

  IF v_token.expires_at < now() THEN
    out_record_id := v_token.record_id;
    out_email := v_token.email;
    out_scope := v_token.scope;
    out_status := 'expired';
    RETURN NEXT; RETURN;
  END IF;

  UPDATE email_confirmation_tokens
  SET consumed_at = now()
  WHERE id = v_token.id AND consumed_at IS NULL
  RETURNING id INTO v_updated_id;

  IF v_updated_id IS NULL THEN
    out_record_id := v_token.record_id;
    out_email := v_token.email;
    out_scope := v_token.scope;
    out_status := 'already_used';
    RETURN NEXT; RETURN;
  END IF;

  IF v_token.scope = 'seed_waitlist' THEN
    UPDATE seed_membership_waitlist
    SET email_verified = true, email_verified_at = now()
    WHERE id = v_token.record_id;
  ELSIF v_token.scope = 'mycelium_waitlist' THEN
    UPDATE mycelium_membership_waitlist
    SET email_verified = true, email_verified_at = now()
    WHERE id = v_token.record_id;
  ELSIF v_token.scope = 'newsletter' THEN
    UPDATE email_subscribers
    SET email_verified = true, email_verified_at = now()
    WHERE id = v_token.record_id;
  ELSIF v_token.scope = 'contact_newsletter' THEN
    UPDATE contact_messages
    SET email_verified = true
    WHERE id = v_token.record_id;
  END IF;

  out_record_id := v_token.record_id;
  out_email := v_token.email;
  out_scope := v_token.scope;
  out_status := 'confirmed';
  RETURN NEXT;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.consume_confirmation_token(text) FROM PUBLIC;
