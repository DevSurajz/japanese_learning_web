import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AuthSync from '@/components/AuthSync'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/auth')
  }

  // Fetch profile to get display_name
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, avatar_url, current_streak, xp_today_earned, daily_goal_xp, xp_today_date')
    .eq('id', user.id)
    .single()

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'Learner'
  
  // Calculate today's XP
  const today = new Date().toISOString().split('T')[0]
  const xpToday = profile?.xp_today_date === today ? (profile?.xp_today_earned || 0) : 0
  const dailyGoal = profile?.daily_goal_xp || 20
  const streak = profile?.current_streak || 0

  // Fetch Kanji Learned
  const { count: kanjiLearnedCount } = await supabase
    .from('kanji_learned')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const kanjiLearned = kanjiLearnedCount || 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <AuthSync />
      <Navbar variant="page" />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '120px 24px' }}>
        
        {/* Header Section */}
        <header style={{ marginBottom: 48 }}>
          <h1 style={{
            fontFamily: "var(--font-cormorant)", fontStyle: "italic",
            fontWeight: 300, fontSize: "clamp(36px, 5vw, 48px)", color: "var(--text-primary)", marginBottom: 8
          }}>
            Good to see you, {displayName}.
          </h1>
          <p style={{
            fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: 15,
            color: "var(--text-secondary)"
          }}>
            You have 15 reviews due today. Let's keep the momentum going.
          </p>
        </header>

        {/* Action & Stats Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 64
        }}>
          {/* Primary Action Card */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24,
            padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            boxShadow: '0 12px 32px rgba(0,0,0,0.02)'
          }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", background: "rgba(217, 56, 30, 0.08)", color: "var(--accent-red)", borderRadius: 99, fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 24 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-red)" }} />
                Up Next
              </div>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 28, color: "var(--text-primary)", fontWeight: 600, marginBottom: 8 }}>
                Daily Reviews
              </h2>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--text-secondary)", marginBottom: 32 }}>
                15 Vocabulary words are ready for review.
              </p>
            </div>
            <Link href="/review" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%', background: 'var(--accent-red)', color: '#FFFFFF',
                border: 'none', borderRadius: 8, padding: '14px 24px', cursor: 'pointer',
                fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 14,
                transition: 'opacity 0.2s ease'
              }}>
                Start Review Session
              </button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24,
              padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Daily Goal</div>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: 24, color: "var(--text-primary)", fontWeight: 300 }}>{xpToday} <span style={{ fontSize: 16, color: "var(--text-secondary)" }}>/ {dailyGoal} XP</span></div>
              </div>
              <div style={{ position: 'relative', width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
                  <circle cx="24" cy="24" r="22" fill="none" stroke="var(--border-color)" strokeWidth="4" />
                  <circle cx="24" cy="24" r="22" fill="none" stroke="var(--accent-red)" strokeWidth="4" strokeDasharray="138" strokeDashoffset={138 - (Math.min(xpToday / dailyGoal, 1) * 138)} strokeLinecap="round" />
                </svg>
              </div>
            </div>
            
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24,
              padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Current Streak</div>
                <div style={{ fontFamily: "var(--font-inter)", fontSize: 24, color: "var(--text-primary)", fontWeight: 300 }}>{streak} <span style={{ fontSize: 16, color: "var(--text-secondary)" }}>Days</span></div>
              </div>
              <div style={{ fontSize: 24 }}>🔥</div>
            </div>
          </div>
        </div>

        {/* Learning Modules */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{
              fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 13,
              letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-primary)"
            }}>Curriculum</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { id: 'kana', title: 'Kana', desc: '0 / 46 Mastered', link: '/kana' },
              { id: 'kanji', title: 'Kanji', desc: `${kanjiLearned} Learned`, link: '/kanji' },
              { id: 'vocab', title: 'Vocabulary', desc: '0 / 5000+ Words', link: '/vocabulary' },
              { id: 'grammar', title: 'Grammar', desc: 'N5 in progress', link: '/grammar' }
            ].map((mod) => (
              <Link key={mod.id} href={mod.link} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20,
                  padding: 24, height: '100%', transition: 'all 0.2s ease', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'var(--text-primary)' }}>
                      {mod.id === 'kana' ? 'あ' : mod.id === 'kanji' ? '漢' : mod.id === 'vocab' ? '語' : '文'}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 16, color: "var(--text-primary)", marginBottom: 4 }}>
                    {mod.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--text-secondary)" }}>
                    {mod.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
