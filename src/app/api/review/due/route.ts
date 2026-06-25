import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter')
    const cardType = searchParams.get('type')?.toUpperCase()

    const now = new Date().toISOString()

    let query = supabase
      .from('user_card_progress')
      .select('*')
      .eq('user_id', user.id)
      .lte('next_review_at', now)
      .order('next_review_at', { ascending: true })
      .limit(20)

    if (cardType) {
      query = query.eq('card_type', cardType)
    }

    if (filter === 'weak') {
      query = supabase
        .from('user_card_progress')
        .select('*')
        .eq('user_id', user.id)
        .or('easiness.lt.1.8,and(repetitions.lt.3,interval.gt.0)')
        .order('easiness', { ascending: true })
        .limit(20)
      
      if (cardType) query = query.eq('card_type', cardType)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ cards: data ?? [] })
  } catch (err) {
    console.error('review/due error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
