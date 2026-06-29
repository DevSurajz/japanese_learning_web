import { createClient } from '@/utils/supabase/client'
import { checkAchievements } from './achievements'
import { getGamificationProvider } from '@/providers/GamificationProvider'
import { getLocalToday, getLocalYesterday } from '@/utils/dateUtils'

export const XP_VALUES = {
  CORRECT_LEARN: 5,
  CORRECT_REVIEW: 5,
  COMPLETE_SECTION: 5,
  FINISH_REVIEW_QUEUE: 10,
  PERFECT_ASSESSMENT: 5,
  STREAK_7_DAYS: 50,
  STREAK_30_DAYS: 150,
  UNLOCK_KANJI: 10,
} as const

export const LEVELS = [
  { level: 1, title: 'Beginner',           minXP: 0    },
  { level: 2, title: 'Hiragana Student',   minXP: 100  },
  { level: 3, title: 'Katakana Student',   minXP: 250  },
  { level: 4, title: 'Kana Master',        minXP: 500  },
  { level: 5, title: 'Kanji Apprentice',   minXP: 900  },
  { level: 6, title: 'JLPT N5 Scholar',   minXP: 1400 },
  { level: 7, title: 'Nihongo Warrior',    minXP: 2000 },
]

export function getLevelInfo(totalXP: number) {
  let current = LEVELS[0]
  let next = LEVELS[1]

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i].minXP) {
      current = LEVELS[i]
      next = LEVELS[i + 1] ?? null
      break
    }
  }

  const progressXP = totalXP - current.minXP
  const neededXP = next ? next.minXP - current.minXP : 0
  const progressPercent = next ? Math.round((progressXP / neededXP) * 100) : 100

  return { current, next, progressXP, neededXP, progressPercent }
}

export async function addXP(amount: number, userId?: string) {
  // Guest: use localStorage
  if (!userId) {
    const raw = localStorage.getItem('nihongopath_guest_xp')
    const data = raw ? JSON.parse(raw) : { totalXP: 0, todayXP: 0, todayDate: '' }
    const today = getLocalToday()
    data.totalXP += amount
    data.todayXP = data.todayDate === today ? data.todayXP + amount : amount
    data.todayDate = today
    localStorage.setItem('nihongopath_guest_xp', JSON.stringify(data))
    
    getGamificationProvider()?.showXP(amount)
    return data.totalXP
  }

  // Logged in: update DB
  const supabase = createClient()
  const today = getLocalToday()

  const { data: profile } = await supabase
    .from('profiles')
    .select('total_xp, today_xp, today_xp_date')
    .eq('id', userId)
    .single()

  if (!profile) return

  const isSameDay = profile.today_xp_date === today
  const newTotalXP = (profile.total_xp ?? 0) + amount
  const newTodayXP = isSameDay ? (profile.today_xp ?? 0) + amount : amount

  await supabase
    .from('profiles')
    .update({
      total_xp: newTotalXP,
      today_xp: newTodayXP,
      today_xp_date: today,
    })
    .eq('id', userId)

  // Track daily XP for heatmap and charts
  await supabase
    .from('study_activity')
    .upsert(
      {
        user_id: userId,
        study_date: today,
        xp_earned: newTodayXP,
      },
      { onConflict: 'user_id, study_date' }
    )

  // Check achievements after XP update
  await checkAchievements(userId, newTotalXP)
  
  getGamificationProvider()?.showXP(amount)

  return newTotalXP
}

export async function addPracticeXP(amount: number, userId?: string) {
  if (!userId) {
    // Guest: use localStorage
    const raw = localStorage.getItem('nihongopath_guest_xp')
    const data = raw ? JSON.parse(raw) : { totalXP: 0, todayXP: 0, todayDate: '', practiceXP: 0 }
    const today = getLocalToday()
    data.totalXP += amount
    data.practiceXP = (data.practiceXP || 0) + amount
    data.todayXP = data.todayDate === today ? data.todayXP + amount : amount
    data.todayDate = today
    localStorage.setItem('nihongopath_guest_xp', JSON.stringify(data))
    
    getGamificationProvider()?.showXP(amount)
    return data.totalXP
  }

  const supabase = createClient()
  const today = getLocalToday()

  const { data: profile } = await supabase
    .from('profiles')
    .select('total_xp, today_xp, today_xp_date, practice_xp')
    .eq('id', userId)
    .single()

  if (!profile) return

  const isSameDay = profile.today_xp_date === today
  const newTotalXP = (profile.total_xp ?? 0) + amount
  const newTodayXP = isSameDay ? (profile.today_xp ?? 0) + amount : amount
  const newPracticeXP = (profile.practice_xp ?? 0) + amount

  await supabase
    .from('profiles')
    .update({
      total_xp: newTotalXP,
      today_xp: newTodayXP,
      today_xp_date: today,
      practice_xp: newPracticeXP
    })
    .eq('id', userId)

  await supabase
    .from('study_activity')
    .upsert(
      {
        user_id: userId,
        study_date: today,
        xp_earned: newTodayXP,
      },
      { onConflict: 'user_id, study_date' }
    )

  await checkAchievements(userId, newTotalXP)
  getGamificationProvider()?.showXP(amount)

  return newTotalXP
}

export async function updateStreak(userId?: string) {
  const today = getLocalToday()
  const yesterday = getLocalYesterday()

  if (!userId) {
    const raw = localStorage.getItem('nihongopath_guest_streak')
    const data = raw ? JSON.parse(raw) : { currentStreak: 0, longestStreak: 0, lastStudiedDate: '' }
    if (data.lastStudiedDate === today) return
    if (data.lastStudiedDate === yesterday) data.currentStreak++
    else data.currentStreak = 1
    data.longestStreak = Math.max(data.longestStreak, data.currentStreak)
    data.lastStudiedDate = today
    localStorage.setItem('nihongopath_guest_streak', JSON.stringify(data))
    return
  }

  const supabase = createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_streak, longest_streak, last_studied_date')
    .eq('id', userId)
    .single()

  if (!profile) return
  if (profile.last_studied_date === today) return

  let newStreak = 1
  if (profile.last_studied_date === yesterday) {
    newStreak = (profile.current_streak ?? 0) + 1
  }

  const newLongest = Math.max(profile.longest_streak ?? 0, newStreak)

  await supabase
    .from('profiles')
    .update({
      current_streak: newStreak,
      longest_streak: newLongest,
      last_studied_date: today,
    })
    .eq('id', userId)

  // Streak milestone XP bonuses
  if (newStreak === 7) await addXP(XP_VALUES.STREAK_7_DAYS, userId)
  if (newStreak === 30) await addXP(XP_VALUES.STREAK_30_DAYS, userId)
}
