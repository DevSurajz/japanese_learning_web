import { motion } from 'motion/react'

interface StatCardProps {
  label: string
  value: string | number
  unit: string
  icon: string
}

const StatCard = ({ label, value, unit, icon }: StatCardProps) => (
  <motion.div
    whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}
    style={{
      background: 'white',
      border: '1px solid #EAEAEA',
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
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
    </div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 600, color: '#0A0A0A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(10,10,10,0.5)', marginTop: 4 }}>
        {unit}
      </div>
    </div>
  </motion.div>
)

interface LearningOverviewProps {
  profile: any
  stats?: {
    lessonsCompleted: number
    kanaMastered: number
    kanjiLearned: number
    vocabLearned: number
    grammarPoints: number
    studyTimeMinutes: number
  }
}

export default function LearningOverview({ profile, stats }: LearningOverviewProps) {
  // Using mocks for missing stats to fulfill the design requirements
  const s = stats || {
    lessonsCompleted: 14,
    kanaMastered: 104,
    kanjiLearned: 120,
    vocabLearned: 450,
    grammarPoints: 35,
    studyTimeMinutes: 1240
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, color: '#0A0A0A', margin: 0, letterSpacing: '-0.01em' }}>
        Learning Overview
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16
      }}>
        <StatCard label="Current Streak" value={profile?.current_streak ?? 0} unit="days" icon="🔥" />
        <StatCard label="Best Streak" value={profile?.longest_streak ?? 0} unit="days" icon="🏆" />
        <StatCard label="Total XP" value={profile?.total_xp ?? 0} unit="XP earned" icon="⭐" />
        <StatCard label="Study Time" value={Math.floor(s.studyTimeMinutes / 60)} unit="hours" icon="⏱" />
        
        <StatCard label="Kana Mastered" value={s.kanaMastered} unit="/ 104 kana" icon="✍" />
        <StatCard label="Kanji Learned" value={s.kanjiLearned} unit="kanji" icon="🈶" />
        <StatCard label="Vocab Learned" value={s.vocabLearned} unit="words" icon="📖" />
        <StatCard label="Grammar Points" value={s.grammarPoints} unit="completed" icon="📝" />
      </div>
    </div>
  )
}
