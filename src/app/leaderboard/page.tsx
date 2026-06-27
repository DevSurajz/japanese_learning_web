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
        .select('id, display_name, avatar_url, total_xp, current_streak, longest_streak, email, created_at, today_xp')
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
  const myLevelInfo = getLevelInfo(myProfile?.total_xp ?? 0)

  if (loading) return <div style={{ padding: 40, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>Loading...</div>

  // Mock JLPT Stage helper for leaderboard
  const getMockJlptStage = (xp: number) => {
    if (xp > 10000) return 'N1'
    if (xp > 5000) return 'N2'
    if (xp > 2000) return 'N3'
    if (xp > 500) return 'N4'
    return 'N5'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Space Grotesk', sans-serif", paddingBottom: 80 }}>
      <Navbar variant="page" />
      
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 500, margin: '0 0 12px', color: '#0A0A0A', letterSpacing: '-0.02em' }}>
            Leaderboard
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(10,10,10,0.6)', margin: '0 auto', lineHeight: 1.6, maxWidth: 600 }}>
            Compete with learners around the world and climb the rankings through consistent study.
          </p>
        </div>

        {/* Your Stats */}
        {myProfile && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 20, background: 'white', border: '1px solid #EAEAEA', borderRadius: 16, padding: '24px 32px' }}>
            {[
              { label: 'Rank', value: myRank > 0 ? `#${myRank}` : '—' },
              { label: 'XP', value: (myProfile.total_xp ?? 0).toLocaleString() },
              { label: 'Streak', value: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><span>{myProfile.current_streak ?? 0}</span><StreakIndicator streak={myProfile.current_streak ?? 0} size={20} /></div> },
              { label: 'Percentile', value: percentile ? `Top ${percentile}%` : '—' },
              { label: 'Level', value: `Lv. ${myLevelInfo.current.level}` },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 24, fontWeight: 600, color: '#0A0A0A' }}>
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
              { user: users[1], rank: 2, height: 130, color: '#666' },
              { user: users[0], rank: 1, height: 170, color: '#0A0A0A' },
              { user: users[2], rank: 3, height: 110, color: '#999' },
            ].map((spot) => {
              const displayName = spot.user.display_name ?? spot.user.email?.split('@')[0] ?? 'Learner'
              return (
                <div key={spot.rank} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 120 }}>
                  <img
                    src={spot.user.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`}
                    style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${spot.color}`, marginBottom: 12, background: 'white' }}
                    alt=""
                  />
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', textAlign: 'center', marginBottom: 4 }}>
                    {displayName}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(10,10,10,0.5)', marginBottom: 16 }}>
                    {(spot.user.total_xp ?? 0).toLocaleString()} XP
                  </div>
                  <div style={{ 
                    width: '100%', height: spot.height, background: 'white', 
                    border: '1px solid #EAEAEA', borderTop: `4px solid ${spot.color}`, 
                    borderTopLeftRadius: 8, borderTopRightRadius: 8,
                    display: 'flex', justifyContent: 'center', paddingTop: 16,
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.02)'
                  }}>
                    <span style={{ fontSize: 24, fontWeight: 600, color: spot.color }}>#{spot.rank}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Leaderboard Table */}
        <div style={{ background: 'white', border: '1px solid #EAEAEA', borderRadius: 16, overflowX: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ minWidth: 700 }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 120px 100px 100px', padding: '16px 24px', borderBottom: '1px solid #EAEAEA', background: '#FAFAFA' }}>
              {['Rank', 'Learner', 'Level', 'XP', 'Streak', 'JLPT'].map((h) => (
                <span key={h} style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
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
                  whileHover={{ backgroundColor: isMe ? '#F9F9F9' : '#FAFAFA' }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 100px 120px 100px 100px',
                    padding: '16px 24px',
                    borderBottom: '1px solid #F5F5F5',
                    background: isMe ? '#F9F9F9' : 'white',
                    alignItems: 'center',
                    transition: 'background 0.2s',
                    borderLeft: isMe ? '3px solid #0A0A0A' : '3px solid transparent'
                  }}
                >
                  <span style={{ fontSize: rank <= 3 ? 18 : 15, fontWeight: 500, color: rank <= 3 ? '#0A0A0A' : 'rgba(10,10,10,0.5)' }}>
                    #{rank}
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                      src={user.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`}
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1px solid #EAEAEA' }}
                      alt=""
                    />
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220 }}>
                      {displayName} {isMe && <span style={{ fontSize: 11, color: 'rgba(10,10,10,0.4)', fontWeight: 400, marginLeft: 4 }}>(you)</span>}
                    </div>
                  </div>
                  
                  <span style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)' }}>Lv.{levelInfo.current.level}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#0A0A0A' }}>{(user.total_xp ?? 0).toLocaleString()}</span>
                  <span style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)' }}>{user.current_streak ?? 0}</span>
                  
                  <span style={{ 
                    fontSize: 11, fontWeight: 500, color: 'rgba(10,10,10,0.7)', background: '#F5F5F5', 
                    padding: '2px 8px', borderRadius: 4, display: 'inline-block', textAlign: 'center',
                    width: 'fit-content'
                  }}>
                    {jlptStage}
                  </span>
                </motion.div>
              )
            })}

            {users.length === 0 && (
              <div style={{ padding: 60, textAlign: 'center', color: 'rgba(10,10,10,0.4)', fontSize: 14 }}>
                No learners yet. Be the first!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

