import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { updateStreakAndXP, QUALITY_XP_MAP } from '@/lib/streak'

function runSM2(
  easiness: number,
  interval: number,
  repetitions: number,
  quality: number
) {
  let newEasiness = easiness
  let newInterval = interval
  let newRepetitions = repetitions

  if (quality >= 3) {
    if (newRepetitions === 0) newInterval = 1
    else if (newRepetitions === 1) newInterval = 6
    else newInterval = Math.round(newInterval * newEasiness)
    newRepetitions += 1
  } else {
    newRepetitions = 0
    newInterval = 1
  }

  newEasiness = newEasiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (newEasiness < 1.3) newEasiness = 1.3

  const nextReviewAt = new Date()
  nextReviewAt.setDate(nextReviewAt.getDate() + newInterval)

  return {
    easiness: parseFloat(newEasiness.toFixed(2)),
    interval: newInterval,
    repetitions: newRepetitions,
    nextReviewAt: nextReviewAt.toISOString(),
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { cardId, cardType, quality } = await request.json()
    if (!cardId || !cardType || quality === undefined) {
      return NextResponse.json({ error: 'cardId, cardType, quality required' }, { status: 400 })
    }

    const validQualities = [1, 2, 4, 5]
    if (!validQualities.includes(quality)) {
      return NextResponse.json({ error: 'quality must be 1, 2, 4, or 5' }, { status: 400 })
    }

    // Get existing progress or use defaults
    const { data: existing } = await supabase
      .from('user_card_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('card_id', cardId)
      .single()

    const currentEasiness = existing?.easiness ?? 2.5
    const currentInterval = existing?.interval ?? 0
    const currentRepetitions = existing?.repetitions ?? 0

    const sm2Result = runSM2(currentEasiness, currentInterval, currentRepetitions, quality)

    const xpEarned = QUALITY_XP_MAP[quality] ?? 1
    const isNewCard = !existing
    const totalXP = xpEarned + (isNewCard ? 5 : 0)

    const now = new Date().toISOString()
    const upsertData = {
      user_id: user.id,
      card_id: cardId,
      card_type: cardType,
      easiness: sm2Result.easiness,
      interval: sm2Result.interval,
      repetitions: sm2Result.repetitions,
      next_review_at: sm2Result.nextReviewAt,
      last_reviewed_at: now,
      updated_at: now,
    }

    const { error: upsertError } = await supabase
      .from('user_card_progress')
      .upsert(upsertData, { onConflict: 'user_id,card_id' })

    if (upsertError) throw upsertError

    // Update streak and XP
    const streakResult = await updateStreakAndXP(user.id, totalXP)

    return NextResponse.json({
      success: true,
      sm2: sm2Result,
      xpEarned: totalXP,
      streak: streakResult,
    })
  } catch (err) {
    console.error('review/answer error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
