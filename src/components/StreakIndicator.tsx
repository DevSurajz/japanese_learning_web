import React, { useEffect, useState } from 'react'
import { Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface StreakIndicatorProps {
  streak: number
  showText?: boolean
  size?: number
}

export default function StreakIndicator({ streak, showText = false, size = 18 }: StreakIndicatorProps) {
  const [prevStreak, setPrevStreak] = useState(streak)
  const [justActivated, setJustActivated] = useState(false)

  useEffect(() => {
    if (streak > 0 && prevStreak === 0) {
      setJustActivated(true)
      const timer = setTimeout(() => setJustActivated(false), 2000)
      return () => clearTimeout(timer)
    }
    setPrevStreak(streak)
  }, [streak, prevStreak])

  let color = '#A3A3A3' // muted gray for 0
  let fill = 'none'
  let filter = 'none'

  if (streak >= 100) {
    color = '#000000'
    fill = '#000000'
    filter = 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' // legendary
  } else if (streak >= 30) {
    color = '#171717'
    fill = '#171717' // special
    filter = 'drop-shadow(0 0 4px rgba(0,0,0,0.15))'
  } else if (streak >= 7) {
    color = '#262626'
    fill = '#404040' // slightly emphasized
  } else if (streak >= 1) {
    color = '#404040'
    fill = '#525252' // filled
  }

  const animateProps = justActivated 
    ? {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: [0.8, 1.1, 1.0], opacity: 1 },
        transition: { duration: 0.4, ease: "easeOut" as const }
      }
    : {
        initial: false,
        animate: { scale: 1, opacity: 1 }
      }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <AnimatePresence mode="wait">
        <motion.div key={streak > 0 ? 'filled' : 'outline'} {...animateProps} style={{ display: 'flex', alignItems: 'center', filter }}>
          <Flame size={size} color={color} fill={fill} strokeWidth={2} />
        </motion.div>
      </AnimatePresence>
      {showText && (
        <span style={{ 
          fontSize: size * 0.8, 
          fontWeight: streak > 0 ? 600 : 400, 
          color: streak > 0 ? '#171717' : '#737373',
          fontFamily: "'Space Grotesk', sans-serif"
        }}>
          {streak} {streak === 1 ? 'day' : 'days'}
        </span>
      )}
    </div>
  )
}
