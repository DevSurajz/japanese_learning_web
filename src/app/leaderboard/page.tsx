'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { getLevelInfo } from '@/lib/xp'
import Navbar from '@/components/Navbar'
import { motion } from 'motion/react'
import StreakIndicator from '@/components/StreakIndicator'

export default function LeaderboardPage() {
  const [users, setUsers] = useState<Record<string, any>[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUserId(user?.id ?? null)

      const { data } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url, total_xp, practice_xp, current_streak, longest_streak, email, created_at, today_xp, last_studied_date')
        .order('practice_xp', { ascending: false, nullsFirst: false })
        .limit(100)

      setUsers(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const [myStreakState, setMyStreakState] = useState({ displayStreak: 0, isCompletedToday: true })
  
  const myRank = users.findIndex((u) => u.id === currentUserId) + 1
  const myProfile = users.find((u) => u.id === currentUserId)
  const totalUsers = users.length
  const percentile = myRank > 0 ? Math.round(((totalUsers - myRank) / totalUsers) * 100) : null
  const myLevelInfo = getLevelInfo(myProfile?.total_xp ?? 0)

  useEffect(() => {
    if (myProfile) {
      import('@/utils/dateUtils').then(({ evaluateStreakState }) => {
        setMyStreakState(evaluateStreakState(myProfile.current_streak ?? 0, myProfile.last_studied_date))
      })
    }
  }, [myProfile])

  if (loading) return <div style={{ padding: 40, textAlign: 'center', fontFamily: "var(--font-inter)" }}>Loading...</div>

  // Mock JLPT Stage helper for leaderboard
  const getMockJlptStage = (xp: number) => {
    if (xp > 10000) return 'N1'
    if (xp > 5000) return 'N2'
    if (xp > 2000) return 'N3'
    if (xp > 500) return 'N4'
    return 'N5'
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: "var(--font-inter)", paddingBottom: 80 }}>
      <Navbar variant="page" />
      
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-inter)', fontSize: 36, fontWeight: 500, margin: '0 0 12px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Leaderboard
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 16, color: 'var(--text-secondary)', margin: '0 auto', lineHeight: 1.6, maxWidth: 600 }}>
            Compete with learners around the world and climb the rankings through consistent study.
          </p>
        </div>

        {/* Your Stats */}
        {myProfile && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 20, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '24px 32px' }}>
            {[
              { label: 'Rank', value: myRank > 0 ? `#${myRank}` : '—' },
              { label: 'Practice XP', value: (myProfile.practice_xp ?? 0).toLocaleString() },
              { label: 'Streak', value: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><span>{myStreakState.displayStreak}</span><StreakIndicator streak={myStreakState.displayStreak} size={20} isCompletedToday={myStreakState.isCompletedToday} /></div> },
              { label: 'Percentile', value: percentile ? `Top ${percentile}%` : '—' },
              { label: 'Level', value: `Lv. ${myLevelInfo.current.level}` },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 24, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Podium Section */}
        {users.length >= 3 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 12, marginTop: 10 }}>
            {[
              { user: users[1], rank: 2, height: 130, color: 'var(--text-secondary)' },
              { user: users[0], rank: 1, height: 170, color: 'var(--text-primary)' },
              { user: users[2], rank: 3, height: 110, color: 'var(--text-secondary)' },
            ].map((spot) => {
              const displayName = spot.user.display_name ?? spot.user.email?.split('@')[0] ?? 'Learner'
              return (
                <div key={spot.rank} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 120 }}>
                  <img
                    src={spot.user.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`}
                    style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${spot.color}`, marginBottom: 12, background: 'var(--bg-primary)' }}
                    alt=""
                  />
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', textAlign: 'center', marginBottom: 4 }}>
                    {displayName}
                  </div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
                    {(spot.user.practice_xp ?? 0).toLocaleString()} XP
                  </div>
                  <div style={{ 
                    width: '100%', height: spot.height, background: 'var(--bg-card)', 
                    border: '1px solid var(--border-color)', borderTop: `4px solid ${spot.color}`, 
                    borderTopLeftRadius: 8, borderTopRightRadius: 8,
                    display: 'flex', justifyContent: 'center', paddingTop: 16,
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.02)'
                  }}>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: 24, fontWeight: 600, color: spot.color }}>#{spot.rank}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Leaderboard Table */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, overflowX: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ minWidth: 700 }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 120px 100px 100px', padding: '16px 24px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
              {['Rank', 'Learner', 'Level', 'XP', 'Streak', 'JLPT'].map((h) => (
                <span key={h} style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
              ))}
            </div>

            {users.map((user, i) => {
              const rank = i + 1
              const isMe = user.id === currentUserId
              const levelInfo = getLevelInfo(user.total_xp ?? 0)
              const displayName = user.display_name ?? user.email?.split('@')[0] ?? 'Learner'
              const jlptStage = getMockJlptStage(user.total_xp ?? 0)

              return (
                <motion.div 
                  key={user.id} 
                  whileHover={{ backgroundColor: isMe ? 'var(--bg-primary)' : 'rgba(0,0,0,0.02)' }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 100px 120px 100px 100px',
                    padding: '16px 24px',
                    borderBottom: '1px solid var(--border-color)',
                    background: isMe ? 'var(--bg-primary)' : 'var(--bg-card)',
                    alignItems: 'center',
                    transition: 'background 0.2s',
                    borderLeft: isMe ? '3px solid var(--text-primary)' : '3px solid transparent'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: rank <= 3 ? 18 : 15, fontWeight: 500, color: rank <= 3 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    #{rank}
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                      src={user.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`}
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                      alt=""
                    />
                    <div style={{ fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220 }}>
                      {displayName} {isMe && <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 400, marginLeft: 4 }}>(you)</span>}
                    </div>
                  </div>
                  
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'var(--text-secondary)' }}>Lv.{levelInfo.current.level}</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{(user.practice_xp ?? 0).toLocaleString()}</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'var(--text-secondary)' }}>{user.current_streak ?? 0}</span>
                  
                  <span style={{ 
                    fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', background: 'var(--bg-primary)', 
                    padding: '2px 8px', borderRadius: 4, display: 'inline-block', textAlign: 'center',
                    width: 'fit-content'
                  }}>
                    {jlptStage}
                  </span>
                </motion.div>
              )
            })}

            {users.length === 0 && (
              <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)', fontSize: 14 }}>
                No learners yet. Be the first!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

