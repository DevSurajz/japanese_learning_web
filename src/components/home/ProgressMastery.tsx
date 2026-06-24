"use client"

import { motion } from "motion/react"
import { useViewport } from "@/hooks"

export default function ProgressMastery() {
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
