'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { getLevelInfo } from '@/lib/xp'
import { BADGES, getUserAchievements } from '@/lib/achievements'
import Navbar from '@/components/Navbar'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [achievements, setAchievements] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data: p } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      const earned = await getUserAchievements(user.id)
      setProfile({ ...p, email: user.email })
      setAchievements(earned.map((e: any) => e.badge_id))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div style={{ padding: 40, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>Loading...</div>
  if (!profile) return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      <Navbar variant="page" />
      <div style={{ padding: 40, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>Please sign in to view your profile.</div>
    </div>
  )

  const levelInfo = getLevelInfo(profile.total_xp ?? 0)
  const joinDate = new Date(profile.created_at ?? Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Space Grotesk', sans-serif" }}>
      <Navbar variant="page" />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
        {/* Profile header card */}
        <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: 16, padding: 24, display: 'flex', gap: 20, alignItems: 'center', marginBottom: 20 }}>
          <img
            src={profile.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${profile.display_name ?? profile.email}`}
            alt="avatar"
            style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 4px', color: '#1a1a2e' }}>{profile.display_name ?? 'Learner'}</h1>
            <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 4px' }}>{profile.email}</p>
            <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Joined {joinDate}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4, letterSpacing: '0.05em' }}>LEVEL {levelInfo.current.level}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a2e' }}>{levelInfo.current.title}</div>
          </div>
        </div>

        {/* XP Progress bar */}
        <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: 16, padding: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>Level {levelInfo.current.level} → {levelInfo.next ? `Level ${levelInfo.next.level}` : 'MAX'}</span>
            <span style={{ fontSize: 13, color: '#6b7280' }}>{profile.total_xp ?? 0} XP total</span>
          </div>
          <div style={{ background: '#f3f4f6', borderRadius: 999, height: 8, overflow: 'hidden' }}>
            <div style={{ width: `${levelInfo.progressPercent}%`, height: '100%', background: '#4f46e5', borderRadius: 999, transition: 'width 0.5s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>{levelInfo.progressXP} XP</span>
            <span style={{ fontSize: 11, color: '#9ca3af' }}>{levelInfo.neededXP} XP needed</span>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Current Streak', value: `${profile.current_streak ?? 0}`, unit: 'days' },
            { label: 'Best Streak', value: `${profile.longest_streak ?? 0}`, unit: 'days' },
            { label: 'Total XP', value: `${profile.total_xp ?? 0}`, unit: 'xp' },
            { label: "Today's XP", value: `${profile.today_xp ?? 0}`, unit: `/ ${profile.daily_goal_xp ?? 50} goal` },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#f9fafb', borderRadius: 12, padding: '16px' }}>
              <p style={{ fontSize: 11, color: '#9ca3af', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
              <p style={{ fontSize: 24, fontWeight: 600, margin: '0 0 2px', color: '#1a1a2e' }}>{stat.value}</p>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>{stat.unit}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px', color: '#1a1a2e' }}>Achievements & Badges</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {Object.values(BADGES).map((badge) => {
              const earned = achievements.includes(badge.id)
              return (
                <div key={badge.id} style={{
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: `0.5px solid ${earned ? '#e0e7ff' : '#f3f4f6'}`,
                  background: earned ? '#f5f3ff' : '#f9fafb',
                  opacity: earned ? 1 : 0.5,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 24 }}>{badge.icon}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 2px', color: earned ? '#4338ca' : '#6b7280' }}>{badge.name}</p>
                    <p style={{ fontSize: 11, color: '#9ca3af', margin: 0, lineHeight: 1.4 }}>{badge.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
