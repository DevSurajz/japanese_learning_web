"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "motion/react"

interface KanjiStrokeOrderProps {
  kanji: string
}

export default function KanjiStrokeOrder({ kanji }: KanjiStrokeOrderProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!kanji) return
    let isMounted = true
    
    async function fetchSvg() {
      try {
        const hex = kanji.charCodeAt(0).toString(16).padStart(5, '0')
        const url = `https://cdn.jsdelivr.net/npm/kanjivg@latest/kanji/${hex}.svg`
        const res = await fetch(url)
        if (!res.ok) throw new Error("Not found")
        const text = await res.text()
        if (isMounted) {
          setSvgContent(text)
          setError(false)
        }
      } catch (err) {
        if (isMounted) setError(true)
      }
    }
    
    fetchSvg()
    return () => { isMounted = false }
  }, [kanji])

  useEffect(() => {
    if (!svgContent || !containerRef.current) return
    const svgEl = containerRef.current.querySelector('svg')
    if (!svgEl) return
    
    // Customize styles
    svgEl.style.width = "100%"
    svgEl.style.height = "100%"
    
    const paths = svgEl.querySelectorAll('path')
    paths.forEach(p => {
      p.style.stroke = "#475569" // Muted text color
      p.style.strokeWidth = "3"
    })
    
    // Hide text labels from KanjiVG if present
    const texts = svgEl.querySelectorAll('text')
    texts.forEach(t => t.style.display = 'none')

    if (showAll) {
      paths.forEach(p => {
        p.style.strokeDasharray = ""
        p.style.strokeDashoffset = ""
        p.style.transition = "none"
        p.style.opacity = "1"
      })
      return
    }

    // Animate strokes
    let currentDelay = 0
    paths.forEach(p => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = len.toString()
      p.style.strokeDashoffset = len.toString()
      p.style.transition = "none"
      p.style.opacity = "1"
      
      setTimeout(() => {
        p.style.transition = "stroke-dashoffset 0.4s ease-out"
        p.style.strokeDashoffset = "0"
      }, currentDelay)
      
      currentDelay += 500
    })

  }, [svgContent, animationKey, showAll])

  if (error || !svgContent) return null

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: 16,
      padding: 24,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16
    }}>
      <div 
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: svgContent }} 
        style={{ width: 140, height: 140 }}
      />
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => { setShowAll(false); setAnimationKey(k => k + 1) }}
          style={{
            background: "#f1f5f9", color: "#475569", border: "none",
            padding: "6px 12px", borderRadius: 99, cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 11,
            letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500
          }}
        >
          Play Again
        </button>
        <button
          onClick={() => setShowAll(true)}
          style={{
            background: "transparent", color: "#64748b", border: "1px solid #e2e8f0",
            padding: "6px 12px", borderRadius: 99, cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 11,
            letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500
          }}
        >
          Show All
        </button>
      </div>
    </div>
  )
}
