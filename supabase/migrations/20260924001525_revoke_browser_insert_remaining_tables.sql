/*
# Revoke browser INSERT access on contact_messages, email_subscribers, mycelium_membership_waitlist

These three tables are now exclusively populated by their respective edge functions
(contact-submit, newsletter-submit, mycelium-submit) using the service role key.
Browser clients (anon/authenticated) must not insert directly.

1. Security changes
   - Drop INSERT policies on contact_messages, email_subscribers, mycelium_membership_waitlist
   - Revoke INSERT privilege from anon and authenticated on all three tables
   
2. Important notes
   - The members table INSERT policy is intentionally kept as-is (different signup flow)
   - seed_membership_waitlist was already locked down in a prior migration
*/

-- contact_messages
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
REVOKE INSERT ON contact_messages FROM anon, authenticated;

-- email_subscribers
DROP POLICY IF EXISTS "anon_insert_email_subscribers" ON email_subscribers;
REVOKE INSERT ON email_subscribers FROM anon, authenticated;

-- mycelium_membership_waitlist
DROP POLICY IF EXISTS "anon_insert_mycelium_waitlist" ON mycelium_membership_waitlist;
REVOKE INSERT ON mycelium_membership_waitlist FROM anon, authenticated;
