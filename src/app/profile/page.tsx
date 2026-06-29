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

interface CardStats {
  lessonsCompleted: number
  kanaMastered: number
  kanjiLearned: number
  kanjiMastered: number
  vocabLearned: number
  grammarPoints: number
  studyTimeMinutes: number
  n5Completed: number
  n4Completed: number
}

interface ActivityLog {
  id: string
  title: string
  description: string
  activity_type: string
  created_at: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Record<string, any> | null>(null)
  const [achievements, setAchievements] = useState<string[]>([])
  const [studyActivity, setStudyActivity] = useState<Record<string, any>[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [cardProgressStats, setCardProgressStats] = useState<CardStats>({
    lessonsCompleted: 0,
    kanaMastered: 0,
    kanjiLearned: 0,
    kanjiMastered: 0,
    vocabLearned: 0,
    grammarPoints: 0,
    studyTimeMinutes: 0,
    n5Completed: 0,
    n4Completed: 0,
  })
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

      // Fetch study activity for heatmap (last 365 days)
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      const { data: sa } = await supabase
        .from('study_activity')
        .select('*')
        .eq('user_id', user.id)
        .gte('study_date', oneYearAgo.toISOString().split('T')[0])

      // Fetch activity logs
      const { data: logs } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

      // Fetch card progress stats
      const { data: cards } = await supabase
        .from('user_card_progress')
        .select('card_type, repetitions')
        .eq('user_id', user.id)

      // Fetch kanji from new tables
      const { count: kanjiLearnedCount } = await supabase
        .from('kanji_learned')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      const { count: kanjiMasteredCount } = await supabase
        .from('kanji_mastery')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('mastery_percent', 70)

      let kana = 0, vocab = 0, grammar = 0;
      if (cards) {
        for (const c of cards) {
          if (c.repetitions > 0) {
            if (c.card_type === 'KANA') kana++
            if (c.card_type === 'VOCAB') vocab++
            if (c.card_type === 'GRAMMAR') grammar++
          }
        }
      }

      const earned = await getUserAchievements(user.id)
      
      setProfile({ ...p, email: user.email })
      setAchievements(earned.map((e: { badge_id: string }) => e.badge_id))
      setStudyActivity(sa ?? [])
      setActivityLogs(logs ?? [])
      setCardProgressStats({
        lessonsCompleted: 0,
        kanaMastered: kana,
        kanjiLearned: kanjiLearnedCount || 0,
        kanjiMastered: kanjiMasteredCount || 0,
        vocabLearned: vocab,
        grammarPoints: grammar,
        studyTimeMinutes: 0,
        n5Completed: 0, // Calculate this appropriately if lessons mapped
        n4Completed: 0,
      })
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
            <LearningOverview profile={profile} stats={cardProgressStats} />
            <LearningHeatmap studyActivity={studyActivity} />
            <StudyActivityTimeline activityLogs={activityLogs} />
            <AchievementsCard earnedBadges={achievements} />
            <SettingsSection />
          </div>
          
          {/* Sidebar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1, minWidth: 300 }}>
            <DailyGoalWidget xpToday={profile.today_xp ?? 0} dailyGoalXP={profile.daily_goal_xp ?? 50} />
            <LevelProgressCard levelInfo={levelInfo} />
            <LearningInsights profile={profile} levelInfo={levelInfo} />
            <WeeklyProgressChart studyActivity={studyActivity} />
            <JLPTProgressCard stats={cardProgressStats} />
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
