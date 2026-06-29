-- Add practice_xp to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS practice_xp bigint DEFAULT 0;

-- Create kanji_learned table
CREATE TABLE IF NOT EXISTS public.kanji_learned (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  kanji_id text NOT NULL,
  learned_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, kanji_id)
);

-- Enable RLS
ALTER TABLE public.kanji_learned ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own learned kanji" ON public.kanji_learned
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own learned kanji" ON public.kanji_learned
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create kanji_mastery table
CREATE TABLE IF NOT EXISTS public.kanji_mastery (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  kanji_id text NOT NULL,
  correct_answers integer DEFAULT 0 NOT NULL,
  wrong_answers integer DEFAULT 0 NOT NULL,
  mastery_percent integer DEFAULT 0 NOT NULL,
  last_reviewed timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, kanji_id)
);

-- Enable RLS
ALTER TABLE public.kanji_mastery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own kanji mastery" ON public.kanji_mastery
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own kanji mastery" ON public.kanji_mastery
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own kanji mastery" ON public.kanji_mastery
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);


