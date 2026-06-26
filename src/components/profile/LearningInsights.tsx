import { motion } from 'motion/react'
import { getLevelInfo } from '@/lib/xp'

interface LearningInsightsProps {
  profile: any
  levelInfo: ReturnType<typeof getLevelInfo>
}

export default function LearningInsights({ profile, levelInfo }: LearningInsightsProps) {
  const xpToLevel = levelInfo.neededXP - levelInfo.progressXP
  
  const insights = [
    { icon: '💡', text: `You are only ${xpToLevel} XP away from Level ${levelInfo.next?.level ?? 'MAX'}.` },
    { icon: '🔥', text: profile?.current_streak > 3 ? `You're on a ${profile.current_streak} day streak! Keep it up.` : 'Study today to build your streak.' },
    { icon: '🌟', text: 'You study most consistently on weekends.' },
  ]

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EAEAEA',
      borderRadius: 16,
      padding: '24px',
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 500, color: '#0A0A0A', margin: '0 0 20px', letterSpacing: '-0.01em' }}>
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
            <span style={{ fontSize: 18 }}>{insight.icon}</span>
            <span style={{ fontSize: 14, color: 'rgba(10,10,10,0.8)' }}>{insight.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
