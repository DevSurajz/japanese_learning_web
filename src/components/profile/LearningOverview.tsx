import { motion } from 'motion/react'
import { Trophy, Star, Clock, Type, SpellCheck2, Book, BookOpen } from 'lucide-react'
import StreakIndicator from '@/components/StreakIndicator'
import { useState, useEffect } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  unit: string
  icon: React.ReactNode
}

const StatCard = ({ label, value, unit, icon }: StatCardProps) => (
  <motion.div
    whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}
    style={{
      background: "var(--bg-primary)",
      border: "1px solid var(--border-color)",
      borderRadius: 16,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      transition: 'box-shadow 0.2s',
      cursor: 'default'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, color: "var(--text-primary)" }}>
        {icon}
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
    </div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 600, color: "var(--text-primary)", letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>
        {unit}
      </div>
    </div>
  </motion.div>
)

interface LearningOverviewProps {
  profile: Record<string, any>
  stats?: {
    lessonsCompleted: number
    kanaMastered: number
    kanjiLearned: number
    kanjiMastered: number
    vocabLearned: number
    grammarPoints: number
    studyTimeMinutes: number
  }
}

export default function LearningOverview({ profile, stats }: LearningOverviewProps) {
  const [streakState, setStreakState] = useState({ displayStreak: profile?.current_streak ?? 0, isCompletedToday: true })

  useEffect(() => {
    import('@/utils/dateUtils').then(({ evaluateStreakState }) => {
      setStreakState(evaluateStreakState(profile?.current_streak ?? 0, profile?.last_studied_date))
    })
  }, [profile?.current_streak, profile?.last_studied_date])

  // Use real data only, fallback to 0
  const s = stats || {
    lessonsCompleted: 0,
    kanaMastered: 0,
    kanjiLearned: 0,
    kanjiMastered: 0,
    vocabLearned: 0,
    grammarPoints: 0,
    studyTimeMinutes: 0
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, color: "var(--text-primary)", margin: 0, letterSpacing: '-0.01em' }}>
        Learning Overview
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16
      }}>
        <StatCard label="Current Streak" value={streakState.displayStreak} unit="days" icon={<StreakIndicator streak={streakState.displayStreak} size={18} isCompletedToday={streakState.isCompletedToday} />} />
        <StatCard label="Best Streak" value={profile?.longest_streak ?? 0} unit="days" icon={<Trophy size={18} strokeWidth={2} />} />
        <StatCard label="Total XP" value={profile?.total_xp ?? 0} unit="XP earned" icon={<Star size={18} strokeWidth={2} />} />
        <StatCard label="Study Time" value={Math.floor(s.studyTimeMinutes / 60)} unit="hours" icon={<Clock size={18} strokeWidth={2} />} />
        
        <StatCard label="Kana Mastered" value={s.kanaMastered} unit="/ 104 kana" icon={<Type size={18} strokeWidth={2} />} />
        <StatCard label="Kanji Learned" value={s.kanjiLearned} unit="kanji" icon={<SpellCheck2 size={18} strokeWidth={2} />} />
        <StatCard label="Kanji Mastered" value={s.kanjiMastered} unit="mastered" icon={<Trophy size={18} strokeWidth={2} />} />
        <StatCard label="Vocab Learned" value={s.vocabLearned} unit="words" icon={<Book size={18} strokeWidth={2} />} />
        <StatCard label="Grammar Points" value={s.grammarPoints} unit="completed" icon={<BookOpen size={18} strokeWidth={2} />} />
      </div>
    </div>
  )
}
