import { createClient } from '@/utils/supabase/client'
import { getGamificationProvider } from '@/providers/GamificationProvider'
import { logActivity } from './activity'

export const BADGES = {
  FIRST_STEP: {
    id: 'first_step',
    name: 'First Step',
    description: 'Answer your first question correctly.',
    icon: '⚡',
    condition: (xp: number) => xp >= 5,
  },
  WEEK_WARRIOR: {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Study 7 days in a row.',
    icon: '🔥',
    condition: (_xp: number, streak: number) => streak >= 7,
  },
  MONTH_MASTER: {
    id: 'month_master',
    name: 'Month Master',
    description: 'Study 30 days in a row.',
    icon: '👑',
    condition: (_xp: number, streak: number) => streak >= 30,
  },
  ASSESSMENT_ACE: {
    id: 'assessment_ace',
    name: 'Assessment Ace',
    description: 'Score 100% on any kana assessment.',
    icon: '🎯',
    condition: () => false, // triggered manually on perfect score
  },
  NIHONGO_WARRIOR: {
    id: 'nihongo_warrior',
    name: 'Nihongo Warrior',
    description: 'Reach Level 7.',
    icon: '⚔️',
    condition: (xp: number) => xp >= 2000,
  },
  CENTURY: {
    id: 'century',
    name: 'Century',
    description: 'Earn 100 XP total.',
    icon: '💯',
    condition: (xp: number) => xp >= 100,
  },
  DEDICATED: {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Earn 500 XP total.',
    icon: '🏅',
    condition: (xp: number) => xp >= 500,
  },
  SCHOLAR: {
    id: 'scholar',
    name: 'Scholar',
    description: 'Earn 1000 XP total.',
    icon: '📚',
    condition: (xp: number) => xp >= 1000,
  },
} as const

export async function checkAchievements(
  userId: string,
  totalXP: number,
  streak: number = 0,
  extras: { perfectAssessment?: boolean } = {}
) {
  const supabase = createClient()

  // Get already earned badges
  const { data: earned } = await supabase
    .from('achievements')
    .select('badge_id')
    .eq('user_id', userId)

  const earnedIds = new Set(earned?.map((e: any) => e.badge_id) ?? [])
  const newBadges: typeof BADGES[keyof typeof BADGES][] = []

  for (const badge of Object.values(BADGES)) {
    if (earnedIds.has(badge.id)) continue

    let unlocked = badge.condition(totalXP, streak)
    if (badge.id === 'assessment_ace' && extras.perfectAssessment) unlocked = true

    if (unlocked) {
      await supabase.from('achievements').insert({ user_id: userId, badge_id: badge.id })
      await logActivity(userId, 'Earned Badge', `You unlocked the ${badge.name} badge!`, 'achievement')
      newBadges.push(badge)
    }
  }

  // Trigger global toast if there are new badges
  const provider = getGamificationProvider()
  if (provider && newBadges.length > 0) {
    newBadges.forEach(badge => provider.showBadge(badge))
  }

  return newBadges // caller can show toast for each
}

export async function getUserAchievements(userId: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('achievements')
    .select('badge_id, earned_at')
    .eq('user_id', userId)
  return data ?? []
}
