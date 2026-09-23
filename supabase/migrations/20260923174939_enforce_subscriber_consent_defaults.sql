/*
  # Server-set consent timestamp and unsubscribe state on newsletter signups

  ## Problem
  `email_subscribers` is insertable by the `anon` role with a `true` check, and the signup
  page computed `consent_timestamp` in the browser. A direct REST call could therefore
  backdate the consent audit record, or pre-create a row for someone else's address already
  marked as unsubscribed.

  ## Change
  A BEFORE INSERT trigger that:
    - sets `consent_timestamp` to now() when either consent flag is true, NULL otherwise
    - forces `unsubscribed` to false and `unsubscribed_at` to NULL on insert
    - normalises NULL consent flags to false
  Unsubscribing later remains a service-role operation (no UPDATE policy exists for clients).

  ## Notes
  - Runs after `normalize_email()`; trigger names are ordered alphabetically by Postgres, and
    the two triggers touch different columns, so order does not matter here.
  - No data is dropped or altered.
*/

CREATE OR REPLACE FUNCTION public.enforce_subscriber_consent_defaults()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.newsletter_consent := coalesce(NEW.newsletter_consent, false);
  NEW.community_events_consent := coalesce(NEW.community_events_consent, false);

  IF NEW.newsletter_consent OR NEW.community_events_consent THEN
    NEW.consent_timestamp := now();
  ELSE
    NEW.consent_timestamp := NULL;
  END IF;

  NEW.unsubscribed := false;
  NEW.unsubscribed_at := NULL;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.enforce_subscriber_consent_defaults() FROM public;
REVOKE EXECUTE ON FUNCTION public.enforce_subscriber_consent_defaults() FROM anon;
REVOKE EXECUTE ON FUNCTION public.enforce_subscriber_consent_defaults() FROM authenticated;

DROP TRIGGER IF EXISTS trg_subscriber_consent_defaults ON public.email_subscribers;

CREATE TRIGGER trg_subscriber_consent_defaults
  BEFORE INSERT ON public.email_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.enforce_subscriber_consent_defaults();
