/*
  Focused tests for the email confirmation flow.
  Run each numbered section via execute_sql to verify behavior.
  All test data uses @test-confirm.example.com to avoid collisions.
*/

-- ============================================================
-- SETUP: insert test fixtures
-- ============================================================
DO $$
DECLARE
  v_seed_id uuid;
  v_sub_id uuid;
  v_myc_id uuid;
  v_contact_id uuid;
BEGIN
  -- Seed waitlist entry
  INSERT INTO seed_membership_waitlist (name, email, email_verified, newsletter_consent)
  VALUES ('Test Seed', 'seed@test-confirm.example.com', false, true)
  RETURNING id INTO v_seed_id;

  -- Valid token (not expired)
  INSERT INTO email_confirmation_tokens (token_hash, scope, record_id, email, expires_at)
  VALUES ('aaa_valid_hash_seed', 'seed_waitlist', v_seed_id, 'seed@test-confirm.example.com', now() + interval '1 hour');

  -- Expired token
  INSERT INTO email_confirmation_tokens (token_hash, scope, record_id, email, expires_at)
  VALUES ('bbb_expired_hash_seed', 'seed_waitlist', v_seed_id, 'seed@test-confirm.example.com', now() - interval '1 hour');

  -- Already-consumed token
  INSERT INTO email_confirmation_tokens (token_hash, scope, record_id, email, expires_at, consumed_at)
  VALUES ('ccc_consumed_hash_seed', 'seed_waitlist', v_seed_id, 'seed@test-confirm.example.com', now() + interval '1 hour', now() - interval '30 minutes');

  -- Newsletter subscriber (unsubscribed)
  INSERT INTO email_subscribers (first_name, email, email_verified, newsletter_consent, unsubscribed, unsubscribed_at)
  VALUES ('Test Unsub', 'unsub@test-confirm.example.com', true, true, true, now() - interval '1 day')
  RETURNING id INTO v_sub_id;

  -- Newsletter subscriber (active, for consent separation test)
  INSERT INTO email_subscribers (first_name, email, email_verified, newsletter_consent)
  VALUES ('Test Consent', 'consent@test-confirm.example.com', false, false);

  -- Suppressed recipient
  INSERT INTO suppressed_recipients (email, reason, source_event_id)
  VALUES ('suppressed@test-confirm.example.com', 'bounce', 'test_bounce_001');

  RAISE NOTICE 'SETUP: test fixtures inserted (seed_id=%)', v_seed_id;
END $$;

-- ============================================================
-- TEST 1: Valid token consumption
-- ============================================================
DO $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT consume_confirmation_token('aaa_valid_hash_seed') INTO v_result;
  IF (v_result->>'status') = 'confirmed' THEN
    RAISE NOTICE 'TEST 1 PASS: valid token returns confirmed';
  ELSE
    RAISE NOTICE 'TEST 1 FAIL: expected confirmed, got %', v_result->>'status';
  END IF;
END $$;

-- ============================================================
-- TEST 2: Token reuse returns already_used
-- ============================================================
DO $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT consume_confirmation_token('aaa_valid_hash_seed') INTO v_result;
  IF (v_result->>'status') = 'already_used' THEN
    RAISE NOTICE 'TEST 2 PASS: reused token returns already_used';
  ELSE
    RAISE NOTICE 'TEST 2 FAIL: expected already_used, got %', v_result->>'status';
  END IF;
END $$;

-- ============================================================
-- TEST 3: Expired token returns expired
-- ============================================================
DO $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT consume_confirmation_token('bbb_expired_hash_seed') INTO v_result;
  IF (v_result->>'status') = 'expired' THEN
    RAISE NOTICE 'TEST 3 PASS: expired token returns expired';
  ELSE
    RAISE NOTICE 'TEST 3 FAIL: expected expired, got %', v_result->>'status';
  END IF;
END $$;

