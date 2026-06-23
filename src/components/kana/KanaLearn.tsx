"use client"

import { motion } from "motion/react"
import { KanaItem } from "./data"
import { playKanaAudio } from "./audio"

function KanaCard({ item, index, isMobile }: { item: KanaItem; index: number; isMobile: boolean }) {
  if (item.empty) return <div />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.015, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => item.kana && playKanaAudio(item.kana)}
      style={{
        background: "#fff",
        borderRadius: isMobile ? 12 : 16,
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        padding: isMobile ? "10px 6px" : "20px 14px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: isMobile ? 6 : 10,
        height: "100%",
        cursor: "pointer", // Changed to pointer for audio
        transition: "box-shadow 0.3s ease",
        position: "relative",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)"}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)"}
    >
      {/* Subtle Speaker Icon */}
      <div style={{ position: "absolute", top: 8, right: 8, opacity: 0.3 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      </div>

      <div style={{
        position: "relative", width: isMobile ? 52 : 72, height: isMobile ? 52 : 72,
        borderRadius: isMobile ? 10 : 12,
        background: "#f8fafc",
        border: "1px solid #f1f5f9",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, fontSize: isMobile ? 28 : 40, color: "#0f172a", lineHeight: 1 }}>
          {item.kana}
        </span>
      </div>

      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: isMobile ? 11 : 13, color: "#64748b", textTransform: "lowercase", letterSpacing: "0.05em" }}>
        {item.romaji}
      </p>
    </motion.div>
  )
}

interface KanaLearnProps {
  activeTab: "Hiragana" | "Katakana"
  isMobile: boolean
  sections: { title: string, desc: string, data: KanaItem[] }[]
}

export function KanaLearn({ activeTab, isMobile, sections }: KanaLearnProps) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>
            Learn {activeTab}
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#64748b" }}>
            Click any character to hear its native pronunciation.
          </p>
        </div>
      </div>

      {sections.map((section, sIdx) => (
        <div key={section.title} style={{ marginBottom: 64 }}>
          <div style={{ marginBottom: 24, paddingLeft: 4 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>
              {section.title}
            </h3>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#94a3b8" }}>{section.desc}</p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)",
            gap: isMobile ? 10 : 16,
          }}>
            {section.data.map((item, i) => (
              <KanaCard key={`${sIdx}-${i}`} item={item} index={i} isMobile={isMobile} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
