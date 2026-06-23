import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/auth')
  }

  // Fetch profile to get display_name
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, avatar_url')
    .eq('id', user.id)
    .single()

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'Learner'

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      <Navbar variant="page" />
      
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontWeight: 300, fontSize: 40, color: "#0A0A0A", marginBottom: 16
        }}>
          Welcome back, {displayName}.
        </h1>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 16,
          color: "rgba(10,10,10,0.6)", marginBottom: 64
        }}>
          Continue your Japanese journey.
        </p>

        {/* Current Path Section */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13,
            letterSpacing: "0.1em", textTransform: "uppercase", color: "#0A0A0A", marginBottom: 24
          }}>Current Path</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            <div style={{ background: '#FFF', border: '1px solid rgba(10,10,10,0.08)', padding: 32, borderRadius: 2 }}>
              <h3 style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, fontSize: 24, color: "#0A0A0A", marginBottom: 8 }}>Hiragana</h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(10,10,10,0.5)", marginBottom: 24 }}>0 / 46 Mastered</p>
              <div style={{ width: '100%', height: 2, background: 'rgba(10,10,10,0.05)', position: 'relative' }}></div>
            </div>

            <div style={{ background: '#FFF', border: '1px solid rgba(10,10,10,0.08)', padding: 32, borderRadius: 2 }}>
              <h3 style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, fontSize: 24, color: "#0A0A0A", marginBottom: 8 }}>Katakana</h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(10,10,10,0.5)", marginBottom: 24 }}>0 / 46 Mastered</p>
              <div style={{ width: '100%', height: 2, background: 'rgba(10,10,10,0.05)', position: 'relative' }}></div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section style={{ marginBottom: 64 }}>
           <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13,
            letterSpacing: "0.1em", textTransform: "uppercase", color: "#0A0A0A", marginBottom: 24
          }}>Recent Activity</h2>
          <div style={{ borderTop: '1px solid rgba(10,10,10,0.08)', padding: '24px 0', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(10,10,10,0.4)" }}>No recent activity to display.</p>
          </div>
        </section>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/kana" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#0A0A0A', color: '#FAFAFA',
              border: 'none', padding: '16px 32px', cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13,
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Continue Learning
            </button>
          </Link>
        </div>

      </main>
    </div>
  )
}
