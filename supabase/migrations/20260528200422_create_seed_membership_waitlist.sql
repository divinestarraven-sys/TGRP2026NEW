/*
  # Create seed membership waitlist table

  1. New Tables
    - `seed_membership_waitlist`
      - `id` (uuid, primary key)
      - `name` (text, required) - applicant's name
      - `email` (text, unique, required) - applicant's email
      - `interests` (text[], default empty) - selected interest areas
      - `message` (text, optional) - personal message
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `seed_membership_waitlist` table
    - Add INSERT policy for anonymous users (public form submission)
    - No SELECT/UPDATE/DELETE policies for public users (admin only)
*/

CREATE TABLE IF NOT EXISTS seed_membership_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  interests text[] DEFAULT '{}',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE seed_membership_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous form submissions"
  ON seed_membership_waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);
