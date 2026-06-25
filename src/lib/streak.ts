import { createClient } from '@/utils/supabase/server'

export const XP_MAP: Record<string, number> = {
  again: 1,
  hard: 2,
  good: 4,
  easy: 5,
}

export const QUALITY_XP_MAP: Record<number, number> = {
  1: 1,
  2: 2,
  4: 4,
  5: 5,
}

export async function updateStreakAndXP(userId: string, xpEarned: number) {
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_streak, longest_streak, last_studied_date, daily_goal_xp, xp_today_earned, xp_today_date')
    .eq('id', userId)
    .single()

  if (!profile) return null

  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const lastStudied = profile.last_studied_date

  let currentStreak = profile.current_streak ?? 0
  let longestStreak = profile.longest_streak ?? 0

  // Update streak
  if (lastStudied === today) {
    // Already studied today — no streak change
  } else if (lastStudied === yesterday) {
    currentStreak += 1
  } else {
    // Streak broken or first time
    currentStreak = 1
  }

  if (currentStreak > longestStreak) longestStreak = currentStreak

  // Update XP
  let xpTodayEarned = profile.xp_today_earned ?? 0
  if (profile.xp_today_date !== today) {
    xpTodayEarned = 0 // Reset for new day
  }
  xpTodayEarned += xpEarned

  const { error } = await supabase
    .from('profiles')
    .update({
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_studied_date: today,
      xp_today_earned: xpTodayEarned,
      xp_today_date: today,
    })
    .eq('id', userId)

  if (error) console.error('streak update error', error)

  return {
    currentStreak,
    longestStreak,
    xpTodayEarned,
    dailyGoalXP: profile.daily_goal_xp ?? 20,
    milestoneHit: [7, 30, 100].includes(currentStreak) && lastStudied !== today ? currentStreak : null,
  }
}
