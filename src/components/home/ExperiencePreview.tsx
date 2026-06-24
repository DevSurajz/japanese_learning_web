"use client"

import { motion } from "motion/react"
import { useViewport } from "@/hooks"

export default function ExperiencePreview() {
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
