/*
  # Revoke public EXECUTE grant on rls_auto_enable()

  1. Security Changes
    - Revoke EXECUTE on `public.rls_auto_enable()` from the `public` role
      (the default PostgreSQL role that grants to all users)
    - This ensures anon and authenticated can no longer execute the function
      via the REST API, even though they inherit from the public role.

  2. Important Notes
    - PostgreSQL automatically grants EXECUTE on functions to the `public` role
      when they are created. The previous migration revoked explicit grants from
      anon and authenticated, but the inherited grant from `public` remained.
    - The `service_role` retains EXECUTE privilege for internal system operations.
    - The event trigger continues to work as it runs as the function owner.
*/

REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM public;
