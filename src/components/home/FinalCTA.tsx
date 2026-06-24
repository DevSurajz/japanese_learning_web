"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { useViewport } from "@/hooks"

export default function FinalCTA() {
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

        <Link href="/kana" style={{ textDecoration: "none" }} prefetch={false}>
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