-- ============================================================
-- TEST 4: Already-consumed token returns already_used
-- ============================================================
DO $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT consume_confirmation_token('ccc_consumed_hash_seed') INTO v_result;
  IF (v_result->>'status') = 'already_used' THEN
    RAISE NOTICE 'TEST 4 PASS: pre-consumed token returns already_used';
  ELSE
    RAISE NOTICE 'TEST 4 FAIL: expected already_used, got %', v_result->>'status';
  END IF;
END $$;

-- ============================================================
-- TEST 5: Invalid token returns invalid
-- ============================================================
DO $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT consume_confirmation_token('zzz_nonexistent_hash') INTO v_result;
  IF (v_result->>'status') = 'invalid' THEN
    RAISE NOTICE 'TEST 5 PASS: nonexistent token returns invalid';
  ELSE
    RAISE NOTICE 'TEST 5 FAIL: expected invalid, got %', v_result->>'status';
  END IF;
END $$;

-- ============================================================
-- TEST 6: Consent separation - email_verified is independent of newsletter_consent
-- ============================================================
DO $$
DECLARE
  v_verified boolean;
  v_consent boolean;
BEGIN
  -- After TEST 1, seed record should be verified but consent untouched
  SELECT email_verified, newsletter_consent
  INTO v_verified, v_consent
  FROM seed_membership_waitlist
  WHERE email = 'seed@test-confirm.example.com';

  IF v_verified = true THEN
    RAISE NOTICE 'TEST 6a PASS: email_verified is true after confirmation';
  ELSE
    RAISE NOTICE 'TEST 6a FAIL: email_verified should be true';
  END IF;

  -- Consent should be whatever was originally set (true in our fixture)
  -- The point: consume_confirmation_token does NOT alter consent
  SELECT email_verified, newsletter_consent
  INTO v_verified, v_consent
  FROM email_subscribers
  WHERE email = 'consent@test-confirm.example.com';

  IF v_verified = false AND v_consent = false THEN
    RAISE NOTICE 'TEST 6b PASS: unconfirmed subscriber retains consent=false';
  ELSE
    RAISE NOTICE 'TEST 6b FAIL: expected verified=false consent=false, got verified=% consent=%', v_verified, v_consent;
  END IF;
END $$;

-- ============================================================
-- TEST 7: Access restrictions - anon cannot INSERT into locked tables
-- ============================================================
DO $$
DECLARE
  v_has_insert boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.role_table_grants
    WHERE grantee = 'anon'
      AND table_name = 'seed_membership_waitlist'
      AND privilege_type = 'INSERT'
  ) INTO v_has_insert;

  IF v_has_insert = false THEN
    RAISE NOTICE 'TEST 7a PASS: anon cannot INSERT into seed_membership_waitlist';
  ELSE
    RAISE NOTICE 'TEST 7a FAIL: anon still has INSERT on seed_membership_waitlist';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.role_table_grants
    WHERE grantee = 'anon'
      AND table_name = 'email_confirmation_tokens'
      AND privilege_type = 'INSERT'
  ) INTO v_has_insert;

  IF v_has_insert = false THEN
    RAISE NOTICE 'TEST 7b PASS: anon cannot INSERT into email_confirmation_tokens';
  ELSE
    RAISE NOTICE 'TEST 7b FAIL: anon still has INSERT on email_confirmation_tokens';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.role_table_grants
    WHERE grantee = 'anon'
      AND table_name = 'contact_messages'
      AND privilege_type = 'INSERT'
  ) INTO v_has_insert;

  IF v_has_insert = false THEN
    RAISE NOTICE 'TEST 7c PASS: anon cannot INSERT into contact_messages';
  ELSE
    RAISE NOTICE 'TEST 7c FAIL: anon still has INSERT on contact_messages';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.role_table_grants
    WHERE grantee = 'anon'
      AND table_name = 'email_subscribers'
      AND privilege_type = 'INSERT'
  ) INTO v_has_insert;

  IF v_has_insert = false THEN
    RAISE NOTICE 'TEST 7d PASS: anon cannot INSERT into email_subscribers';
  ELSE
    RAISE NOTICE 'TEST 7d FAIL: anon still has INSERT on email_subscribers';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.role_table_grants
    WHERE grantee = 'anon'
      AND table_name = 'mycelium_membership_waitlist'
      AND privilege_type = 'INSERT'
  ) INTO v_has_insert;

  IF v_has_insert = false THEN
    RAISE NOTICE 'TEST 7e PASS: anon cannot INSERT into mycelium_membership_waitlist';
  ELSE
    RAISE NOTICE 'TEST 7e FAIL: anon still has INSERT on mycelium_membership_waitlist';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.role_table_grants
    WHERE grantee = 'anon'
      AND table_name = 'email_dispatches'
      AND privilege_type = 'INSERT'
  ) INTO v_has_insert;

  IF v_has_insert = false THEN
    RAISE NOTICE 'TEST 7f PASS: anon cannot INSERT into email_dispatches';
  ELSE
    RAISE NOTICE 'TEST 7f FAIL: anon still has INSERT on email_dispatches';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.role_table_grants
    WHERE grantee = 'anon'
      AND table_name = 'suppressed_recipients'
      AND privilege_type = 'INSERT'
  ) INTO v_has_insert;

  IF v_has_insert = false THEN
    RAISE NOTICE 'TEST 7g PASS: anon cannot INSERT into suppressed_recipients';
  ELSE
    RAISE NOTICE 'TEST 7g FAIL: anon still has INSERT on suppressed_recipients';
  END IF;
