'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import BadgeToast, { Badge } from '@/components/BadgeToast'

interface GamificationContextType {
  showBadge: (badge: Badge) => void
}

const GamificationContext = createContext<GamificationContextType | null>(null)

// Global reference for non-React contexts (like lib files)
let globalGamificationProvider: GamificationContextType | null = null

export function getGamificationProvider() {
  return globalGamificationProvider
}

export default function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<Badge[]>([])
  const [currentBadge, setCurrentBadge] = useState<Badge | null>(null)

  const showBadge = useCallback((badge: Badge) => {
    setQueue(prev => [...prev, badge])
  }, [])

  useEffect(() => {
    globalGamificationProvider = { showBadge }
    return () => { globalGamificationProvider = null }
  }, [showBadge])

  useEffect(() => {
    if (!currentBadge && queue.length > 0) {
      setCurrentBadge(queue[0])
      setQueue(prev => prev.slice(1))
    }
  }, [queue, currentBadge])

  const dismissBadge = useCallback(() => {
    setCurrentBadge(null)
  }, [])

  return (
    <GamificationContext.Provider value={{ showBadge }}>
      {children}
      <BadgeToast badge={currentBadge} onDismiss={dismissBadge} />
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (!context) throw new Error('useGamification must be used within GamificationProvider')
  return context
}
