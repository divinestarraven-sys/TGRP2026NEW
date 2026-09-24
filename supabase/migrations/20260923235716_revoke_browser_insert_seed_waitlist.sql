/*
# Remove browser INSERT on seed_membership_waitlist

Seed access requests now go through the seed-submit edge function, which
uses the service role.  The browser no longer needs direct INSERT access
to this table.  Revoking prevents any client-side bypass of the server
validation, rate limiting, and email confirmation flow.
*/

DROP POLICY IF EXISTS "anon_insert_seed_waitlist" ON public.seed_membership_waitlist;
REVOKE INSERT ON public.seed_membership_waitlist FROM anon, authenticated;
