import { motion } from 'motion/react'

interface JLPTLevelData {
  level: string
  lessonsCompleted: number
  totalLessons: number
}

interface JLPTProgressCardProps {
  progressData?: JLPTLevelData[]
}

export default function JLPTProgressCard({ progressData }: JLPTProgressCardProps) {
  const data = progressData || [
    { level: 'N5', lessonsCompleted: 78, totalLessons: 100 },
    { level: 'N4', lessonsCompleted: 34, totalLessons: 120 },
    { level: 'N3', lessonsCompleted: 0, totalLessons: 150 },
    { level: 'N2', lessonsCompleted: 0, totalLessons: 200 },
    { level: 'N1', lessonsCompleted: 0, totalLessons: 250 },
  ]

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EAEAEA',
      borderRadius: 16,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 500, color: '#0A0A0A', margin: 0, letterSpacing: '-0.01em' }}>
        JLPT Progress
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.map((item, index) => {
          const percent = Math.round((item.lessonsCompleted / item.totalLessons) * 100)
          
          return (
            <div key={item.level} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ 
                width: 32, fontSize: 14, fontWeight: 500, color: percent > 0 ? '#0A0A0A' : 'rgba(10,10,10,0.3)' 
              }}>
                {item.level}
              </div>
              
              <div style={{ flex: 1, background: '#F5F5F5', borderRadius: 999, height: 8, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                  style={{ height: '100%', background: percent === 100 ? '#10B981' : '#0A0A0A', borderRadius: 999 }}
                />
              </div>
              
              <div style={{ width: 40, textAlign: 'right', fontSize: 13, fontWeight: 500, color: percent > 0 ? '#0A0A0A' : 'rgba(10,10,10,0.3)' }}>
                {percent}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
