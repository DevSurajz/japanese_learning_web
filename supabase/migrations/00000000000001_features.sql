-- Waitlist table
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  level text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(email, level)
);

-- Profiles updates for streaks and XP
alter table public.profiles
  add column current_streak integer default 0,
  add column longest_streak integer default 0,
  add column last_studied_date date,
  add column daily_goal_xp integer default 20,
  add column xp_today_earned integer default 0,
  add column xp_today_date date;

-- User Card Progress for SRS (SM-2)
create table public.user_card_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  card_id text not null,
  card_type text not null check (card_type in ('KANA', 'KANJI', 'VOCAB', 'GRAMMAR')),
  easiness numeric(4,2) default 2.5 not null,
  interval integer default 0 not null,
  repetitions integer default 0 not null,
  next_review_at timestamp with time zone,
  last_reviewed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, card_id)
);

-- RLS for Waitlist
alter table public.waitlist enable row level security;
create policy "Anyone can insert into waitlist" on public.waitlist for insert with check (true);

-- RLS for user_card_progress
alter table public.user_card_progress enable row level security;
create policy "Users can view their own progress" on public.user_card_progress for select using (auth.uid() = user_id);
create policy "Users can insert their own progress" on public.user_card_progress for insert with check (auth.uid() = user_id);
create policy "Users can update their own progress" on public.user_card_progress for update using (auth.uid() = user_id);
