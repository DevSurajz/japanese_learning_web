import { useState, useMemo } from 'react'

interface HeatmapData {
  date: string
  xp: number
  minutes: number
}

interface LearningHeatmapProps {
  data?: HeatmapData[]
}

const generateMockData = () => {
  const data: HeatmapData[] = []
  const today = new Date()
  for (let i = 364; i >= 0; i--) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    // Random intensity (0 to 4)
    const intensity = Math.random() > 0.4 ? Math.floor(Math.random() * 4) + 1 : 0
    data.push({
      date: d.toISOString().split('T')[0],
      xp: intensity * 15,
      minutes: intensity * 12
    })
  }
  return data
}

export default function LearningHeatmap({ data }: LearningHeatmapProps) {
  const heatmapData = useMemo(() => data || generateMockData(), [data])

  const [hoveredDay, setHoveredDay] = useState<HeatmapData | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const getColor = (xp: number) => {
    if (xp === 0) return '#F5F5F5' // Empty
    if (xp < 15) return '#D9F99D' // Light green (Tailwind lime-200)
    if (xp < 30) return '#84CC16' // lime-500
    if (xp < 45) return '#4D7C0F' // lime-700
    return '#14532D' // green-900
  }

  // Group data by weeks (columns)
  const weeks: HeatmapData[][] = []
  let currentWeek: HeatmapData[] = []

  // Padding to start on the correct day of week
  const firstDay = new Date(heatmapData[0].date).getDay()
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ date: '', xp: 0, minutes: 0 })
  }

  heatmapData.forEach(day => {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })
  
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push({ date: '', xp: 0, minutes: 0 })
    weeks.push(currentWeek)
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EAEAEA',
      borderRadius: 16,
      padding: '24px',
      position: 'relative'
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 500, color: '#0A0A0A', margin: '0 0 16px', letterSpacing: '-0.01em' }}>
        Learning Activity
      </h2>
      
      <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, minWidth: '100%' }}>
          <div style={{ display: 'flex', gap: 4, marginLeft: 24, marginBottom: 4 }}>
            {/* Month labels simplified for now, ideally calculated from columns */}
            <span style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', width: 64 }}>365 Days</span>
          </div>
          
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 14 }}>
              <span style={{ fontSize: 10, color: 'rgba(10,10,10,0.4)', lineHeight: '12px' }}>Mon</span>
              <span style={{ fontSize: 10, color: 'rgba(10,10,10,0.4)', lineHeight: '12px', marginTop: 16 }}>Wed</span>
              <span style={{ fontSize: 10, color: 'rgba(10,10,10,0.4)', lineHeight: '12px', marginTop: 16 }}>Fri</span>
            </div>
            
            <div style={{ display: 'flex', gap: 4 }}>
              {weeks.map((week, wIndex) => (
                <div key={wIndex} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {week.map((day, dIndex) => (
                    <div
                      key={dIndex}
                      onMouseEnter={(e) => {
                        if (!day.date) return
                        const rect = e.currentTarget.getBoundingClientRect()
                        setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 })
                        setHoveredDay(day)
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 3,
                        background: day.date ? getColor(day.xp) : 'transparent',
                        outline: hoveredDay?.date === day.date ? '1px solid rgba(0,0,0,0.3)' : 'none',
                        outlineOffset: 1,
                        cursor: day.date ? 'pointer' : 'default'
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(10,10,10,0.5)', marginTop: 12, justifyContent: 'flex-end' }}>
            <span>Less</span>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: '#F5F5F5' }} />
            <div style={{ width: 12, height: 12, borderRadius: 3, background: '#D9F99D' }} />
            <div style={{ width: 12, height: 12, borderRadius: 3, background: '#84CC16' }} />
            <div style={{ width: 12, height: 12, borderRadius: 3, background: '#4D7C0F' }} />
            <div style={{ width: 12, height: 12, borderRadius: 3, background: '#14532D' }} />
            <span>More</span>
          </div>
        </div>
      </div>

      {hoveredDay && (
        <div style={{
          position: 'fixed',
          top: tooltipPos.y,
          left: tooltipPos.x,
          transform: 'translate(-50%, -100%)',
          background: '#0A0A0A',
          color: 'white',
          padding: '6px 10px',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 500,
          pointerEvents: 'none',
          zIndex: 100,
          whiteSpace: 'nowrap',
          fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {hoveredDay.xp > 0 ? `${hoveredDay.xp} XP / ${hoveredDay.minutes} mins` : 'No activity'}
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 2 }}>
            {new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      )}
    </div>
  )
}
