import { motion } from 'motion/react'

interface TodaysSummaryGridProps {
  myRank: number
  todayXp: number
  streak: number
  percentile: number | null
}

export default function TodaysSummaryGrid({ myRank, todayXp, streak, percentile }: TodaysSummaryGridProps) {
  const cards = [
    { label: 'Rank', value: myRank > 0 ? `#${myRank}` : '—' },
    { label: "Today's XP", value: todayXp },
    { label: 'Streak', value: `${streak} 🔥` },
    { label: 'Percentile', value: percentile !== null ? `Top ${100 - percentile}%` : '—' },
  ]

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EAEAEA',
      borderRadius: 16,
      padding: '24px',
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 500, color: '#0A0A0A', margin: '0 0 16px', letterSpacing: '-0.01em' }}>
        Today's Summary
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
            style={{
              background: '#F9F9F9',
              border: '1px solid #F5F5F5',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}
          >
            <span style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {card.label}
            </span>
            <span style={{ fontSize: 18, fontWeight: 600, color: '#0A0A0A', letterSpacing: '-0.02em' }}>
              {card.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
