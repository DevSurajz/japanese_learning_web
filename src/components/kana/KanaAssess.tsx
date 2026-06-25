"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { KanaItem } from "./data"
import { playKanaAudio } from "./audio"
import { createClient } from "@/utils/supabase/client"

interface KanaAssessProps {
  isMobile: boolean
  kanaList: KanaItem[]
  onComplete: (results: { kana: string, isCorrect: boolean }[]) => void
}

export function KanaAssess({ isMobile, kanaList, onComplete }: KanaAssessProps) {
  const [questions, setQuestions] = useState<KanaItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState<{ kana: string, isCorrect: boolean }[]>([])
  const [status, setStatus] = useState<"typing" | "correct" | "incorrect">("typing")
  const [isFinished, setIsFinished] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const [userId, setUserId] = useState<string | undefined>()

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => setUserId(user?.id))
  }, [])

  // Initialize questions
  useEffect(() => {
    // Filter out empty items
    const validKana = kanaList.filter(k => !k.empty && k.kana && k.romaji)
    // Shuffle the items for assessment
    const shuffled = [...validKana].sort(() => 0.5 - Math.random())
    // For assessment, let's limit to 20 random characters so it doesn't take forever,
    // or let them do all if we want. Let's do 20 for a session.
    setQuestions(shuffled.slice(0, 20))
  }, [kanaList])

  useEffect(() => {
    if (status === "typing" && inputRef.current) {
      inputRef.current.focus()
    }
  }, [status, currentIndex])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (status !== "typing" || inputValue.trim() === "") return

    const currentKana = questions[currentIndex]
    const isCorrect = inputValue.trim().toLowerCase() === currentKana.romaji?.toLowerCase()

    setStatus(isCorrect ? "correct" : "incorrect")
    
    // Auto-advance after a short delay
    setTimeout(() => {
      const newResults = [...results, { kana: currentKana.kana!, isCorrect }]
      
      if (currentIndex < questions.length - 1) {
        setResults(newResults)
        setCurrentIndex(prev => prev + 1)
        setInputValue("")
        setStatus("typing")
      } else {
        // Finished
        import('@/lib/xp').then(async m => {
          await m.addXP(m.XP_VALUES.COMPLETE_SECTION, userId)
          await m.updateStreak(userId)
          
          const score = newResults.filter(r => r.isCorrect).length
          const isPerfect = score === questions.length
          if (isPerfect) {
            await m.addXP(m.XP_VALUES.PERFECT_ASSESSMENT, userId)
            if (userId) {
              const { checkAchievements } = await import('@/lib/achievements')
              await checkAchievements(userId, 0, 0, { perfectAssessment: true })
            }
          }
        })
        setResults(newResults)
        setIsFinished(true)
      }
    }, isCorrect ? 800 : 1500) // Longer delay on incorrect so they can see the answer
  }

  const handleRetry = () => {
    const validKana = kanaList.filter(k => !k.empty && k.kana && k.romaji)
    const shuffled = [...validKana].sort(() => 0.5 - Math.random())
    setQuestions(shuffled.slice(0, 20))
    setResults([])
    setCurrentIndex(0)
    setInputValue("")
    setStatus("typing")
    setIsFinished(false)
  }

  const handleContinue = () => {
    onComplete(results)
  }

  if (questions.length === 0) return null

  if (isFinished) {
    const score = results.filter(r => r.isCorrect).length
    const total = questions.length
    const percent = Math.round((score / total) * 100)
    
    let message = "Keep Practicing! 💪"
    if (percent === 100) message = "Perfect Score! 🏆"
    else if (percent >= 80) message = "Excellent Job! ⭐"
    else if (percent >= 50) message = "Great Effort! 👍"

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={{
          maxWidth: 400, margin: "60px auto",
          background: "#fff", borderRadius: 24,
          padding: "48px 32px", textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          border: "1px solid #e2e8f0"
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>{message.split(" ")[message.split(" ").length - 1]}</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: "#0f172a", marginBottom: 8 }}>
          {message.slice(0, -2)}
        </h2>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#64748b", marginBottom: 32 }}>
          You got {score} out of {total} correct.
        </p>

        <div style={{ display: "flex", gap: 16, marginBottom: 40, justifyContent: "center" }}>
          <div style={{ background: "#ecfdf5", color: "#10b981", padding: "16px 24px", borderRadius: 16 }}>
            <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{score}</div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Right</div>
          </div>
          <div style={{ background: "#fef2f2", color: "#ef4444", padding: "16px 24px", borderRadius: 16 }}>
            <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{total - score}</div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Wrong</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={handleRetry}
            style={{
              background: "#f1f5f9", color: "#475569",
              border: "none", padding: "16px", borderRadius: 16,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14,
              cursor: "pointer", transition: "background 0.2s"
            }}
          >
            Try Again
          </button>
          <button
            onClick={handleContinue}
            style={{
              background: "#0f172a", color: "#fff",
              border: "none", padding: "16px", borderRadius: 16,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14,
              cursor: "pointer", transition: "background 0.2s"
            }}
          >
            Continue
          </button>
        </div>
      </motion.div>
    )
  }

  const currentKana = questions[currentIndex]
  const progress = (currentIndex / questions.length) * 100

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px 0" }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#64748b" }}>
          <span>Assessment Progress</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div style={{ width: "100%", height: 4, background: "#e2e8f0", borderRadius: 2, overflow: "hidden" }}>
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            transition={{ duration: 0.3 }}
            style={{ height: "100%", background: "#0f172a" }} 
          />
        </div>
      </div>

      {/* Card */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#fff",
          borderRadius: 24,
          border: `2px solid ${status === "correct" ? "#10b981" : status === "incorrect" ? "#ef4444" : "#f1f5f9"}`,
          boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
          padding: "60px 20px",
          display: "flex", flexDirection: "column", alignItems: "center",
          position: "relative",
        }}
      >
        <button 
          onClick={() => playKanaAudio(currentKana.kana!)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            position: "absolute", top: 20, right: 20, color: "#cbd5e1"
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>

        <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, fontSize: 80, color: "#0f172a", lineHeight: 1, marginBottom: 40 }}>
          {currentKana.kana}
        </span>

        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 240, position: "relative" }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            disabled={status !== "typing"}
            placeholder="Type romaji..."
            autoFocus
            style={{
              width: "100%", padding: "16px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, textAlign: "center",
              outline: "none",
              color: status === "correct" ? "#10b981" : status === "incorrect" ? "#ef4444" : "#0f172a",
              transition: "all 0.2s ease"
            }}
          />
          <AnimatePresence>
            {status === "incorrect" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute", top: -30, left: 0, right: 0,
                  textAlign: "center", fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13, color: "#ef4444", fontWeight: 500
                }}
              >
                Correct: {currentKana.romaji}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  )
}
