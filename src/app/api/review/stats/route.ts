import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const today = new Date().toISOString().split('T')[0]
    const now = new Date().toISOString()

    const [dueResult, reviewedResult, profileResult] = await Promise.all([
      supabase
        .from('user_card_progress')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .lte('next_review_at', now),
      supabase
        .from('user_card_progress')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('last_reviewed_at', today + 'T00:00:00Z'),
      supabase
        .from('profiles')
        .select('current_streak, xp_today_earned, daily_goal_xp, xp_today_date')
        .eq('id', user.id)
        .single(),
    ])

    const profile = profileResult.data
    const xpToday = profile?.xp_today_date === today ? (profile?.xp_today_earned ?? 0) : 0

    return NextResponse.json({
      dueToday: dueResult.count ?? 0,
      reviewedToday: reviewedResult.count ?? 0,
      streak: profile?.current_streak ?? 0,
      xpToday,
      dailyGoalXP: profile?.daily_goal_xp ?? 20,
      goalMet: xpToday >= (profile?.daily_goal_xp ?? 20),
    })
  } catch (err) {
    console.error('review/stats error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
