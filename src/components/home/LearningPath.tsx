"use client"

import { motion } from "motion/react"
import { useViewport } from "@/hooks"

const PATH_STEPS = [
  { title: "Kana", desc: "Build the foundation. Master Hiragana and Katakana pronunciation and reading." },
  { title: "Vocabulary", desc: "Grow your lexicon. Learn essential words grouped by topic and context." },
  { title: "Grammar", desc: "Understand the structure. From basic particles to complex sentence patterns." },
  { title: "Kanji", desc: "Unlock meaning. Learn characters, stroke order, and multiple readings." },
  { title: "Reading", desc: "Apply your knowledge. Read native-level texts and comprehend nuance." },
  { title: "JLPT", desc: "Prove your mastery. Test your skills against the official Japanese Language Proficiency Test." },
]

export default function LearningPath() {
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
