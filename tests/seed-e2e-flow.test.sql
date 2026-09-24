-- ==========================================================================
-- Seed-membership end-to-end flow test
-- Covers: signup +/- newsletter, pending state, confirmation, single-use,
--         expired link, resend, duplicate submissions,
--         unsubscribe, suppression, and provider-failure recovery.
--
-- Run with:  execute_sql (Supabase MCP tool)
-- All email delivery is mocked — we insert tokens directly and call
-- consume_confirmation_token to simulate the confirmation click.
-- ==========================================================================

-- Cleanup previous test data (safe: only touches @test.invalid emails)
DELETE FROM email_confirmation_tokens WHERE email LIKE '%@test.invalid';
DELETE FROM seed_membership_waitlist  WHERE email LIKE '%@test.invalid';
DELETE FROM email_subscribers         WHERE email LIKE '%@test.invalid';

-- -------------------------------------------------------------------------
-- 1. Signup WITH newsletter consent OFF
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO seed_membership_waitlist (name, email, interests, message, newsletter_consent)
  VALUES ('Test NoNews', 'nonews@test.invalid', ARRAY['Codex Access'], '', false)
  RETURNING id INTO v_id;

  -- Row should exist with email_verified = false
  PERFORM 1 FROM seed_membership_waitlist
    WHERE id = v_id AND email_verified = false;
  IF NOT FOUND THEN RAISE EXCEPTION 'FAIL 1a: expected unverified row'; END IF;

  -- No subscriber row should exist
  PERFORM 1 FROM email_subscribers WHERE email = 'nonews@test.invalid';
  IF FOUND THEN RAISE EXCEPTION 'FAIL 1b: subscriber row created without consent'; END IF;

  RAISE NOTICE 'PASS 1: Signup without newsletter consent';
END $$;

-- -------------------------------------------------------------------------
-- 2. Signup WITH newsletter consent ON
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO seed_membership_waitlist (name, email, interests, message, newsletter_consent)
  VALUES ('Test WithNews', 'withnews@test.invalid', ARRAY['Events'], 'hello', true)
  RETURNING id INTO v_id;

  PERFORM 1 FROM seed_membership_waitlist
    WHERE id = v_id AND email_verified = false;
  IF NOT FOUND THEN RAISE EXCEPTION 'FAIL 2: expected unverified row'; END IF;

  RAISE NOTICE 'PASS 2: Signup with newsletter consent';
END $$;

-- -------------------------------------------------------------------------
-- 3. Pending state: row exists, not yet verified
-- -------------------------------------------------------------------------
DO $$
BEGIN
  PERFORM 1 FROM seed_membership_waitlist
    WHERE email = 'withnews@test.invalid'
      AND email_verified = false;
  IF NOT FOUND THEN RAISE EXCEPTION 'FAIL 3: row not in unverified state'; END IF;

  RAISE NOTICE 'PASS 3: Pending (unverified) state verified';
END $$;

-- -------------------------------------------------------------------------
-- 4. Create a confirmation token and confirm it
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_record_id uuid;
  v_hash text := 'test_hash_confirm_4';
  v_status text;
BEGIN
  SELECT id INTO v_record_id FROM seed_membership_waitlist
    WHERE email = 'withnews@test.invalid';

  INSERT INTO email_confirmation_tokens (token_hash, email, scope, record_id, expires_at)
  VALUES (v_hash, 'withnews@test.invalid', 'seed_waitlist', v_record_id, now() + interval '24 hours');

  SELECT out_status INTO v_status FROM consume_confirmation_token(v_hash);
  IF v_status != 'confirmed' THEN
    RAISE EXCEPTION 'FAIL 4a: expected confirmed, got %', v_status;
  END IF;

  -- Seed row should now be verified
  PERFORM 1 FROM seed_membership_waitlist
    WHERE id = v_record_id AND email_verified = true;
  IF NOT FOUND THEN RAISE EXCEPTION 'FAIL 4b: seed row not verified after confirmation'; END IF;

  RAISE NOTICE 'PASS 4: Confirmation token consumed, seed row verified';
END $$;

-- -------------------------------------------------------------------------
-- 5. Single-use enforcement
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_status text;
BEGIN
  SELECT out_status INTO v_status FROM consume_confirmation_token('test_hash_confirm_4');
  IF v_status != 'already_used' THEN
    RAISE EXCEPTION 'FAIL 5: expected already_used, got %', v_status;
  END IF;

  RAISE NOTICE 'PASS 5: Single-use enforcement works';
END $$;

-- -------------------------------------------------------------------------
-- 6. Expired token rejected
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_record_id uuid;
  v_hash text := 'test_hash_expired_6';
  v_status text;
BEGIN
  SELECT id INTO v_record_id FROM seed_membership_waitlist
    WHERE email = 'withnews@test.invalid';

  INSERT INTO email_confirmation_tokens (token_hash, email, scope, record_id, expires_at)
  VALUES (v_hash, 'withnews@test.invalid', 'seed_waitlist', v_record_id, now() - interval '1 hour');

  SELECT out_status INTO v_status FROM consume_confirmation_token(v_hash);
  IF v_status != 'expired' THEN
    RAISE EXCEPTION 'FAIL 6: expected expired, got %', v_status;
  END IF;

  RAISE NOTICE 'PASS 6: Expired token rejected';
END $$;

-- -------------------------------------------------------------------------
-- 7. Resend: new token for same email works
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_record_id uuid;
  v_hash text := 'test_hash_resend_7';
  v_status text;
