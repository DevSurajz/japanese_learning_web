-- Add XP and streak columns to profiles if not already there
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS total_xp integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS today_xp integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS today_xp_date date,
  ADD COLUMN IF NOT EXISTS current_streak integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS longest_streak integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_studied_date date,
  ADD COLUMN IF NOT EXISTS daily_goal_xp integer DEFAULT 50,
  ADD COLUMN IF NOT EXISTS display_name text,
  ADD COLUMN IF NOT EXISTS avatar_url text;

-- Achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id text NOT NULL,
  earned_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id, badge_id)
);

-- Index for leaderboard query
CREATE INDEX IF NOT EXISTS profiles_total_xp_idx ON public.profiles(total_xp DESC);
CREATE INDEX IF NOT EXISTS achievements_user_id_idx ON public.achievements(user_id);

-- RLS policies
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Users can insert own achievements" ON public.achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
