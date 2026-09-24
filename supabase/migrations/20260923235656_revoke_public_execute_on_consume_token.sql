/*
# Revoke public execute on consume_confirmation_token

The initial migration revoked EXECUTE from anon and authenticated, but the
PUBLIC pseudo-role grant still allows access.  Revoke from PUBLIC so only
service_role (edge functions) can call this function.
*/

REVOKE EXECUTE ON FUNCTION public.consume_confirmation_token(text) FROM PUBLIC;
