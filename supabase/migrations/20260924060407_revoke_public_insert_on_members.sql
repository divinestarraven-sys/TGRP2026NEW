/*
  # Close public write access to the members table

  The `members` table was the only relation in the public schema still reachable
  by the Data API: the `anon` and `authenticated` roles held INSERT, and the
  policy `public_insert_members_pending_only` allowed those inserts as long as
  the row carried a pending status. A repository-wide search shows no code path
  reads or writes this table -- every membership signup goes through the
  `seed-submit` edge function, which uses the service role. The grant was
  therefore pure attack surface: anyone holding the public anon key could insert
  unbounded rows directly, bypassing the edge function's validation,
  rate limiting and suppression checks.

  1. Security changes
     - Drop the policy `public_insert_members_pending_only` on `public.members`.
     - Revoke all privileges on `public.members` from `anon` and `authenticated`.
     - Row level security remains enabled, so the table is now deny-by-default
       for client roles while the service role used by the edge functions is
       unaffected (it bypasses RLS and retains its own access).

  2. Notes
     - No data is modified or removed.
     - No application code relied on the revoked grant, so no feature regresses.
*/

DROP POLICY IF EXISTS "public_insert_members_pending_only" ON public.members;

REVOKE ALL PRIVILEGES ON TABLE public.members FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.members FROM authenticated;

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
