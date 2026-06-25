'use client'
import { useEffect, useState } from 'react'

export interface Badge {
  name: string
  icon: string
  description: string
}

interface Props {
  badge: Badge | null
  onDismiss: () => void
}

export default function BadgeToast({ badge, onDismiss }: Props) {
  useEffect(() => {
    if (!badge) return
    const t = setTimeout(onDismiss, 4000)
    return () => clearTimeout(t)
  }, [badge, onDismiss])

  if (!badge) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      background: 'white',
      border: '1px solid #e0e7ff',
      borderRadius: 16,
      padding: '16px 20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      zIndex: 9999,
      animation: 'slideIn 0.3s ease',
      maxWidth: 300,
    }}>
      <span style={{ fontSize: 28 }}>{badge.icon}</span>
      <div>
        <p style={{ fontSize: 11, color: '#8b5cf6', fontWeight: 600, margin: '0 0 2px', textTransform: 'uppercase' }}>Badge Unlocked!</p>
        <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 2px' }}>{badge.name}</p>
        <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>{badge.description}</p>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  )
}
