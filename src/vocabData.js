import { vocabPart1 } from './vocabData1'
import { vocabPart2 } from './vocabData2'

const raw = [...vocabPart1, ...vocabPart2]

// Deduplicate by kana+meaning key
const seen = new Set()
export const vocabData = raw
  .filter(w => {
    const key = w.kana + w.meaning
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  .map((w, i) => ({ ...w, id: i + 1 }))
