import { useState } from 'react'
import { motion } from 'motion/react'
import { BADGES } from '@/lib/achievements'
import { Zap, Flame, Crown, Target, Swords, Percent, Medal, BookOpen } from 'lucide-react'

const getBadgeIcon = (id: string, size: number = 24) => {
  switch (id) {
    case 'first_step': return <Zap size={size} strokeWidth={2} />
    case 'week_warrior': return <Flame size={size} strokeWidth={2} />
    case 'month_master': return <Crown size={size} strokeWidth={2} />
    case 'assessment_ace': return <Target size={size} strokeWidth={2} />
    case 'nihongo_warrior': return <Swords size={size} strokeWidth={2} />
    case 'century': return <Percent size={size} strokeWidth={2} />
    case 'dedicated': return <Medal size={size} strokeWidth={2} />
    case 'scholar': return <BookOpen size={size} strokeWidth={2} />
    default: return <Medal size={size} strokeWidth={2} />
  }
}

interface AchievementsCardProps {
  earnedBadges: string[]
}

export default function AchievementsCard({ earnedBadges }: AchievementsCardProps) {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null)
  
  const allBadges = Object.values(BADGES)
  const earnedCount = allBadges.filter(b => earnedBadges.includes(b.id)).length
  const percentComplete = Math.round((earnedCount / allBadges.length) * 100)

  return (
    <div style={{
      background: "var(--bg-primary)",
      border: "1px solid var(--border-color)",
      borderRadius: 16,
      padding: '24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)", margin: 0, letterSpacing: '-0.01em' }}>
          Achievements
        </h2>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
          {earnedCount} / {allBadges.length} ({percentComplete}%)
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: 12 }}>
        {allBadges.map((badge) => {
          const earned = earnedBadges.includes(badge.id)
          const isSelected = selectedBadge === badge.id
          
          return (
            <motion.div
              key={badge.id}
              whileHover={earned ? { y: -2, scale: 1.05 } : {}}
              onClick={() => setSelectedBadge(isSelected ? null : badge.id)}
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                borderRadius: 12,
                border: `1px solid ${earned ? '#EAEAEA' : '#F5F5F5'}`,
                background: earned ? '#FAFAFA' : '#F9F9F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: earned ? 1 : 0.4,
                filter: earned ? 'none' : 'grayscale(100%)',
                boxShadow: isSelected ? '0 0 0 2px #0A0A0A' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--text-primary)" }}>
                {getBadgeIcon(badge.id, 28)}
              </div>
            </motion.div>
          )
        })}
      </div>

      {selectedBadge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: 16,
            padding: '16px',
            background: "var(--bg-primary)",
            borderRadius: 12,
            border: "1px solid var(--border-color)"
          }}
        >
          {(() => {
            const b = allBadges.find(x => x.id === selectedBadge)
            if (!b) return null
            const earned = earnedBadges.includes(b.id)
            return (
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--text-primary)" }}>
                  {getBadgeIcon(b.id, 32)}
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: '0 0 4px' }}>
                    {b.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
                    {b.description}
                  </p>
                  {!earned && (
                    <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Locked
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </motion.div>
      )}
    </div>
  )
}
