import { useState, useMemo } from 'react'

interface Props {
  studyActivity?: any[]
}

export default function WeeklyProgressChart({ studyActivity = [] }: Props) {
  const [timeframe, setTimeframe] = useState<'7' | '30' | '90'>('7')

  const chartData = useMemo(() => {
    const days = parseInt(timeframe, 10)
    const today = new Date()
    const dataPoints: number[] = []
    
    // Create lookup map
    const activityMap = new Map(studyActivity.map(s => [s.study_date, s.xp_earned]))
    
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(today.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      dataPoints.push(activityMap.get(dateStr) ?? 0)
    }
    return dataPoints
  }, [timeframe, studyActivity])

  const totalXP = chartData.reduce((acc, val) => acc + val, 0)
  
  // Chart calculation
  const maxVal = Math.max(...chartData, 10) // ensure non-zero max for division
  
  // Create simple SVG path
  const width = 300
  const height = 100
  
  const points = chartData.map((val, i) => {
    const x = (i / Math.max(chartData.length - 1, 1)) * width
    const y = height - (val / maxVal) * height
    return `${x},${y}`
  }).join(' L ')

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EAEAEA',
      borderRadius: 16,
      padding: '24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, color: '#0A0A0A', margin: 0, letterSpacing: '-0.01em' }}>
          Progress Chart
        </h2>
        <div style={{ display: 'flex', gap: 8, background: '#F5F5F5', padding: 4, borderRadius: 8 }}>
          {(['7', '30', '90'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              style={{
                padding: '4px 8px',
                borderRadius: 6,
                border: 'none',
                background: timeframe === t ? 'white' : 'transparent',
                boxShadow: timeframe === t ? '0 1px 4px rgba(0,0,0,0.05)' : 'none',
                fontSize: 12,
                fontWeight: 500,
                color: timeframe === t ? '#0A0A0A' : 'rgba(10,10,10,0.5)',
                cursor: 'pointer'
              }}
            >
              {t}d
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 600, color: '#0A0A0A', lineHeight: 1.1 }}>{totalXP}</div>
          <div style={{ fontSize: 12, color: 'rgba(10,10,10,0.5)', marginTop: 4 }}>XP earned</div>
        </div>
      </div>

      <div style={{ width: '100%', overflow: 'hidden' }}>
        <svg viewBox={`0 -10 ${width} ${height + 20}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Grid lines */}
          <line x1="0" y1={height} x2={width} y2={height} stroke="#F5F5F5" strokeWidth="1" />
          <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="#F5F5F5" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Chart line */}
          <path
            d={`M ${points}`}
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {chartData.map((val, i) => {
            const x = (i / Math.max(chartData.length - 1, 1)) * width
            const y = height - (val / maxVal) * height
            // Only draw points if there aren't too many
            if (chartData.length > 30) return null
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="white"
                stroke="#0A0A0A"
                strokeWidth="2"
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}
