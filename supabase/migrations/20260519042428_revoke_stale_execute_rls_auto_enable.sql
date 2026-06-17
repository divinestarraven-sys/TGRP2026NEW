/*
  # Revoke stale EXECUTE grants on rls_auto_enable()

  1. Security Changes
    - Revoke EXECUTE on `public.rls_auto_enable()` from `anon` and `authenticated`
    - These grants persisted from before the function was recreated and need
      to be revoked again after the function recreation.

  2. Important Notes
    - When the function was dropped and recreated in the earlier migration,
      the explicit grants to anon and authenticated were carried over or
      re-applied. This migration removes them definitively.
    - The `service_role` retains EXECUTE for internal system operations.
*/

REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;
