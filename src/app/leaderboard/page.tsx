'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { getLevelInfo } from '@/lib/xp'
import { getUserAchievements } from '@/lib/achievements'
import Navbar from '@/components/Navbar'
import { motion } from 'motion/react'

// New and reused components
import LeaderboardProfileHeader from '@/components/leaderboard/LeaderboardProfileHeader'
import TodaysSummaryGrid from '@/components/leaderboard/TodaysSummaryGrid'
import NextGoalCard from '@/components/leaderboard/NextGoalCard'
import LevelProgressCard from '@/components/profile/LevelProgressCard'
import JLPTProgressCard from '@/components/profile/JLPTProgressCard'
import AchievementsCard from '@/components/profile/AchievementsCard'

export default function LeaderboardPage() {
  const [users, setUsers] = useState<Record<string, any>[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [achievements, setAchievements] = useState<string[]>([])
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

      if (user) {
        const earned = await getUserAchievements(user.id)
        setAchievements(earned.map((e: { badge_id: string }) => e.badge_id))
      }
      setLoading(false)
    }
    load()
  }, [])

  const myRank = users.findIndex((u) => u.id === currentUserId) + 1
  const myProfile = users.find((u) => u.id === currentUserId)
  const totalUsers = users.length
  const percentile = myRank > 0 ? Math.round(((totalUsers - myRank) / totalUsers) * 100) : null

  const rankColors = ['#F59E0B', '#9CA3AF', '#B45309']
  const rankLabels = ['🥇', '🥈', '🥉']

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
      
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        
        {/* Responsive Grid: 70/30 split on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 40,
          alignItems: 'start'
        }}>
          
          {/* Main Column (Leaderboard) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 2, minWidth: 'min(100%, 600px)', order: 2 }}>
            
            {/* Hero Section */}
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 500, margin: '0 0 8px', color: '#0A0A0A', letterSpacing: '-0.02em' }}>
                Leaderboard
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(10,10,10,0.6)', margin: 0, lineHeight: 1.6, maxWidth: 500 }}>
                Compete with learners around the world and climb the rankings through consistent study.
              </p>
            </div>

            {/* Compact Statistics Row */}
            <div style={{ display: 'flex', gap: 24, background: 'white', border: '1px solid #EAEAEA', borderRadius: 16, padding: '20px 24px', flexWrap: 'wrap' }}>
              {[
                { label: 'Total Learners', value: totalUsers.toLocaleString() },
                { label: 'Your Rank', value: myRank > 0 ? `#${myRank}` : '—' },
                { label: 'Your XP', value: myProfile?.total_xp ?? 0 },
                { label: 'Current Streak', value: `${myProfile?.current_streak ?? 0} 🔥` },
              ].map(stat => (
                <div key={stat.label} style={{ flex: 1, minWidth: 100 }}>
                  <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#0A0A0A' }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Leaderboard Table */}
            <div style={{ background: 'white', border: '1px solid #EAEAEA', borderRadius: 16, overflowX: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ minWidth: 650 }}>
                {/* Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px 100px 80px 80px', padding: '16px 24px', borderBottom: '1px solid #EAEAEA', background: '#FAFAFA' }}>
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
                        gridTemplateColumns: '60px 1fr 80px 100px 80px 80px',
                        padding: '16px 24px',
                        borderBottom: '1px solid #F5F5F5',
                        background: isMe ? '#F9F9F9' : 'white',
                        alignItems: 'center',
                        transition: 'background 0.2s',
                        borderLeft: isMe ? '3px solid #0A0A0A' : '3px solid transparent'
                      }}
                    >
                      <span style={{ fontSize: rank <= 3 ? 18 : 14, fontWeight: 500, color: rank <= 3 ? rankColors[rank - 1] : 'rgba(10,10,10,0.5)' }}>
                        {rank <= 3 ? rankLabels[rank - 1] : `#${rank}`}
                      </span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img
                          src={user.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`}
                          style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1px solid #EAEAEA' }}
                          alt=""
                        />
                        <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>
                          {displayName} {isMe && <span style={{ fontSize: 11, color: 'rgba(10,10,10,0.4)', fontWeight: 400, marginLeft: 4 }}>(you)</span>}
                        </div>
                      </div>
                      
                      <span style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)' }}>Lv.{levelInfo.current.level}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#0A0A0A' }}>{(user.total_xp ?? 0).toLocaleString()}</span>
                      <span style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)' }}>{user.current_streak ?? 0}</span>
                      
                      <span style={{ 
                        fontSize: 11, fontWeight: 500, color: 'rgba(10,10,10,0.7)', background: '#F5F5F5', 
                        padding: '2px 8px', borderRadius: 4, display: 'inline-block', textAlign: 'center' 
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
          
          {/* Sidebar Column */}
          {myProfile && (
            <div style={{ 
              display: 'flex', flexDirection: 'column', gap: 24, flex: 1, minWidth: 300, order: 1,
              position: 'sticky', top: 24 // makes it sticky on desktop
            }}>
              <LeaderboardProfileHeader profile={myProfile} levelInfo={getLevelInfo(myProfile.total_xp ?? 0)} />
              <LevelProgressCard levelInfo={getLevelInfo(myProfile.total_xp ?? 0)} />
              <TodaysSummaryGrid 
                myRank={myRank} 
                todayXp={myProfile.today_xp ?? 0} 
                streak={myProfile.current_streak ?? 0} 
                percentile={percentile} 
              />
              <JLPTProgressCard />
              <AchievementsCard earnedBadges={achievements} />
              <NextGoalCard levelInfo={getLevelInfo(myProfile.total_xp ?? 0)} streak={myProfile.current_streak ?? 0} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
