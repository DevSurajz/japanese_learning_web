'use client'

import { useEffect } from 'react'
import { getProgress, clearProgress } from '@/lib/guestProgress'

export default function AuthSync() {
  useEffect(() => {
    const migrateGuestProgress = async () => {
      const kanaProgress = getProgress("kana")
      if (Object.keys(kanaProgress).length > 0) {
        // Here you would normally send the data to Supabase
        console.log("Migrating guest progress to account...", kanaProgress)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        clearProgress()
      }
    }
    
    migrateGuestProgress()
  }, [])

  return null
}
