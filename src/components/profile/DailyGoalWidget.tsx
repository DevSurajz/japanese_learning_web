import { motion } from 'motion/react'

interface DailyGoalWidgetProps {
  xpToday: number
  dailyGoalXP: number
}

export default function DailyGoalWidget({ xpToday, dailyGoalXP }: DailyGoalWidgetProps) {
  const percent = Math.min(100, Math.round((xpToday / dailyGoalXP) * 100))
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EAEAEA',
      borderRadius: 16,
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }}>
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="#F5F5F5"
            strokeWidth="8"
          />
          <motion.circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <span style={{ fontSize: 20, fontWeight: 600, color: '#0A0A0A', lineHeight: 1 }}>{percent}%</span>
        </div>
      </div>
      
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, color: '#0A0A0A', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
          Daily Goal
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)', margin: '0 0 12px' }}>
          {percent >= 100 ? "You've reached your daily goal! Great job." : "Keep going to reach your daily goal."}
        </p>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A' }}>
          {xpToday} <span style={{ color: 'rgba(10,10,10,0.4)', fontWeight: 400 }}>/ {dailyGoalXP} XP</span>
        </div>
      </div>
    </div>
  )
}
