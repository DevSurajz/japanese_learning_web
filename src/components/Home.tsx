"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react"
import Link from "next/link"
import { useViewport } from "@/hooks"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

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
            display: "flex", gap: 16, alignItems: "center", marginBottom: 32,
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
          }}
        >
          <span>A Structured Path</span>
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
          <Link href="/kana" style={{ textDecoration: "none" }}>
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
          <Link href="#curriculum" style={{ textDecoration: "none" }}>
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

// ─── LEARNING PATH ────────────────────────────────────────────────────────
const PATH_STEPS = [
  { title: "Kana", desc: "Build the foundation. Master Hiragana and Katakana pronunciation and reading." },
  { title: "Vocabulary", desc: "Grow your lexicon. Learn essential words grouped by topic and context." },
  { title: "Grammar", desc: "Understand the structure. From basic particles to complex sentence patterns." },
  { title: "Kanji", desc: "Unlock meaning. Learn characters, stroke order, and multiple readings." },
  { title: "Reading", desc: "Apply your knowledge. Read native-level texts and comprehend nuance." },
  { title: "JLPT", desc: "Prove your mastery. Test your skills against the official Japanese Language Proficiency Test." },
]

function LearningPath() {
  const { isMobile } = useViewport()
  return (
    <section style={{ padding: isMobile ? "80px 24px" : "140px 48px", background: "#FAFAFA" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 80, textAlign: "center" }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontWeight: 300, fontSize: "clamp(40px, 6vw, 64px)",
            color: "#0A0A0A", marginBottom: 16,
          }}>The Logical Progression</h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 14,
            color: "rgba(10,10,10,0.5)", maxWidth: 500, margin: "0 auto"
          }}>
            Instantly understand how the pieces fit together. A step-by-step journey designed to eliminate confusion.
          </p>
        </motion.div>

        <div style={{
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", 
          gap: isMobile ? 32 : 48
        }}>
          {PATH_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                position: "relative",
                paddingTop: 24, borderTop: "1px solid rgba(10,10,10,0.1)",
              }}
            >
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 10,
                color: "rgba(10,10,10,0.3)", letterSpacing: "0.2em", display: "block", marginBottom: 16
              }}>0{i + 1}</span>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: 24,
                color: "#0A0A0A", marginBottom: 12
              }}>{step.title}</h3>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 13,
                lineHeight: 1.6, color: "rgba(10,10,10,0.6)"
              }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WHY NIHONGOPATH ────────────────────────────────────────────────────────
const PILLARS = [
  { title: "Structured Learning", desc: "No more guessing what to study next. A clear, definitive path from absolute beginner to advanced fluency." },
  { title: "Active Practice", desc: "Move beyond passive reading. Built-in assessments, typing exercises, and interactive review systems." },
  { title: "JLPT Focused", desc: "Curriculum meticulously designed around real JLPT requirements, ensuring your study time counts." },
  { title: "Long-Term Retention", desc: "Identify weak spots automatically. Revisit and strengthen challenging concepts until they become second nature." },
]

function WhyNihongoPath() {
  const { isMobile } = useViewport()
  return (
    <section style={{ padding: isMobile ? "80px 24px" : "140px 48px", background: "#FFFFFF" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 64 : 120 }}>
        
        <div style={{ flex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(48px, 6vw, 72px)",
              color: "#0A0A0A", lineHeight: 1.1, marginBottom: 32
            }}>
              Why<br /><span style={{ fontStyle: "italic" }}>NihongoPath?</span>
            </h2>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 15,
              lineHeight: 1.6, color: "rgba(10,10,10,0.5)", maxWidth: 360
            }}>
              Learning Japanese is a monumental task. We provide the architecture, you provide the dedication.
            </p>
          </motion.div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 48 }}>
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{ borderLeft: "2px solid #0A0A0A", paddingLeft: 32 }}
            >
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13,
                letterSpacing: "0.1em", textTransform: "uppercase", color: "#0A0A0A", marginBottom: 16
              }}>{pillar.title}</h3>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 22,
                lineHeight: 1.5, color: "rgba(10,10,10,0.6)"
              }}>{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  )
}

