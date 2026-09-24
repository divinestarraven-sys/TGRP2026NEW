/*
# Revoke PUBLIC execute on append_processed_event

The function had a default EXECUTE grant to PUBLIC (which includes anon
and authenticated roles). Only the service_role should call this function
from the stripe-webhook edge function.

1. Security changes
   - Revoke EXECUTE from PUBLIC on append_processed_event.
*/

REVOKE EXECUTE ON FUNCTION public.append_processed_event(uuid, text) FROM PUBLIC;
