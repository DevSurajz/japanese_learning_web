import { motion } from 'motion/react'
import { getLevelInfo } from '@/lib/xp'
import { Lightbulb } from 'lucide-react'
import StreakIndicator from '@/components/StreakIndicator'
import { useState, useEffect } from 'react'

interface LearningInsightsProps {
  profile: Record<string, any>
  levelInfo: ReturnType<typeof getLevelInfo>
}

export default function LearningInsights({ profile, levelInfo }: LearningInsightsProps) {
  const xpToLevel = levelInfo.neededXP - levelInfo.progressXP
  
  const [streakState, setStreakState] = useState({ displayStreak: profile?.current_streak ?? 0, isCompletedToday: true })

  useEffect(() => {
    import('@/utils/dateUtils').then(({ evaluateStreakState }) => {
      setStreakState(evaluateStreakState(profile?.current_streak ?? 0, profile?.last_studied_date))
    })
  }, [profile?.current_streak, profile?.last_studied_date])

  const insights = [
    { icon: <Lightbulb size={18} strokeWidth={2} />, text: `You are only ${xpToLevel} XP away from Level ${levelInfo.next?.level ?? 'MAX'}.` },
    { icon: <StreakIndicator streak={streakState.displayStreak} size={18} isCompletedToday={streakState.isCompletedToday} />, text: streakState.displayStreak > 3 ? `You're on a ${streakState.displayStreak} day streak! Keep it up.` : 'Study today to build your streak.' },
  ]

  return (
    <div style={{
      background: "var(--bg-primary)",
      border: "1px solid var(--border-color)",
      borderRadius: 16,
      padding: '24px',
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)", margin: '0 0 20px', letterSpacing: '-0.01em' }}>
        Learning Insights
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 4 }}
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              padding: '12px 16px',
              background: '#F9F9F9',
              borderRadius: 12,
              border: '1px solid #F5F5F5'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--text-primary)", width: 24, height: 24 }}>
              {insight.icon}
            </div>
            <span style={{ fontSize: 14, color: 'rgba(10,10,10,0.8)' }}>{insight.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
