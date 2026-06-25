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
    
    if (isCorrect) {
      import('@/lib/xp').then(m => {
        m.addXP(m.XP_VALUES.CORRECT_LEARN, userId)
        m.updateStreak(userId)
      })
    }
    
    setTimeout(() => {
      const newResults = [...results, { kana: currentKana.kana!, isCorrect }]
      
      if (currentIndex < questions.length - 1) {
        setResults(newResults)
        setCurrentIndex(prev => prev + 1)
        setInputValue("")
        setStatus("typing")
      } else {
        onComplete(newResults)
      }
    }, isCorrect ? 800 : 1500)
  }

  if (questions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#0f172a", marginBottom: 12 }}>
          You have no weak characters!
        </h3>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#64748b" }}>
          Great job. Try taking an assessment to find areas to improve.
        </p>
      </div>
    )
  }

  const currentKana = questions[currentIndex]
  const progress = (currentIndex / questions.length) * 100

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px 0" }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#64748b" }}>
          <span>Practice Progress</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div style={{ width: "100%", height: 4, background: "#e2e8f0", borderRadius: 2, overflow: "hidden" }}>
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            transition={{ duration: 0.3 }}
            style={{ height: "100%", background: "#10b981" }} 
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
          position: "relative"
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
