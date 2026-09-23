/*
# Fix Mutable Search Path on normalize_email and set_updated_at

## Overview
Supabase's security linter flags `normalize_email()` and `set_updated_at()` as
"Function Search Path Mutable" because they were created without an explicit
`search_path`. A mutable search_path allows an attacker to shadow built-in
functions by manipulating the search path, potentially hijacking trigger logic.

## Changes
1. Drop all triggers that depend on `normalize_email()` and `set_updated_at()`.
2. Drop both functions.
3. Recreate both functions with `SET search_path = public` so object resolution
   is predictable and the linter warning is resolved.
4. Recreate all triggers referencing the fixed functions.

## Security
- No policy changes, no data changes.
- Function behavior is identical — only the search_path is pinned.
- All existing triggers are preserved and reattached.
*/

-- 1. Drop dependent triggers
DROP TRIGGER IF EXISTS trg_normalize_email_seed ON seed_membership_waitlist;
DROP TRIGGER IF EXISTS trg_normalize_email_mycelium ON mycelium_membership_waitlist;
DROP TRIGGER IF EXISTS trg_normalize_email_subscribers ON email_subscribers;
DROP TRIGGER IF EXISTS trg_normalize_email_members ON members;
DROP TRIGGER IF EXISTS trg_normalize_email_contact ON contact_messages;

DROP TRIGGER IF EXISTS trg_updated_at_subscribers ON email_subscribers;
DROP TRIGGER IF EXISTS trg_updated_at_members ON members;

-- 2. Drop functions (now safe — no dependents)
DROP FUNCTION IF EXISTS public.normalize_email();
DROP FUNCTION IF EXISTS public.set_updated_at();

-- 3. Recreate with pinned search_path
CREATE FUNCTION public.normalize_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.email = lower(trim(NEW.email));
  RETURN NEW;
END;
$$;

CREATE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 4. Recreate triggers
CREATE TRIGGER trg_normalize_email_seed
  BEFORE INSERT OR UPDATE ON seed_membership_waitlist
  FOR EACH ROW EXECUTE FUNCTION public.normalize_email();

CREATE TRIGGER trg_normalize_email_mycelium
  BEFORE INSERT OR UPDATE ON mycelium_membership_waitlist
  FOR EACH ROW EXECUTE FUNCTION public.normalize_email();

CREATE TRIGGER trg_normalize_email_subscribers
  BEFORE INSERT OR UPDATE ON email_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.normalize_email();

CREATE TRIGGER trg_normalize_email_members
  BEFORE INSERT OR UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION public.normalize_email();

CREATE TRIGGER trg_normalize_email_contact
  BEFORE INSERT OR UPDATE ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.normalize_email();

CREATE TRIGGER trg_updated_at_subscribers
  BEFORE UPDATE ON email_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_updated_at_members
  BEFORE UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
