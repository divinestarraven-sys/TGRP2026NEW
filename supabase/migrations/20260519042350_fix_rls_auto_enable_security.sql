/*
  # Fix SECURITY DEFINER vulnerability on rls_auto_enable()

  1. Security Changes
    - Revoke EXECUTE privilege on `public.rls_auto_enable()` from `anon` role
    - Revoke EXECUTE privilege on `public.rls_auto_enable()` from `authenticated` role
    - Change function security from `SECURITY DEFINER` to `SECURITY INVOKER`

  2. Important Notes
    - The `rls_auto_enable()` function is an event trigger that auto-enables RLS
      on newly created tables in the public schema. It was executable by both anon
      and authenticated roles as a SECURITY DEFINER function, meaning it ran with
      the privileges of its owner (typically superuser). This allowed any user to
      execute the function with elevated privileges via the REST API at
      /rest/v1/rpc/rls_auto_enable.
    - By revoking EXECUTE and switching to SECURITY INVOKER, the function can no
      longer be called via the REST API by unprivileged roles, and even if called,
      it would run with the caller's own (limited) privileges.
    - The event trigger `ensure_rls` is temporarily dropped and recreated to allow
      the function replacement. The trigger behavior is unchanged.
*/

-- Revoke execute from anon and authenticated
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;

-- Drop dependent event trigger, then the function
DROP EVENT TRIGGER IF EXISTS ensure_rls;
DROP FUNCTION IF EXISTS public.rls_auto_enable();

-- Recreate with SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.rls_auto_enable()
RETURNS event_trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$;

-- Recreate the event trigger
CREATE EVENT TRIGGER ensure_rls
  ON ddl_command_end
  WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
  EXECUTE FUNCTION public.rls_auto_enable();
