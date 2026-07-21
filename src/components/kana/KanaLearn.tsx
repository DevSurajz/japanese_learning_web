"use client"

import { motion } from "motion/react"
import { KanaItem } from "./data"
import { playKanaAudio } from "./audio"

import SpeakButton from "@/components/SpeakButton"

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
        background: "var(--bg-card)",
        borderRadius: isMobile ? 12 : 16,
        border: "1px solid var(--border-color)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
        padding: isMobile ? "10px 6px" : "20px 14px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: isMobile ? 6 : 10,
        height: "100%",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease",
        position: "relative",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.04)"}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.01)"}
    >
      <div style={{ position: "absolute", top: 8, right: 8 }}>
        {item.kana ? <SpeakButton text={item.kana ?? ''} /> : null}
      </div>

      <div style={{
        position: "relative", width: isMobile ? 52 : 72, height: isMobile ? 52 : 72,
        borderRadius: isMobile ? 10 : 12,
        background: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "var(--font-noto-sans-jp)", fontWeight: 300, fontSize: isMobile ? 28 : 40, color: "var(--text-primary)", lineHeight: 1 }}>
          {item.kana}
        </span>
      </div>

      <p style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: isMobile ? 11 : 13, color: "var(--text-secondary)", textTransform: "lowercase", letterSpacing: "0.05em" }}>
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
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 24, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
            Learn {activeTab}
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--text-secondary)" }}>
            Click any character to hear its native pronunciation.
          </p>
        </div>
      </div>

      {sections.map((section, sIdx) => (
        <div key={section.title} style={{ marginBottom: 64 }}>
          <div style={{ marginBottom: 24, paddingLeft: 4 }}>
            <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: 28, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
              {section.title}
            </h3>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--text-secondary)" }}>{section.desc}</p>
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
