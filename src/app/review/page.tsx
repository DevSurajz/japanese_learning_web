"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import SpeakButton from "@/components/SpeakButton"
import { createClient } from "@/utils/supabase/client"

interface ReviewCard {
  id: string
  card_id: string
  card_type: string
  easiness: number
  interval: number
  repetitions: number
  next_review_at: string | null
}

const QUALITY_LABELS: { label: string; quality: number; desc: string }[] = [
  { label: "Again",  quality: 1, desc: "Complete blank" },
  { label: "Hard",   quality: 2, desc: "Struggled" },
  { label: "Good",   quality: 4, desc: "Correct with effort" },
  { label: "Easy",   quality: 5, desc: "Perfect" },
]

function cardFrontText(card: ReviewCard): string {
  // card_id format: "kana_あ", "kanji_日", "vocab_N5_001"
  const parts = card.card_id.split('_')
  if (card.card_type === 'KANA') return parts[1] ?? card.card_id
  if (card.card_type === 'KANJI') return parts[1] ?? card.card_id
  return parts.slice(2).join('_') || card.card_id
}

function cardBackText(card: ReviewCard): string {
  return `${card.card_type} · interval: ${card.interval}d · ease: ${card.easiness.toFixed(1)}`
}

function ReviewPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter')
  const type = searchParams.get('type')

  const [cards, setCards] = useState<ReviewCard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [answering, setAnswering] = useState(false)
  const [done, setDone] = useState(false)
  const [todayStats, setTodayStats] = useState({ reviewedToday: 0, streak: 0, dueToday: 0 })
  const [userId, setUserId] = useState<string | undefined>()

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => setUserId(user?.id))
  }, [])

  useEffect(() => {
    async function fetchCards() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filter) params.set('filter', filter)
        if (type) params.set('type', type)
        
        const [dueRes, statsRes] = await Promise.all([
          fetch(`/api/review/due?${params}`),
          fetch('/api/review/stats'),
        ])

        if (!dueRes.ok) throw new Error("Failed to fetch cards")
        const { cards: fetchedCards } = await dueRes.json()
        const stats = statsRes.ok ? await statsRes.json() : {}

        setCards(fetchedCards)
        setTodayStats(stats)
        if (fetchedCards.length === 0) setDone(true)
      } catch (err) {
        console.error(err)
        setDone(true)
      } finally {
        setLoading(false)
      }
    }
    fetchCards()
  }, [filter, type])

  const currentCard = cards[currentIndex]
  const total = cards.length
  const remaining = total - currentIndex
  const progress = total > 0 ? (currentIndex / total) * 100 : 0

  const handleAnswer = useCallback(async (quality: number) => {
    if (!currentCard || answering) return
    setAnswering(true)
    
    try {
      await fetch('/api/review/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: currentCard.card_id,
          cardType: currentCard.card_type,
          quality,
        }),
      })
      if (quality >= 4) {
        import('@/lib/xp').then(m => {
          m.addXP(m.XP_VALUES.CORRECT_REVIEW, userId)
          m.updateStreak(userId)
        })
      }
    } catch (err) {
      console.error(err)
    }

    if (currentIndex + 1 >= total) {
      import('@/lib/xp').then(m => {
        m.addXP(m.XP_VALUES.FINISH_REVIEW_QUEUE, userId)
      })
      setDone(true)
    } else {
      setCurrentIndex(i => i + 1)
      setRevealed(false)
    }
    setAnswering(false)
  }, [currentCard, currentIndex, total, answering, userId])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
          Loading cards…
        </span>
      </div>
    )
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 560, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}
      >
        <div style={{ fontSize: 48, marginBottom: 24 }}>✓</div>
        <h2 style={{
          fontFamily: "var(--font-cormorant)",
          fontWeight: 300, fontStyle: 'italic',
          fontSize: 40, color: 'var(--text-primary)', marginBottom: 16,
        }}>
          All caught up.
        </h2>
        <p style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: 14, color: 'var(--text-secondary)', marginBottom: 48 }}>
          {total > 0 ? `Reviewed ${total} cards today.` : "No cards due right now — check back tomorrow."}
          {todayStats.streak > 0 && ` 🔥 ${todayStats.streak} day streak.`}
        </p>
        <button
          onClick={() => router.push('/')}
          style={{
            background: 'var(--text-primary)', color: 'var(--bg-primary)',
            border: 'none', padding: '14px 32px',
            fontFamily: "var(--font-inter)",
            fontWeight: 300, fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            cursor: 'pointer', borderRadius: 99,
          }}
        >
          Back to Home
        </button>
      </motion.div>
    )
  }

  const frontText = cardFrontText(currentCard)

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '64px 24px' }}>
      {/* Progress bar */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {remaining} remaining
          </span>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: 'var(--text-secondary)' }}>
            {currentIndex} / {total}
          </span>
        </div>
        <div style={{ height: 2, background: 'var(--border-color)', borderRadius: 1 }}>
          <div style={{
            height: '100%', borderRadius: 1,
            background: 'var(--accent-red)',
            width: `${progress}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.card_id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)', borderRadius: 24,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
            marginBottom: 32,
            cursor: !revealed ? 'pointer' : 'default',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          }}
          onClick={() => !revealed && setRevealed(true)}
        >
          {/* Card front */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: revealed ? 32 : 0 }}>
            <span style={{
              fontFamily: "var(--font-noto-sans-jp)",
              fontWeight: 100,
              fontSize: 72,
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}>
              {frontText}
            </span>
            {frontText ? <SpeakButton text={frontText} /> : null}
          </div>

          {/* Card back */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: 24, width: '100%' }}
              >
                <p style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  {currentCard.card_type}
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: 12, color: 'var(--text-secondary)', opacity: 0.8 }}>
                  Interval: {currentCard.interval}d · Ease: {currentCard.easiness.toFixed(1)} · Reps: {currentCard.repetitions}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!revealed && (
            <p style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 24 }}>
              Tap to reveal
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Answer buttons */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}
          >
            {QUALITY_LABELS.map(({ label, quality, desc }) => (
              <button
                key={quality}
                onClick={() => handleAnswer(quality)}
                disabled={answering}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '14px 8px', borderRadius: 16,
                  cursor: answering ? 'not-allowed' : 'pointer',
                  opacity: answering ? 0.6 : 1,
                  textAlign: 'center',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { if (!answering) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-primary)' }}
              >
                <div style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 13, color: 'var(--text-primary)', marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                  {desc}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ReviewPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar variant="page" />
      <Suspense fallback={<div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: 'var(--text-secondary)' }}>Loading…</span>
      </div>}>
        <ReviewPageInner />
      </Suspense>
    </div>
  )
}
