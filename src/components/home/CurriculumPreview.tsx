"use client"

import { motion } from "motion/react"
import { useViewport } from "@/hooks"
import { useState } from "react"

const CURRICULUM = [
  { level: "N5", title: "The Foundation", active: true },
  { level: "N4", title: "Basic Proficiency", active: false },
  { level: "N3", title: "Conversational Mastery", active: false },
  { level: "N2", title: "Business Fluency", active: false },
  { level: "N1", title: "Native Comprehension", active: false },
]


export default function CurriculumPreview() {
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
              {item.active ? (
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(10,10,10,0.5)" }}>
                  Available Now
                </span>
              ) : (
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(10,10,10,0.5)" }}>
                  Coming Soon
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
