-- Migration script to add new fields to profiles

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en',
ADD COLUMN IF NOT EXISTS timezone TEXT;

-- For avatars, if you use Supabase Storage, you'd need:
-- 1. A public bucket named 'avatars'
-- 2. RLS policies to allow authenticated users to upload and anyone to read
-- We'll just continue using the avatar_url text column.

-- Optional: Create a study_activity table if you want to track real data
-- CREATE TABLE IF NOT EXISTS study_activity (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
--   study_date DATE NOT NULL,
--   xp_earned INT DEFAULT 0,
--   minutes_studied INT DEFAULT 0,
--   UNIQUE(user_id, study_date)
-- );
