"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useRouter } from "next/navigation"
import { useViewport } from "@/hooks"
import { 
  hiraganaGrid, hiraganaDakuten, hiraganaHandakuten, 
  katakanaGrid, katakanaDakuten, katakanaHandakuten 
} from "./kana/data"
import { useProgress } from "./kana/progress"
import { KanaLearn } from "./kana/KanaLearn"
import { KanaAssess } from "./kana/KanaAssess"
import { KanaPractice } from "./kana/KanaPractice"
import { KanaExitModal } from "./kana/KanaExitModal"

type Mode = "learn" | "assess" | "practice"
type Tab = "Hiragana" | "Katakana"

export default function KanaPage() {
  const router = useRouter()
  const { isMobile } = useViewport()
  const { isLoaded, updateProgress, getWeakCharacters, getMastery } = useProgress()
  
  const [activeTab, setActiveTab] = useState<Tab>("Hiragana")
  const [mode, setMode] = useState<Mode>("learn")
  const [showExitModal, setShowExitModal] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)
  
  const sections = activeTab === "Hiragana" ? [
    { title: "Gojūon (Basic)", desc: `The 46 foundational characters of Hiragana.`, data: hiraganaGrid },
    { title: "Dakuten (Voiced)", desc: "Characters with ゛ markers softening the consonant (k→g, s→z, t→d, h→b).", data: hiraganaDakuten },
    { title: "Handakuten (Half-voiced)", desc: "Characters with ゜ markers converting h sounds to p sounds.", data: hiraganaHandakuten }
  ] : [
    { title: "Gojūon (Basic)", desc: `The 46 foundational characters of Katakana.`, data: katakanaGrid },
    { title: "Dakuten (Voiced)", desc: "Characters with ゛ markers softening the consonant (k→g, s→z, t→d, h→b).", data: katakanaDakuten },
    { title: "Handakuten (Half-voiced)", desc: "Characters with ゜ markers converting h sounds to p sounds.", data: katakanaHandakuten }
  ]

  const allKanaList = [...sections[0].data, ...sections[1].data, ...sections[2].data]
  
  const handleTabChange = (newTab: Tab) => {
    if (mode !== "learn") {
      setShowExitModal(true)
      setPendingNavigation(() => () => {
        setActiveTab(newTab)
        setMode("learn")
      })
    } else {
      setActiveTab(newTab)
    }
  }

  const handleModeChange = (newMode: Mode) => {
    if (mode !== "learn" && newMode !== mode) {
      setShowExitModal(true)
      setPendingNavigation(() => () => setMode(newMode))
    } else {
      setMode(newMode)
    }
  }

  const handleBack = () => {
    if (mode !== "learn") {
      setShowExitModal(true)
      setPendingNavigation(() => () => router.push("/"))
    } else {
      router.push("/")
    }
  }

  const confirmExit = () => {
    setShowExitModal(false)
    if (pendingNavigation) pendingNavigation()
    setPendingNavigation(null)
  }

  const cancelExit = () => {
    setShowExitModal(false)
    setPendingNavigation(null)
  }

  const handleComplete = (results: { kana: string; isCorrect: boolean }[]) => {
    updateProgress(results)
    setMode("learn")
  }
  
  if (!isLoaded) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "56px 48px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 120, height: 24, background: "#e2e8f0", borderRadius: 12, marginBottom: 40, animation: "pulse 1.5s infinite ease-in-out" }} />
        <div style={{ width: 300, height: 64, background: "#e2e8f0", borderRadius: 16, marginBottom: 20, animation: "pulse 1.5s infinite ease-in-out" }} />
        <div style={{ width: 200, height: 20, background: "#e2e8f0", borderRadius: 10, animation: "pulse 1.5s infinite ease-in-out" }} />
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        overflowY: "auto",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(248,250,252,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
        padding: isMobile ? "10px 16px" : "16px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "nowrap", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, overflow: "hidden" }}>
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100, fontSize: isMobile ? 13 : 18, color: "#64748b", whiteSpace: "nowrap" }}>日本語</span>
          <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 500, color: "#1e293b", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>NihongoPath</span>
          <span style={{ display: isMobile ? "none" : "inline", color: "#cbd5e1", fontSize: 13 }}>/</span>
          <span style={{ display: isMobile ? "none" : "inline", fontSize: 11, color: "#10b981", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap" }}>Kana Mastery</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleBack}
          style={{
            background: "#0f172a", color: "#fff",
            border: "none", borderRadius: 99,
            padding: isMobile ? "6px 10px" : "8px 20px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isMobile ? 10 : 11, fontWeight: 400,
            letterSpacing: "0.12em", textTransform: "uppercase",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
            whiteSpace: "nowrap",
          }}
        >
          ← {isMobile ? "Back" : "Back to Home"}
        </motion.button>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 48px 100px" }}>
        
        {/* Header (Only show in Learn mode to keep Assess/Practice clean) */}
        {mode === "learn" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 40, textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "#ecfdf5", borderRadius: 99,
              padding: "6px 14px", marginBottom: 20,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(48px, 6vw, 72px)", color: "#0f172a", lineHeight: 1 }}>
              Kana
            </h1>
            <p style={{ fontSize: 15, color: "#64748b", marginTop: 12, fontWeight: 300 }}>
              Master Hiragana and Katakana through active recall and targeted practice.
            </p>
          </motion.div>
        )}

        {/* System Navigation (Hiragana/Katakana) */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <div style={{ background: "#e2e8f0", padding: 6, borderRadius: 99, display: "inline-flex", gap: 4 }}>
            {(["Hiragana", "Katakana"] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  background: activeTab === tab ? "#fff" : "transparent",
                  color: activeTab === tab ? "#0f172a" : "#64748b",
                  padding: "10px 32px",
                  borderRadius: 99, border: "none", cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.05em",
                  boxShadow: activeTab === tab ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Navigation (Learn / Assess / Practice) */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 56, gap: 16 }}>
          {(["learn", "assess", "practice"] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              style={{
                background: "transparent",
                color: mode === m ? "#0f172a" : "#94a3b8",
                padding: "8px 0",
                border: "none", borderBottom: `2px solid ${mode === m ? "#0f172a" : "transparent"}`,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Review weak areas shortcut */}
        {mode === "learn" && getWeakCharacters().length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}
          >
            <a
              href="/review?filter=weak&type=kana"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff7ed', border: '1px solid #fed7aa',
                color: '#c2410c', padding: '8px 20px', borderRadius: 99,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', textDecoration: 'none',
              }}
            >
              <span>⚠</span>
              Review {getWeakCharacters().length} weak {getWeakCharacters().length === 1 ? 'character' : 'characters'}
            </a>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${mode}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {mode === "learn" && <KanaLearn activeTab={activeTab} isMobile={isMobile} sections={sections} />}
            {mode === "assess" && <KanaAssess isMobile={isMobile} kanaList={allKanaList} onComplete={handleComplete} />}
            {mode === "practice" && <KanaPractice isMobile={isMobile} kanaList={allKanaList} weakCharacters={getWeakCharacters(activeTab.toLowerCase() as "hiragana"|"katakana"|"all")} onComplete={handleComplete} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        <KanaExitModal isOpen={showExitModal} onContinue={cancelExit} onLeave={confirmExit} />
      </AnimatePresence>
    </motion.div>
  )
}
