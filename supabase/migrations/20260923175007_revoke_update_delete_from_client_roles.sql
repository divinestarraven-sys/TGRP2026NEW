/*
  # Remove UPDATE and DELETE privileges from the browser-facing roles

  ## Problem
  `anon` and `authenticated` held SELECT, INSERT, UPDATE and DELETE on all five public
  tables. Only the absence of matching RLS policies stood between the internet and editing
  or deleting every contact message, subscriber and member record, so a single future
  permissive policy (or a moment with RLS off) would expose the whole history.

  ## Change
  Revoke UPDATE and DELETE from `anon` and `authenticated` on all five tables.
  SELECT and INSERT are left in place: the four site forms insert without chaining
  `.select()`, and reads are already denied by RLS (no SELECT policy exists), so
  narrowing them further would only risk breaking a future feature.

  ## Notes
  - `service_role` keeps full privileges for operator/back-office work.
  - No policy is removed and no data is altered; this only narrows table grants.
*/

REVOKE UPDATE, DELETE ON public.contact_messages FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.email_subscribers FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.members FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.mycelium_membership_waitlist FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.seed_membership_waitlist FROM anon, authenticated;
