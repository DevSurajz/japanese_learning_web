'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { getLevelInfo } from '@/lib/xp'
import { getUserAchievements } from '@/lib/achievements'
import Navbar from '@/components/Navbar'

// New modular components
import HeroProfileCard from '@/components/profile/HeroProfileCard'
import EditProfileModal from '@/components/profile/EditProfileModal'
import LearningOverview from '@/components/profile/LearningOverview'
import LevelProgressCard from '@/components/profile/LevelProgressCard'
import JLPTProgressCard from '@/components/profile/JLPTProgressCard'
import LearningHeatmap from '@/components/profile/LearningHeatmap'
import StudyActivityTimeline from '@/components/profile/StudyActivityTimeline'
import AchievementsCard from '@/components/profile/AchievementsCard'
import WeeklyProgressChart from '@/components/profile/WeeklyProgressChart'
import DailyGoalWidget from '@/components/profile/DailyGoalWidget'
import LearningInsights from '@/components/profile/LearningInsights'
import SettingsSection from '@/components/profile/SettingsSection'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [achievements, setAchievements] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Space Grotesk', sans-serif", paddingBottom: 80 }}>
      <Navbar variant="page" />
      
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <HeroProfileCard 
          profile={profile} 
          levelInfo={levelInfo} 
          onEditClick={() => setIsEditModalOpen(true)} 
        />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start'
        }}>
          {/* Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 2, minWidth: 320 }}>
            <LearningOverview profile={profile} />
            <LearningHeatmap />
            <StudyActivityTimeline />
            <AchievementsCard earnedBadges={achievements} />
            <SettingsSection />
          </div>
          
          {/* Sidebar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1, minWidth: 300 }}>
            <DailyGoalWidget xpToday={profile.today_xp ?? 0} dailyGoalXP={profile.daily_goal_xp ?? 50} />
            <LevelProgressCard levelInfo={levelInfo} />
            <LearningInsights profile={profile} levelInfo={levelInfo} />
            <WeeklyProgressChart />
            <JLPTProgressCard />
          </div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        profile={profile}
        onProfileUpdate={(updated) => setProfile({ ...profile, ...updated })}
      />
    </div>
  )
}
