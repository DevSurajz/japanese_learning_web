export interface GuestProgressItem {
  correct: number
  attempts: number
}

export type GuestProgressSection = Record<string, GuestProgressItem>

export type GuestProgress = Record<string, GuestProgressSection>

const STORAGE_KEY = "nihongopath_guest"

function getFullProgress(): GuestProgress {
  if (typeof window === 'undefined') return {}
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error("Failed to read guest progress from localStorage", e)
  }
  return {}
}

export function saveProgress(section: string, itemId: string, correct: boolean): void {
  if (typeof window === 'undefined') return
  try {
    const progress = getFullProgress()
    if (!progress[section]) {
      progress[section] = {}
    }
    if (!progress[section][itemId]) {
      progress[section][itemId] = { correct: 0, attempts: 0 }
    }
    
    progress[section][itemId].attempts += 1
    if (correct) {
      progress[section][itemId].correct += 1
    }
    
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.error("Failed to save guest progress to localStorage", e)
  }
}

export function getProgress(section: string): GuestProgressSection {
  const full = getFullProgress()
  return full[section] || {}
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.error("Failed to clear guest progress from localStorage", e)
  }
}