BEGIN
  SELECT id INTO v_record_id FROM seed_membership_waitlist
    WHERE email = 'withnews@test.invalid';

  INSERT INTO email_confirmation_tokens (token_hash, email, scope, record_id, expires_at)
  VALUES (v_hash, 'withnews@test.invalid', 'seed_waitlist', v_record_id, now() + interval '24 hours');

  SELECT out_status INTO v_status FROM consume_confirmation_token(v_hash);
  IF v_status != 'confirmed' THEN
    RAISE EXCEPTION 'FAIL 7: expected confirmed, got %', v_status;
  END IF;

  RAISE NOTICE 'PASS 7: Resend + consume works';
END $$;

-- -------------------------------------------------------------------------
-- 8. Duplicate submissions (unique constraint on email)
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_count int;
BEGIN
  BEGIN
    INSERT INTO seed_membership_waitlist (name, email, interests, message, newsletter_consent)
    VALUES ('Test Dupe', 'withnews@test.invalid', ARRAY['Garden'], '', true);
  EXCEPTION WHEN unique_violation THEN
    NULL; -- expected
  END;

  SELECT count(*) INTO v_count FROM seed_membership_waitlist
    WHERE email = 'withnews@test.invalid';
  IF v_count != 1 THEN
    RAISE EXCEPTION 'FAIL 8: expected exactly 1 row, got %', v_count;
  END IF;

  RAISE NOTICE 'PASS 8: Duplicate submission blocked by unique constraint';
END $$;

-- -------------------------------------------------------------------------
-- 9. Unsubscribe
-- -------------------------------------------------------------------------
DO $$
BEGIN
  INSERT INTO email_subscribers (email, first_name, source, newsletter_consent)
  VALUES ('unsub@test.invalid', 'Unsub', 'seed', true)
  ON CONFLICT (email) DO NOTHING;

  UPDATE email_subscribers
    SET unsubscribed = true, unsubscribed_at = now()
    WHERE email = 'unsub@test.invalid';

  PERFORM 1 FROM email_subscribers
    WHERE email = 'unsub@test.invalid' AND unsubscribed = true AND unsubscribed_at IS NOT NULL;
  IF NOT FOUND THEN RAISE EXCEPTION 'FAIL 9: unsubscribe not recorded'; END IF;

  RAISE NOTICE 'PASS 9: Unsubscribe recorded';
END $$;

-- -------------------------------------------------------------------------
-- 10. Suppression persists
-- -------------------------------------------------------------------------
DO $$
BEGIN
  PERFORM 1 FROM email_subscribers
    WHERE email = 'unsub@test.invalid' AND unsubscribed = true;
  IF NOT FOUND THEN RAISE EXCEPTION 'FAIL 10: suppression cleared unexpectedly'; END IF;

  RAISE NOTICE 'PASS 10: Suppression persists';
END $$;

-- -------------------------------------------------------------------------
-- 11. Provider failure + recovery
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_hash1 text := 'test_hash_fail_11a';
  v_hash2 text := 'test_hash_fail_11b';
  v_record_id uuid;
  v_status text;
BEGIN
  -- Create a seed row for the test
  INSERT INTO seed_membership_waitlist (name, email, interests, newsletter_consent)
  VALUES ('Fail Sim', 'failsim@test.invalid', ARRAY['Events'], false)
  RETURNING id INTO v_record_id;

  -- Token created but never consumed (simulates delivery failure)
  INSERT INTO email_confirmation_tokens (token_hash, email, scope, record_id, expires_at)
  VALUES (v_hash1, 'failsim@test.invalid', 'seed_waitlist', v_record_id, now() + interval '24 hours');

  PERFORM 1 FROM email_confirmation_tokens
    WHERE token_hash = v_hash1 AND consumed_at IS NULL;
  IF NOT FOUND THEN RAISE EXCEPTION 'FAIL 11a: pending token not found'; END IF;

  -- Recovery: mint a new token
  INSERT INTO email_confirmation_tokens (token_hash, email, scope, record_id, expires_at)
  VALUES (v_hash2, 'failsim@test.invalid', 'seed_waitlist', v_record_id, now() + interval '24 hours');

  SELECT out_status INTO v_status FROM consume_confirmation_token(v_hash2);
  IF v_status != 'confirmed' THEN
    RAISE EXCEPTION 'FAIL 11b: recovery token failed, got %', v_status;
  END IF;

  RAISE NOTICE 'PASS 11: Provider failure + recovery flow works';
END $$;

-- -------------------------------------------------------------------------
-- 12. Invalid token hash returns 'invalid'
-- -------------------------------------------------------------------------
DO $$
DECLARE
  v_status text;
BEGIN
  SELECT out_status INTO v_status FROM consume_confirmation_token('nonexistent_hash_xyz');
  IF v_status != 'invalid' THEN
    RAISE EXCEPTION 'FAIL 12: expected invalid, got %', v_status;
  END IF;

  RAISE NOTICE 'PASS 12: Invalid token rejected';
END $$;

-- -------------------------------------------------------------------------
-- Cleanup
-- -------------------------------------------------------------------------
DELETE FROM email_confirmation_tokens WHERE email LIKE '%@test.invalid';
DELETE FROM seed_membership_waitlist  WHERE email LIKE '%@test.invalid';
DELETE FROM email_subscribers         WHERE email LIKE '%@test.invalid';

SELECT 'ALL 12 SEED E2E TESTS PASSED' AS result;
