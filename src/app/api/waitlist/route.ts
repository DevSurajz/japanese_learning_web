import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  try {
    const { email, level } = await request.json()
    
    if (!email || !level) {
      return NextResponse.json({ error: 'Email and level are required' }, { status: 400 })
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.from('waitlist').insert([{ email, level }])
    
    // 23505 is PostgreSQL unique violation error code.
    // If it's a unique constraint error, we silently succeed (deduplication).
    if (error && error.code !== '23505') {
      console.error("Waitlist insert error:", error)
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Waitlist route error:", err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
