/*
# Harden members_entitlements grants

1. Security changes
   - Revoke all privileges from anon on members_entitlements (anon should
     never read or write entitlement rows).
   - Revoke UPDATE and DELETE from authenticated (only service_role
     edge functions may change tier/status — the DELETE policy already
     uses USING(false), and column-level UPDATE was already revoked,
     but the table-level grant still existed).
   - Revoke EXECUTE on append_processed_event from anon and authenticated
     (only the service_role webhook handler should call it).

2. Important notes
   - authenticated retains SELECT and INSERT so the Auth trigger +
     client entitlement reads still work.
   - No data is modified.
*/

REVOKE ALL PRIVILEGES ON TABLE public.members_entitlements FROM anon;
REVOKE UPDATE, DELETE ON TABLE public.members_entitlements FROM authenticated;

REVOKE EXECUTE ON FUNCTION public.append_processed_event(uuid, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.append_processed_event(uuid, text) FROM authenticated;
