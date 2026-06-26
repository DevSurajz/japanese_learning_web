-- Migration script to add new fields to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en',
ADD COLUMN IF NOT EXISTS timezone TEXT;

-- Create study_activity table for daily tracking (Heatmap, Weekly Charts)
CREATE TABLE IF NOT EXISTS public.study_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  study_date DATE NOT NULL,
  xp_earned INT DEFAULT 0,
  minutes_studied INT DEFAULT 0,
  UNIQUE(user_id, study_date)
);

-- Create activity_logs table for the Activity Timeline
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT NOT NULL, -- e.g., 'lesson', 'quiz', 'achievement', 'kanji', 'level_up'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.study_activity ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own study activity" ON public.study_activity;
CREATE POLICY "Users can view their own study activity" ON public.study_activity FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert their own study activity" ON public.study_activity;
CREATE POLICY "Users can insert their own study activity" ON public.study_activity FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their own study activity" ON public.study_activity;
CREATE POLICY "Users can update their own study activity" ON public.study_activity FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own activity logs" ON public.activity_logs;
CREATE POLICY "Users can view their own activity logs" ON public.activity_logs FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert their own activity logs" ON public.activity_logs;
CREATE POLICY "Users can insert their own activity logs" ON public.activity_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
