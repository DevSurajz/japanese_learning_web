"use client"

import { motion } from "motion/react"
import { useViewport } from "@/hooks"

const PILLARS = [
  { title: "Structured Learning", desc: "No more guessing what to study next. A clear, definitive path from absolute beginner to advanced fluency." },
  { title: "Active Practice", desc: "Move beyond passive reading. Built-in assessments, typing exercises, and interactive review systems." },
  { title: "JLPT Focused", desc: "Curriculum meticulously designed around real JLPT requirements, ensuring your study time counts." },
  { title: "Long-Term Retention", desc: "Identify weak spots automatically. Revisit and strengthen challenging concepts until they become second nature." },
]

export default function WhyNihongoPath() {
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
