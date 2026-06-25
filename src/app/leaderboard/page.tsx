'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { getLevelInfo } from '@/lib/xp'
import Navbar from '@/components/Navbar'

export default function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUserId(user?.id ?? null)

      const { data } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url, total_xp, current_streak, longest_streak, email')
        .order('total_xp', { ascending: false })
        .limit(100)

      setUsers(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const myRank = users.findIndex((u) => u.id === currentUserId) + 1
  const myProfile = users.find((u) => u.id === currentUserId)
  const totalUsers = users.length
  const percentile = myRank > 0 ? Math.round(((totalUsers - myRank) / totalUsers) * 100) : null

  const rankColors = ['#f59e0b', '#9ca3af', '#b45309']
  const rankLabels = ['🥇', '🥈', '🥉']

  if (loading) return <div style={{ padding: 40, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Space Grotesk', sans-serif" }}>
      <Navbar variant="page" />
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>Leaderboard</h1>
        <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>Ranked by total XP earned</p>

        {/* Your stats card */}
        {myProfile && (
          <div style={{ background: '#f5f3ff', border: '1px solid #e0e7ff', borderRadius: 16, padding: 20, marginBottom: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'Your Rank', value: `#${myRank}` },
              { label: 'Total XP', value: `${myProfile.total_xp ?? 0}` },
              { label: 'Current Streak', value: `${myProfile.current_streak ?? 0} days` },
              { label: 'Percentile', value: percentile !== null ? `Top ${100 - percentile}%` : '—' },
            ].map((s) => (
              <div key={s.label} style={{ flex: 1, minWidth: 120 }}>
                <p style={{ fontSize: 11, color: '#6b7280', margin: '0 0 4px', textTransform: 'uppercase' }}>{s.label}</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#4338ca', margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard table */}
        <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: 16, overflowX: 'auto' }}>
          <div style={{ minWidth: 600 }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px 100px', padding: '12px 20px', borderBottom: '0.5px solid #f3f4f6', background: '#f9fafb' }}>
              {['Rank', 'Learner', 'Level', 'XP', 'Streak'].map((h) => (
                <span key={h} style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
              ))}
            </div>

            {users.map((user, i) => {
              const rank = i + 1
              const isMe = user.id === currentUserId
              const levelInfo = getLevelInfo(user.total_xp ?? 0)
              const displayName = user.display_name ?? user.email?.split('@')[0] ?? 'Learner'

              return (
                <div key={user.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 100px 100px 100px',
                  padding: '14px 20px',
                  borderBottom: '0.5px solid #f9fafb',
                  background: isMe ? '#faf5ff' : 'white',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: rank <= 3 ? 18 : 14, fontWeight: 600, color: rankColors[rank - 1] ?? '#6b7280' }}>
                    {rank <= 3 ? rankLabels[rank - 1] : `#${rank}`}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src={user.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`}
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
                      alt=""
                    />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: isMe ? 600 : 400, margin: 0, color: isMe ? '#4338ca' : '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>
                        {displayName} {isMe && <span style={{ fontSize: 11, color: '#8b5cf6' }}>(you)</span>}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>Lv.{levelInfo.current.level}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>{(user.total_xp ?? 0).toLocaleString()}</span>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>{user.current_streak ?? 0}d 🔥</span>
                </div>
              )
            })}

            {users.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
                No learners yet. Be the first!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
