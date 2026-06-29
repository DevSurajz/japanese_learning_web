"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useRouter } from "next/navigation"
import { kanjiData } from "@/kanjiData"
import { createClient } from "@/utils/supabase/client"
import { addPracticeXP, updateStreak } from "@/lib/xp"
import { logActivity } from "@/lib/activity"

type Question = {
  kanjiId: string
  kanjiChar: string
  type: 'meaning' | 'onyomi' | 'kunyomi'
  questionText: string
  choices: string[]
  correctAnswer: string
}

export default function KanjiPracticePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  
  // Track correct/wrong per kanji for mastery update
  const [results, setResults] = useState<Record<string, { correct: number, wrong: number }>>({})

  useEffect(() => {
    async function initPractice() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }

      // 1. Fetch learned kanji
      const { data: learned } = await supabase.from('kanji_learned').select('kanji_id').eq('user_id', user.id)
      if (!learned || learned.length === 0) {
        setLoading(false)
        return // Handle empty state
      }

      const learnedIds = learned.map(l => l.kanji_id)
      
      // 2. Select up to 10 random
      const shuffledIds = [...learnedIds].sort(() => 0.5 - Math.random()).slice(0, 10)
      
      // 3. Generate questions
      const generatedQuestions: Question[] = []
      
      shuffledIds.forEach(id => {
        const kData = kanjiData.find(k => k.kanji === id)
        if (!kData) return
        
        // Randomly pick question type based on available data
        const types: ('meaning' | 'onyomi' | 'kunyomi')[] = ['meaning']
        if (kData.onyomi.length > 0) types.push('onyomi')
        if (kData.kunyomi.length > 0) types.push('kunyomi')
        
        const qType = types[Math.floor(Math.random() * types.length)]
        
        let correctAns = ''
        let allOptions: string[] = []
        
        if (qType === 'meaning') {
          correctAns = kData.meaning
          allOptions = kanjiData.map(k => k.meaning)
        } else if (qType === 'onyomi') {
          correctAns = kData.onyomi[0]
          allOptions = kanjiData.flatMap(k => k.onyomi).filter(Boolean)
        } else if (qType === 'kunyomi') {
          correctAns = kData.kunyomi[0]
          allOptions = kanjiData.flatMap(k => k.kunyomi).filter(Boolean)
        }
        
        // Generate 3 wrong choices
        const wrongChoices = allOptions
          .filter(opt => opt !== correctAns)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          
        const choices = [correctAns, ...wrongChoices].sort(() => 0.5 - Math.random())
        
        generatedQuestions.push({
          kanjiId: id,
          kanjiChar: kData.kanji,
          type: qType,
          questionText: qType === 'meaning' ? 'What does this kanji mean?' : `What is the ${qType} reading of this kanji?`,
          choices,
          correctAnswer: correctAns
        })
      })
      
      setQuestions(generatedQuestions)
      setLoading(false)
    }
    
    initPractice()
  }, [router])

  const handleAnswer = (choice: string) => {
    if (selectedAnswer !== null) return // Prevent multiple clicks
    
    setSelectedAnswer(choice)
    const currentQ = questions[currentIndex]
    const isCorrect = choice === currentQ.correctAnswer
    
    if (isCorrect) setScore(s => s + 1)
    
    setResults(prev => ({
      ...prev,
      [currentQ.kanjiId]: {
        correct: (prev[currentQ.kanjiId]?.correct || 0) + (isCorrect ? 1 : 0),
        wrong: (prev[currentQ.kanjiId]?.wrong || 0) + (!isCorrect ? 1 : 0)
      }
    }))
    
    setTimeout(() => {
      setSelectedAnswer(null)
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1)
      } else {
        finishPractice()
      }
    }, 1000)
  }

  const finishPractice = async () => {
    setIsFinished(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // 1. Give XP (2 per correct)
    const earnedXP = score * 2 // Using the local state `score` might be stale if updated in same cycle, but here we wait for setTimeout so it's mostly correct. Actually, better to calculate from results.
    let totalCorrect = 0;
    Object.values(results).forEach(r => totalCorrect += r.correct)
    
    // The last answer might not be in results state yet due to async closure, let's calculate based on current state + last answer
    // Wait, the setResults runs synchronously before setTimeout, so by the time setTimeout runs, results state is updated? No, setTimeout closure captures old state.
    // Let's just use `score` + (last answer is correct ? 1 : 0).
    // Actually, `score` state is updated immediately, but closure has old.
    // It's safer to do this logic inside a `useEffect` on `isFinished`. Let's handle DB updates separately.
  }

  // Handle finish side-effects
  useEffect(() => {
    if (!isFinished) return
    
    async function saveResults() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const xpEarned = score * 2
      
      if (xpEarned > 0) {
        await addPracticeXP(xpEarned, user.id)
        await updateStreak(user.id)
      }

      await logActivity(user.id, 'Practice Session Completed', `Scored ${score}/${questions.length} and earned ${xpEarned} XP.`, 'PRACTICE_SESSION')

      // Update Mastery
      // We need to fetch existing mastery first
      const kanjiIds = Object.keys(results)
      const { data: existingMastery } = await supabase
        .from('kanji_mastery')
        .select('*')
        .eq('user_id', user.id)
        .in('kanji_id', kanjiIds)

      const existingMap = (existingMastery || []).reduce((acc, m) => {
        acc[m.kanji_id] = m
        return acc
      }, {} as Record<string, any>)

      const upserts = kanjiIds.map(id => {
        const existing = existingMap[id] || { correct_answers: 0, wrong_answers: 0 }
        const addedCorrect = results[id].correct
        const addedWrong = results[id].wrong
        
        const newCorrect = existing.correct_answers + addedCorrect
        const newWrong = existing.wrong_answers + addedWrong
        const total = newCorrect + newWrong
        const masteryPercent = total === 0 ? 0 : Math.round((newCorrect / total) * 100)

        return {
          user_id: user.id,
          kanji_id: id,
          correct_answers: newCorrect,
          wrong_answers: newWrong,
          mastery_percent: masteryPercent,
          last_reviewed: new Date().toISOString()
        }
      })

      if (upserts.length > 0) {
        await supabase.from('kanji_mastery').upsert(upserts, { onConflict: 'user_id, kanji_id' })
      }
    }

    saveResults()
  }, [isFinished]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: "'Space Grotesk', sans-serif" }}>
        Loading Practice Session...
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: "'Space Grotesk', sans-serif" }}>
        <h2>No Learned Kanji</h2>
        <p>You need to learn some kanji first before you can practice.</p>
        <button onClick={() => router.push('/kanji')} style={{ marginTop: 16, padding: '10px 20px', background: '#0f172a', color: '#fff', borderRadius: 8, cursor: 'pointer' }}>Go Learn Kanji</button>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: "'Space Grotesk', sans-serif" }}>
        <h1 style={{ fontSize: 48, marginBottom: 16 }}>Practice Complete!</h1>
        <p style={{ fontSize: 24, marginBottom: 8 }}>Score: {score} / {questions.length}</p>
        <p style={{ fontSize: 20, color: '#10b981', marginBottom: 32 }}>+{score * 2} XP</p>
        
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16 }}>Practice Again</button>
          <button onClick={() => router.push('/kanji')} style={{ padding: '12px 24px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16 }}>Back to Kanji</button>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentIndex]

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Space Grotesk', sans-serif", padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', maxWidth: 600, display: 'flex', justifyContent: 'space-between', marginBottom: 40, alignItems: 'center' }}>
        <button onClick={() => router.push('/kanji')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>← Quit</button>
        <div style={{ fontWeight: 600 }}>Question {currentIndex + 1} / {questions.length}</div>
        <div style={{ fontWeight: 600, color: '#3b82f6' }}>Score: {score}</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ fontSize: 120, fontFamily: "'Noto Sans JP', sans-serif", marginBottom: 24, color: '#0f172a' }}>
            {currentQ.kanjiChar}
          </div>
          
          <h2 style={{ fontSize: 24, marginBottom: 40, textAlign: 'center', color: '#334155' }}>
            {currentQ.questionText}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: '100%' }}>
            {currentQ.choices.map((choice, idx) => {
              const isSelected = selectedAnswer === choice;
              const isCorrect = choice === currentQ.correctAnswer;
              
              let bg = '#fff';
              let color = '#0f172a';
              let borderColor = '#e2e8f0';
              
              if (selectedAnswer !== null) {
                if (isCorrect) {
                  bg = '#10b981'; color = '#fff'; borderColor = '#10b981';
                } else if (isSelected && !isCorrect) {
                  bg = '#ef4444'; color = '#fff'; borderColor = '#ef4444';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(choice)}
                  disabled={selectedAnswer !== null}
                  style={{
                    padding: '20px',
                    fontSize: 18,
                    fontFamily: currentQ.type === 'meaning' ? "'Space Grotesk', sans-serif" : "'Noto Sans JP', sans-serif",
                    background: bg,
                    color: color,
                    border: `2px solid ${borderColor}`,
                    borderRadius: 12,
                    cursor: selectedAnswer === null ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  {choice}
                </button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
