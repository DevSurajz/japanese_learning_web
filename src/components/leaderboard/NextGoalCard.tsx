import { getLevelInfo } from '@/lib/xp'
import { motion } from 'motion/react'

interface NextGoalCardProps {
  levelInfo: ReturnType<typeof getLevelInfo>
  streak: number
}

export default function NextGoalCard({ levelInfo, streak }: NextGoalCardProps) {
  // Simple heuristic for the next goal
  let goalText = ''
  let goalSubtext = ''
  let icon = ''

  if (streak === 0) {
    goalText = 'Start Your Streak'
    goalSubtext = 'Complete a lesson today to ignite your learning streak.'
    icon = '🔥'
  } else if (levelInfo.current.level === 1) {
    goalText = 'Reach Level 2'
    goalSubtext = `Earn ${levelInfo.neededXP - levelInfo.progressXP} more XP to level up.`
    icon = '⭐'
  } else {
    goalText = `Reach Level ${levelInfo.next?.level ?? 'MAX'}`
    goalSubtext = `Only ${levelInfo.neededXP - levelInfo.progressXP} XP to go!`
    icon = '🎯'
  }

  return (
    <div style={{
      background: '#FAFAFA', // Slight contrast to white cards
      border: '1px solid #EAEAEA',
      borderRadius: 16,
      padding: '24px',
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 500, color: '#0A0A0A', margin: '0 0 16px', letterSpacing: '-0.01em' }}>
        Next Goal
      </h2>
      
      <motion.div
        whileHover={{ x: 4 }}
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          background: 'white',
          border: '1px solid #F5F5F5',
          borderRadius: 12,
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 10, background: '#F9F9F9',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A', marginBottom: 2 }}>
            {goalText}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(10,10,10,0.5)' }}>
            {goalSubtext}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
