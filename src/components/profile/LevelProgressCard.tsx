import { motion } from 'motion/react'
import { getLevelInfo } from '@/lib/xp'

interface LevelProgressCardProps {
  levelInfo: ReturnType<typeof getLevelInfo>
}

export default function LevelProgressCard({ levelInfo }: LevelProgressCardProps) {
  const xpRemaining = levelInfo.neededXP - levelInfo.progressXP

  return (
    <div style={{
      background: "var(--bg-primary)",
      border: "1px solid var(--border-color)",
      borderRadius: 16,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)", margin: 0, letterSpacing: '-0.01em' }}>
        Level Progress
      </h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Current
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1 }}>
            Lvl {levelInfo.current.level}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Next
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: 'rgba(10,10,10,0.3)', lineHeight: 1 }}>
            Lvl {levelInfo.next?.level ?? 'MAX'}
          </div>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ background: "var(--bg-primary)", borderRadius: 999, height: 12, width: '100%', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${levelInfo.progressPercent}%` }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like easing
            style={{ height: '100%', background: '#0A0A0A', borderRadius: 999 }}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>
            {levelInfo.progressXP} <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>/ {levelInfo.neededXP} XP</span>
          </span>
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            {xpRemaining} XP remaining
          </span>
        </div>
      </div>
    </div>
  )
}
