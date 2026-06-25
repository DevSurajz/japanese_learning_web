'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import BadgeToast, { Badge } from '@/components/BadgeToast'

interface GamificationContextType {
  showBadge: (badge: Badge) => void
  showXP: (amount: number) => void
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
  const [xpToasts, setXpToasts] = useState<{ id: number; amount: number }[]>([])

  const showBadge = useCallback((badge: Badge) => {
    setQueue(prev => [...prev, badge])
  }, [])

  const showXP = useCallback((amount: number) => {
    const id = Date.now() + Math.random()
    setXpToasts(prev => [...prev, { id, amount }])
    setTimeout(() => {
      setXpToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  useEffect(() => {
    globalGamificationProvider = { showBadge, showXP }
    return () => { globalGamificationProvider = null }
  }, [showBadge, showXP])

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
    <GamificationContext.Provider value={{ showBadge, showXP }}>
      {children}
      <BadgeToast badge={currentBadge} onDismiss={dismissBadge} />
      
      <div style={{ position: 'fixed', bottom: 100, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end', pointerEvents: 'none' }}>
        {xpToasts.map(toast => (
          <div key={toast.id} style={{
            background: '#10b981', color: '#fff',
            padding: '8px 16px', borderRadius: 99,
            fontWeight: 700, fontSize: 15,
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
            animation: 'slideUpFadeOut 3s ease forwards'
          }}>
            +{toast.amount} XP
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUpFadeOut {
          0% { transform: translateY(20px); opacity: 0; }
          15% { transform: translateY(0); opacity: 1; }
          85% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
      `}} />
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (!context) throw new Error('useGamification must be used within GamificationProvider')
  return context
}
