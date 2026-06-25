"use client"

import { useState, useEffect } from "react"
import { saveProgress, getProgress } from "@/lib/guestProgress"

export interface KanaStats {
  correct: number
  incorrect: number
}

export interface ProgressData {
  [kana: string]: KanaStats
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const data = getProgress("kana") as any
      const formattedData: ProgressData = {}
      for (const [key, val] of Object.entries(data)) {
        const item = val as { correct: number; attempts: number }
        formattedData[key] = {
          correct: item.correct,
          incorrect: item.attempts - item.correct
        }
      }
      setProgress(formattedData)
    } catch (e) {
      console.error("Failed to load kana progress from guestProgress")
    }
    setIsLoaded(true)
  }, [])

  const updateProgress = (results: { kana: string; isCorrect: boolean }[]) => {
    setProgress(prev => {
      const newProgress = { ...prev }
      results.forEach(({ kana, isCorrect }) => {
        if (!newProgress[kana]) {
          newProgress[kana] = { correct: 0, incorrect: 0 }
        }
        if (isCorrect) {
          newProgress[kana].correct += 1
        } else {
          newProgress[kana].incorrect += 1
        }
        
        saveProgress("kana", kana, isCorrect)
      })
      
      return newProgress
    })
  }

  const getWeakCharacters = (system: "hiragana" | "katakana" | "all" = "all", threshold: number = 0.8) => {
    const weakList: string[] = []
    
    for (const [kana, stats] of Object.entries(progress)) {
      const total = stats.correct + stats.incorrect
      if (total < 2) continue // Need at least some attempts to mark as weak
      const mastery = stats.correct / total
      
      if (mastery < threshold) {
        weakList.push(kana)
      }
    }
    
    return weakList
  }

  const getMastery = (kana: string) => {
    const stats = progress[kana]
    if (!stats) return null
    const total = stats.correct + stats.incorrect
    if (total === 0) return 0
    return stats.correct / total
  }

  return { progress, isLoaded, updateProgress, getWeakCharacters, getMastery }
}
