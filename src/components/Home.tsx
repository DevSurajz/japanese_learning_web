"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useViewport } from "@/hooks"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

// Dynamically import components below the fold to reduce initial bundle size
const LearningPath = dynamic(() => import('@/components/home/LearningPath').then(mod => mod.default), { ssr: true })
const WhyNihongoPath = dynamic(() => import('@/components/home/WhyNihongoPath').then(mod => mod.default), { ssr: true })
const ExperiencePreview = dynamic(() => import('@/components/home/ExperiencePreview').then(mod => mod.default), { ssr: true })
const ProgressMastery = dynamic(() => import('@/components/home/ProgressMastery').then(mod => mod.default), { ssr: true })
const CurriculumPreview = dynamic(() => import('@/components/home/CurriculumPreview').then(mod => mod.default), { ssr: true })
const FinalCTA = dynamic(() => import('@/components/home/FinalCTA').then(mod => mod.default), { ssr: true })

const learners = [
  { initials: 'TK', color: '#6366f1' },
  { initials: 'MR', color: '#8b5cf6' },
  { initials: 'SA', color: '#a78bfa' },
]

// ─── HERO ────────────────────────────────────────────────────────
function Hero({ scrollY }: { scrollY: ReturnType<typeof useScroll>["scrollY"] }) {
  const { isMobile } = useViewport()

  const kanjiY = useTransform(scrollY, [0, 600], [0, -120])
  const kanjiOpacity = useTransform(scrollY, [0, 400], [0.06, 0])
  const springY = useSpring(kanjiY, { stiffness: 80, damping: 20 })

  return (
    <section
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: isMobile ? "120px 24px 80px" : "140px 48px 100px", position: "relative", overflow: "hidden",
        background: "#FAFAFA",
      }}
    >
      {/* Background elegant characters */}
      <motion.div
        style={{
          position: "absolute", right: "5%", top: "45%", translateY: "-50%",
          y: isMobile ? 0 : springY, opacity: kanjiOpacity,
          fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100,
          fontSize: "clamp(240px, 35vw, 600px)", color: "#0A0A0A",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}
      >道</motion.div>

      <div style={{ maxWidth: 800, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex", gap: 16, alignItems: "center", marginBottom: 24,
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
          }}
        >
          <span>A Structured Path</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 999,
            padding: '6px 14px 6px 8px',
            marginBottom: 32,
          }}
        >
          {/* overlapping avatar stack */}
          <div style={{ display: 'flex' }}>
            {learners.map((l, i) => (
              <div key={i} style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: l.color,
                border: '2px solid white',
                marginLeft: i === 0 ? 0 : -8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 600,
                color: 'white',
                zIndex: learners.length - i,
                position: 'relative',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {l.initials}
              </div>
            ))}
          </div>

          {/* text */}
          <span style={{ fontSize: 13, color: '#374151', fontWeight: 500, fontFamily: "'Space Grotesk', sans-serif" }}>
            Used by <strong>196+</strong> learners
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.05,
            fontSize: "clamp(60px, 10vw, 120px)", color: "#0A0A0A", marginBottom: 32,
          }}
        >
          <span style={{ display: "block", fontStyle: "italic" }}>Master</span>
          <span style={{ display: "block", fontWeight: 600 }}>Japanese.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: isMobile ? 15 : 18,
            lineHeight: 1.6, color: "rgba(10,10,10,0.6)", maxWidth: 500, marginBottom: 48,
          }}
        >
          From your first Hiragana to JLPT N1. Learn Kana, Vocabulary, Grammar, Kanji, and Reading through a structured learning path designed for long-term mastery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}
        >
          <Link href="/kana" style={{ textDecoration: "none" }} prefetch={false}>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                background: "#0A0A0A", color: "#FAFAFA",
                border: "none", padding: "18px 36px",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13,
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              }}
            >Start Learning</motion.button>
          </Link>
          <Link href="#curriculum" style={{ textDecoration: "none" }} prefetch={false}>
            <motion.button
              whileHover={{ color: "#0A0A0A" }}
              style={{
                background: "transparent", color: "rgba(10,10,10,0.5)",
                border: "none", padding: "18px 0",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13,
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                transition: "color 0.3s ease",
              }}
            >Explore Curriculum ↓</motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  const { scrollY } = useScroll()

  return (
    <>
      <Navbar scrollY={scrollY} variant="home" />
      <main>
        <Hero scrollY={scrollY} />
        {/* Only dynamically loading sections below fold */}
        <LearningPath />
        <WhyNihongoPath />
        <ExperiencePreview />
        <ProgressMastery />
        <CurriculumPreview />
        <FinalCTA />
        <Footer />
      </main>
    </>
  )
}
