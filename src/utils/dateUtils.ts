export function getLocalToday(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getLocalYesterday(): string {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function evaluateStreakState(currentStreak: number, lastStudiedDate: string | null | undefined): { displayStreak: number; isCompletedToday: boolean } {
  if (!lastStudiedDate) {
    return { displayStreak: 0, isCompletedToday: false }
  }

  const today = getLocalToday()
  const yesterday = getLocalYesterday()

  if (lastStudiedDate === today) {
    return { displayStreak: currentStreak, isCompletedToday: true }
  } else if (lastStudiedDate === yesterday) {
    return { displayStreak: currentStreak + 1, isCompletedToday: false }
  } else {
    return { displayStreak: 0, isCompletedToday: false }
  }
}
