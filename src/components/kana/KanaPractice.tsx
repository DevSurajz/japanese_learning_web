"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { KanaItem } from "./data"
import { playKanaAudio } from "./audio"
import { createClient } from "@/utils/supabase/client"

interface KanaPracticeProps {
  isMobile: boolean
  kanaList: KanaItem[]
  weakCharacters: string[]
  onComplete: (results: { kana: string, isCorrect: boolean }[]) => void
}

export function KanaPractice({ isMobile, kanaList, weakCharacters, onComplete }: KanaPracticeProps) {
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

  useEffect(() => {
    // Filter only weak characters
    const weakItems = kanaList.filter(k => k.kana && weakCharacters.includes(k.kana))
    
    // If no weak characters, maybe just do a random small set? 
    // The parent should probably prevent entering practice mode if 0 weak characters.
    const toPractice = weakItems.length > 0 
      ? [...weakItems].sort(() => 0.5 - Math.random()) 
      : []
    
    setQuestions(toPractice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kanaList, weakCharacters.join(',')])

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
    

    
    setTimeout(() => {
      const newResults = [...results, { kana: currentKana.kana!, isCorrect }]
      
      if (currentIndex < questions.length - 1) {
        setResults(newResults)
        setCurrentIndex(prev => prev + 1)
        setInputValue("")
        setStatus("typing")
      } else {
        import('@/lib/xp').then(m => {
          m.addXP(m.XP_VALUES.CORRECT_LEARN, userId)
          m.updateStreak(userId)
        })
        setResults(newResults)
        setIsFinished(true)
      }
    }, isCorrect ? 800 : 1500)
  }

  const handleRetry = () => {
    const weakItems = kanaList.filter(k => k.kana && weakCharacters.includes(k.kana))
    const toPractice = weakItems.length > 0 
      ? [...weakItems].sort(() => 0.5 - Math.random()) 
      : []
    setQuestions(toPractice)
    setResults([])
    setCurrentIndex(0)
    setInputValue("")
    setStatus("typing")
    setIsFinished(false)
  }

  const handleContinue = () => {
    onComplete(results)
  }

  if (questions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: 28, color: "var(--text-primary)", marginBottom: 12 }}>
          You have no weak characters!
        </h3>
        <p style={{ fontFamily: "var(--font-inter)", color: "var(--text-secondary)" }}>
          Great job. Try taking an assessment to find areas to improve.
        </p>
      </div>
    )
  }

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
          background: "var(--bg-card)", borderRadius: 24,
          padding: "48px 32px", textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.02)",
          border: "1px solid var(--border-color)"
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>{message.split(" ")[message.split(" ").length - 1]}</div>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 32, color: "var(--text-primary)", marginBottom: 8 }}>
          {message.slice(0, -2)}
        </h2>
        <p style={{ fontFamily: "var(--font-inter)", color: "var(--text-secondary)", marginBottom: 32 }}>
          You got {score} out of {total} correct.
        </p>

        <div style={{ display: "flex", gap: 16, marginBottom: 40, justifyContent: "center" }}>
          <div style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", padding: "16px 24px", borderRadius: 16 }}>
            <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-inter)" }}>{score}</div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Right</div>
          </div>
          <div style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--accent-red)", padding: "16px 24px", borderRadius: 16 }}>
            <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-inter)" }}>{total - score}</div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Wrong</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={handleRetry}
            style={{
              background: "var(--bg-primary)", color: "var(--text-secondary)",
              border: "1px solid var(--border-color)", padding: "16px", borderRadius: 16,
              fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 14,
              cursor: "pointer", transition: "background 0.2s"
            }}
          >
            Try Again
          </button>
          <button
            onClick={handleContinue}
            style={{
              background: "var(--accent-red)", color: "#fff",
              border: "none", padding: "16px", borderRadius: 16,
              fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 14,
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
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--text-secondary)" }}>
          <span>Practice Progress</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div style={{ width: "100%", height: 4, background: "var(--border-color)", borderRadius: 2, overflow: "hidden" }}>
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            transition={{ duration: 0.3 }}
            style={{ height: "100%", background: "var(--accent-red)" }} 
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
          background: "var(--bg-card)",
          borderRadius: 24,
          border: `2px solid ${status === "correct" ? "#10b981" : status === "incorrect" ? "var(--accent-red)" : "var(--border-color)"}`,
          boxShadow: "0 10px 40px rgba(0,0,0,0.02)",
          padding: "60px 20px",
          display: "flex", flexDirection: "column", alignItems: "center",
          position: "relative"
        }}
      >
        <button 
          onClick={() => playKanaAudio(currentKana.kana!)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            position: "absolute", top: 20, right: 20, color: "var(--text-secondary)"
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>

        <span style={{ fontFamily: "var(--font-noto-sans-jp)", fontWeight: 300, fontSize: 80, color: "var(--text-primary)", lineHeight: 1, marginBottom: 40 }}>
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
              background: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: 12,
              fontFamily: "var(--font-inter)", fontSize: 16, textAlign: "center",
              outline: "none",
              color: status === "correct" ? "#10b981" : status === "incorrect" ? "var(--accent-red)" : "var(--text-primary)",
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
                  textAlign: "center", fontFamily: "var(--font-inter)",
                  fontSize: 13, color: "var(--accent-red)", fontWeight: 500
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