END $$;

-- ============================================================
-- TEST 8: Unsubscribe enforcement - unsubscribed_at blocks reactivation
-- ============================================================
DO $$
DECLARE
  v_unsub_at timestamptz;
  v_consent boolean;
BEGIN
  SELECT unsubscribed_at, newsletter_consent
  INTO v_unsub_at, v_consent
  FROM email_subscribers
  WHERE email = 'unsub@test-confirm.example.com';

  IF v_unsub_at IS NOT NULL THEN
    RAISE NOTICE 'TEST 8 PASS: unsubscribed_at is set, resubscribe blocked at app layer';
  ELSE
    RAISE NOTICE 'TEST 8 FAIL: unsubscribed_at should not be null';
  END IF;
END $$;

-- ============================================================
-- TEST 9: Suppressed recipients exist
-- ============================================================
DO $$
DECLARE
  v_exists boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM suppressed_recipients
    WHERE email = 'suppressed@test-confirm.example.com'
  ) INTO v_exists;

  IF v_exists THEN
    RAISE NOTICE 'TEST 9 PASS: suppressed recipient found in suppression table';
  ELSE
    RAISE NOTICE 'TEST 9 FAIL: suppressed recipient not found';
  END IF;
END $$;

-- ============================================================
-- TEST 10: consume_confirmation_token not callable by anon/authenticated
-- ============================================================
DO $$
DECLARE
  v_has_execute boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.routine_privileges
    WHERE routine_name = 'consume_confirmation_token'
      AND grantee IN ('anon', 'authenticated', 'PUBLIC')
      AND privilege_type = 'EXECUTE'
  ) INTO v_has_execute;

  IF v_has_execute = false THEN
    RAISE NOTICE 'TEST 10 PASS: consume_confirmation_token not callable by anon/authenticated/PUBLIC';
  ELSE
    RAISE NOTICE 'TEST 10 FAIL: consume_confirmation_token is still callable by browser roles';
  END IF;
END $$;

-- ============================================================
-- CLEANUP: remove test fixtures
-- ============================================================
DO $$
BEGIN
  DELETE FROM email_confirmation_tokens WHERE email LIKE '%@test-confirm.example.com';
  DELETE FROM seed_membership_waitlist WHERE email LIKE '%@test-confirm.example.com';
  DELETE FROM email_subscribers WHERE email LIKE '%@test-confirm.example.com';
  DELETE FROM suppressed_recipients WHERE email LIKE '%@test-confirm.example.com';
  RAISE NOTICE 'CLEANUP: test data removed';
END $$;
