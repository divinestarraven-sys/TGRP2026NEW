/*
  # Validate email format in the database

  ## Problem
  Email format was only checked by the browser (`type="email"`). A direct REST call could
  store any string in the `email` column of any of the five tables.

  ## Change
  A conservative POSIX format CHECK on every `email` column. The existing
  `normalize_email()` BEFORE INSERT/UPDATE trigger lowercases and trims first, so the
  constraint sees the canonical value.

  ## Notes
  - Deliberately permissive about local-part characters; it only rejects values that are
    clearly not addresses (no `@`, no dot in the domain, whitespace).
  - No data is dropped or altered.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_messages_email_format') THEN
    ALTER TABLE public.contact_messages ADD CONSTRAINT contact_messages_email_format
      CHECK (email ~ '^[^@[:space:],]+@[^@[:space:],]+\.[^@[:space:],]+$');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'email_subscribers_email_format') THEN
    ALTER TABLE public.email_subscribers ADD CONSTRAINT email_subscribers_email_format
      CHECK (email ~ '^[^@[:space:],]+@[^@[:space:],]+\.[^@[:space:],]+$');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'members_email_format') THEN
    ALTER TABLE public.members ADD CONSTRAINT members_email_format
      CHECK (email ~ '^[^@[:space:],]+@[^@[:space:],]+\.[^@[:space:],]+$');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'mycelium_waitlist_email_format') THEN
    ALTER TABLE public.mycelium_membership_waitlist ADD CONSTRAINT mycelium_waitlist_email_format
      CHECK (email ~ '^[^@[:space:],]+@[^@[:space:],]+\.[^@[:space:],]+$');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'seed_waitlist_email_format') THEN
    ALTER TABLE public.seed_membership_waitlist ADD CONSTRAINT seed_waitlist_email_format
      CHECK (email ~ '^[^@[:space:],]+@[^@[:space:],]+\.[^@[:space:],]+$');
  END IF;
END $$;