// ─── LEARNING EXPERIENCE PREVIEW ────────────────────────────────────────────────────────
function ExperiencePreview() {
  const { isMobile, isTablet } = useViewport()
  return (
    <section style={{ padding: isMobile ? "80px 24px" : "140px 48px", background: "#FAFAFA", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 80, textAlign: "center" }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontWeight: 300, fontSize: "clamp(36px, 5vw, 56px)",
            color: "#0A0A0A", marginBottom: 16,
          }}>The Premium Learning Experience</h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 14,
            color: "rgba(10,10,10,0.5)", maxWidth: 600, margin: "0 auto"
          }}>
            Minimalist interfaces designed for maximum focus. Study without distractions.
          </p>
        </motion.div>

        <div style={{
          display: "flex", flexDirection: isMobile || isTablet ? "column" : "row",
          alignItems: "center", justifyContent: "center", gap: 40,
        }}>
          {/* Flashcard Mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{
              background: "#FFF", borderRadius: 24, padding: "40px 20px", width: 280,
              boxShadow: "0 20px 40px rgba(0,0,0,0.03)", border: "1px solid rgba(10,10,10,0.05)",
              display: "flex", flexDirection: "column", alignItems: "center",
            }}
          >
            <div style={{ width: 80, height: 80, background: "#FAFAFA", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 48, color: "#0A0A0A", lineHeight: 1 }}>あ</span>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", color: "rgba(10,10,10,0.4)" }}>A</p>
          </motion.div>

          {/* Assessment Mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: "#FFF", borderRadius: 24, padding: "40px", width: 340,
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)", border: "2px solid #10b981",
              display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2,
            }}
          >
            <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 64, fontWeight: 300, color: "#0A0A0A", lineHeight: 1, marginBottom: 32 }}>き</span>
            <div style={{ background: "#FAFAFA", border: "1px solid rgba(10,10,10,0.1)", borderRadius: 12, padding: "16px", width: "100%", textAlign: "center", color: "#10b981", fontFamily: "'Space Grotesk', sans-serif", fontSize: 16 }}>
              ki
            </div>
          </motion.div>

          {/* Grammar Mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              background: "#FFF", borderRadius: 24, padding: "40px 32px", width: 280,
              boxShadow: "0 20px 40px rgba(0,0,0,0.03)", border: "1px solid rgba(10,10,10,0.05)",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ display: "inline-flex", background: "#FAFAFA", padding: "6px 12px", borderRadius: 99, marginBottom: 24, alignSelf: "flex-start" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.1em", color: "rgba(10,10,10,0.5)" }}>N5 GRAMMAR</span>
            </div>
            <h3 style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 24, fontWeight: 300, color: "#0A0A0A", marginBottom: 12 }}>〜は〜です</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "rgba(10,10,10,0.6)", lineHeight: 1.4 }}>
              Used to indicate the topic of a sentence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── PROGRESS & MASTERY ────────────────────────────────────────────────────────
function ProgressMastery() {
  const { isMobile } = useViewport()
  return (
    <section style={{ padding: isMobile ? "80px 24px" : "140px 48px", background: "#FFFFFF", borderTop: "1px solid rgba(10,10,10,0.05)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", gap: isMobile ? 64 : 80 }}>
        
        <div style={{ flex: 1, width: "100%" }}>
          {/* Abstract Progress Visual */}
          <div style={{ background: "#FAFAFA", borderRadius: 24, padding: "48px 32px", border: "1px solid rgba(10,10,10,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.1em", color: "#0A0A0A" }}>Mastery Score</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#10b981" }}>84%</span>
            </div>
            <div style={{ width: "100%", height: 2, background: "rgba(10,10,10,0.05)", marginBottom: 40, position: "relative" }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: "84%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }} style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "#10b981" }} />
            </div>

            <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
              {[
                { label: "Weak Areas Identified", val: "12 Characters", color: "#ef4444" },
                { label: "Ready for Practice", val: "Optimized Review", color: "#0A0A0A" }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + (i * 0.2) }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid rgba(10,10,10,0.05)" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(10,10,10,0.5)" }}>{item.label}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: item.color }}>{item.val}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(40px, 5vw, 56px)",
            color: "#0A0A0A", lineHeight: 1.1, marginBottom: 24
          }}>
            Measurable<br/>Learning.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 14,
            lineHeight: 1.6, color: "rgba(10,10,10,0.5)", marginBottom: 32
          }}>
            Stop guessing your proficiency. NihongoPath automatically tracks your answers, identifying weak areas and prompting targeted practice sessions. 
            Improve exactly what you need, when you need it.
          </motion.p>
        </div>

      </div>
    </section>
  )
}

// ─── CURRICULUM PREVIEW ────────────────────────────────────────────────────────
const CURRICULUM = [
  { level: "N5", title: "The Foundation", active: true },
  { level: "N4", title: "Basic Proficiency", active: false },
  { level: "N3", title: "Conversational Mastery", active: false },
  { level: "N2", title: "Business Fluency", active: false },
  { level: "N1", title: "Native Comprehension", active: false },
]

function CurriculumPreview() {
  const { isMobile } = useViewport()
  return (
    <section id="curriculum" style={{ padding: isMobile ? "80px 24px" : "140px 48px", background: "#FAFAFA" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(40px, 6vw, 64px)", color: "#0A0A0A", marginBottom: 16 }}>The Roadmap</h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(10,10,10,0.5)" }}>A comprehensive journey to fluency.</p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {CURRICULUM.map((item, i) => (
            <motion.div
              key={item.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "32px 0", borderBottom: "1px solid rgba(10,10,10,0.08)",
                opacity: item.active ? 1 : 0.4,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: isMobile ? 24 : 32, color: "#0A0A0A" }}>{item.level}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: item.active ? 600 : 300, fontSize: isMobile ? 20 : 28, color: "#0A0A0A", fontStyle: "italic" }}>{item.title}</span>
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(10,10,10,0.5)" }}>
                {item.active ? "Available Now" : "Coming Soon"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────────
function FinalCTA() {
  const { isMobile } = useViewport()

  return (
    <section style={{
      padding: isMobile ? "120px 24px" : "180px 48px",
      background: "#FFFFFF",
      display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center",
      borderTop: "1px solid rgba(10,10,10,0.05)"
    }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontWeight: 300, fontSize: "clamp(48px, 8vw, 90px)",
          color: "#0A0A0A", lineHeight: 1.05, marginBottom: 24,
        }}>
          Your Japanese journey<br />starts today.
        </h2>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
          fontSize: 15, color: "rgba(10,10,10,0.5)", marginBottom: 56, maxWidth: 480, margin: "0 auto 56px", lineHeight: 1.6
        }}>
          Build a strong foundation, track your progress, and advance through every JLPT level with confidence.
        </p>

        <Link href="/kana" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex", flexDirection: "column", alignItems: "center",
              background: "#0A0A0A", padding: "20px 48px", cursor: "pointer",
            }}
          >
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13,
              letterSpacing: "0.1em", textTransform: "uppercase", color: "#FAFAFA",
            }}>
              Start Learning
            </p>
          </motion.div>
        </Link>
      </motion.div>
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
