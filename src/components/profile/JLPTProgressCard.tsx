import { motion } from 'motion/react'

interface JLPTProgressCardProps {
  stats?: {
    kanaMastered: number
    kanjiLearned: number
    kanjiMastered: number
    vocabLearned: number
    grammarPoints: number
  }
}

export default function JLPTProgressCard({ stats }: JLPTProgressCardProps) {
  // Approximate total items per JLPT level
  const totalN5 = { kana: 92, kanji: 100, vocab: 800, grammar: 80 }
  const totalN4 = { kana: 92, kanji: 300, vocab: 1500, grammar: 120 }
  
  const currentKana = stats?.kanaMastered || 0
  const currentKanji = stats?.kanjiLearned || 0
  const currentVocab = stats?.vocabLearned || 0
  const currentGrammar = stats?.grammarPoints || 0
  
  const calculateProgress = (totals: typeof totalN5) => {
    const kProgress = Math.min(currentKana / totals.kana, 1)
    const kjProgress = Math.min(currentKanji / totals.kanji, 1)
    const vProgress = Math.min(currentVocab / totals.vocab, 1)
    const gProgress = Math.min(currentGrammar / totals.grammar, 1)
    return (kProgress + kjProgress + vProgress + gProgress) / 4
  }

  const data = [
    { level: 'N5', percent: Math.round(calculateProgress(totalN5) * 100) },
    { level: 'N4', percent: Math.round(calculateProgress(totalN4) * 100) },
    { level: 'N3', percent: 0 },
    { level: 'N2', percent: 0 },
    { level: 'N1', percent: 0 },
  ]

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EAEAEA',
      borderRadius: 16,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 500, color: '#0A0A0A', margin: 0, letterSpacing: '-0.01em' }}>
        JLPT Progress
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.map((item, index) => {
          const percent = item.percent
          
          return (
            <div key={item.level} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ 
                width: 32, fontSize: 14, fontWeight: 500, color: percent > 0 ? '#0A0A0A' : 'rgba(10,10,10,0.3)' 
              }}>
                {item.level}
              </div>
              
              <div style={{ flex: 1, background: '#F5F5F5', borderRadius: 999, height: 8, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                  style={{ height: '100%', background: '#0A0A0A', borderRadius: 999 }}
                />
              </div>
              
              <div style={{ width: 40, textAlign: 'right', fontSize: 13, fontWeight: 500, color: percent > 0 ? '#0A0A0A' : 'rgba(10,10,10,0.3)' }}>
                {percent}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
