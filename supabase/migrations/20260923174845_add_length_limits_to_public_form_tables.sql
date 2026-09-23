/*
  # Add server-side length limits to every publicly insertable column

  ## Problem
  All four site forms are writable by the `anon` role with a `true` check, and the only
  validation was the browser's `required` attribute. No column had a length limit, so an
  unauthenticated caller could POST arbitrarily large rows directly to the REST API.

  ## Change
  CHECK constraints capping the length of every client-supplied text column, plus the
  cardinality and total size of `seed_membership_waitlist.interests`. Limits sit well
  above anything the forms can legitimately produce, so normal submissions are unaffected.

  ## Notes
  - Guarded by DO blocks so the migration is re-runnable.
  - No data is dropped or altered.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contact_messages_lengths') THEN
    ALTER TABLE public.contact_messages ADD CONSTRAINT contact_messages_lengths CHECK (
      char_length(name) BETWEEN 1 AND 200
      AND char_length(email) BETWEEN 3 AND 320
      AND char_length(message) BETWEEN 1 AND 5000
      AND (subject IS NULL OR char_length(subject) <= 300)
      AND (inquiry_type IS NULL OR char_length(inquiry_type) <= 60)
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'email_subscribers_lengths') THEN
    ALTER TABLE public.email_subscribers ADD CONSTRAINT email_subscribers_lengths CHECK (
      char_length(email) BETWEEN 3 AND 320
      AND (first_name IS NULL OR char_length(first_name) <= 200)
      AND (last_name IS NULL OR char_length(last_name) <= 200)
      AND (source IS NULL OR char_length(source) <= 100)
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'members_lengths') THEN
    ALTER TABLE public.members ADD CONSTRAINT members_lengths CHECK (
      char_length(email) BETWEEN 3 AND 320
      AND (first_name IS NULL OR char_length(first_name) <= 200)
      AND (last_name IS NULL OR char_length(last_name) <= 200)
      AND (membership_tier IS NULL OR char_length(membership_tier) <= 60)
      AND (membership_status IS NULL OR char_length(membership_status) <= 40)
      AND (stripe_customer_id IS NULL OR char_length(stripe_customer_id) <= 120)
      AND (stripe_subscription_id IS NULL OR char_length(stripe_subscription_id) <= 120)
      AND (resend_contact_id IS NULL OR char_length(resend_contact_id) <= 120)
      AND (source IS NULL OR char_length(source) <= 100)
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'mycelium_waitlist_lengths') THEN
    ALTER TABLE public.mycelium_membership_waitlist ADD CONSTRAINT mycelium_waitlist_lengths CHECK (
      char_length(name) BETWEEN 1 AND 200
      AND char_length(email) BETWEEN 3 AND 320
      AND (interest IS NULL OR char_length(interest) <= 200)
      AND (message IS NULL OR char_length(message) <= 5000)
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'seed_waitlist_lengths') THEN
    ALTER TABLE public.seed_membership_waitlist ADD CONSTRAINT seed_waitlist_lengths CHECK (
      char_length(name) BETWEEN 1 AND 200
      AND char_length(email) BETWEEN 3 AND 320
      AND (message IS NULL OR char_length(message) <= 5000)
      AND (
        interests IS NULL
        OR (
          coalesce(cardinality(interests), 0) <= 30
          AND char_length(array_to_string(interests, ',')) <= 2000
        )
      )
    );
  END IF;
END $$;
