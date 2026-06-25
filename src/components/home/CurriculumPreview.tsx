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

function WaitlistForm({ level, isMobile }: { level: string; isMobile: boolean }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, level })
      })
      if (res.ok) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch (err) {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#10b981", fontWeight: 500 }}>
        ✓ You're on the list!
      </span>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: 12, marginTop: isMobile ? 16 : 0 }}>
      {status === "error" && <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: "#ef4444" }}>Something went wrong. Try again.</span>}
      <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(10,10,10,0.1)", borderRadius: 4, overflow: "hidden" }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            border: "none", padding: "8px 12px", outline: "none",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 12,
            width: isMobile ? 200 : 180, background: "transparent"
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            background: "#0A0A0A", color: "#FFF", border: "none",
            padding: "8px 16px", cursor: status === "loading" ? "not-allowed" : "pointer",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 11,
            letterSpacing: "0.1em", textTransform: "uppercase",
            opacity: status === "loading" ? 0.7 : 1
          }}
        >
          {status === "loading" ? "..." : "Notify Me"}
        </button>
      </div>
      {!isMobile && (
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: "rgba(10,10,10,0.4)" }}>
          We'll email you when {level} launches.
        </span>
      )}
    </form>
  )
}

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
                <WaitlistForm level={item.level} isMobile={isMobile} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
