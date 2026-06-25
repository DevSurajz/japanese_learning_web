"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { speak } from "@/lib/pronounce"

interface SpeakButtonProps {
  text: string
  rate?: number
}

export default function SpeakButton({ text, rate = 0.85 }: SpeakButtonProps) {
  const [supported, setSupported] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSupported(true)
    }
  }, [])

  if (!supported) return null

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActive(true)
    speak(text, rate)
    setTimeout(() => setActive(false), 200)
  }

  return (
    <motion.button
      onClick={handleClick}
      aria-label="Play pronunciation"
      whileHover={{ opacity: 0.7 }}
      whileTap={{ scale: 0.9 }}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 4,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: active ? 0.4 : 1,
        transition: "opacity 0.2s",
        color: "inherit",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    </motion.button>
  )
}
