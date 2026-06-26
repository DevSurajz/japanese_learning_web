"use client"

import React, { useDeferredValue, useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useRouter } from "next/navigation"
import { vocabData } from "@/vocabData"
import { useViewport } from "@/hooks"
import SpeakButton from "@/components/SpeakButton"

const PER_PAGE = 25

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Pronoun": { bg: "#eff6ff", text: "#3b82f6", border: "#bfdbfe" },
  "Demonstrative": { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" },
  "Expression": { bg: "#fef3c7", text: "#d97706", border: "#fde68a" },
  "Noun": { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" },
  "Noun (Color)": { bg: "#fff1f2", text: "#e11d48", border: "#fecdd3" },
  "Noun (Position)": { bg: "#ecfdf5", text: "#059669", border: "#a7f3d0" },
  "Verb, Godan": { bg: "#fff7ed", text: "#ea580c", border: "#fed7aa" },
  "Verb, Ichidan": { bg: "#fef9ee", text: "#ca8a04", border: "#fde68a" },
  "Verb, Irregular": { bg: "#fdf2f8", text: "#9333ea", border: "#e9d5ff" },
  "i-Adjective": { bg: "#f0f9ff", text: "#0284c7", border: "#bae6fd" },
  "na-Adjective": { bg: "#fdf4ff", text: "#a21caf", border: "#f0abfc" },
  "Adverb": { bg: "#f8fafc", text: "#475569", border: "#cbd5e1" },
  "Conjunction": { bg: "#fefce8", text: "#854d0e", border: "#fef08a" },
}

function TypeBadge({ type }: { type: string }) {
  const c = TYPE_COLORS[type] || { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0" }
  return (
    <span style={{
      background: c.bg, color: c.text,
      border: `1px solid ${c.border}`,
      borderRadius: 99, padding: "2px 9px",
      fontSize: 11, fontWeight: 500,
      fontFamily: "'Space Grotesk', sans-serif",
      whiteSpace: "nowrap",
    }}>{type}</span>
  )
}

const VocabCard = React.memo(function VocabCard({ word, index, isMobile }: { word: Record<string, any>; index: number; isMobile: boolean }) {
  return isMobile ? (
    <motion.div
      key={word.id}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.012, duration: 0.2 }}
      style={{
        background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12,
        padding: "14px 16px", marginBottom: 8,
        display: "flex", flexDirection: "column", gap: 4,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 20, color: "#1e293b", fontWeight: 400 }}>{word.kana}</span>
          {word.kana ? <SpeakButton text={word.kana} /> : null}
        </div>
        <TypeBadge type={word.type} />
      </div>
      <span style={{ fontFamily: "'Space Grotesk'", fontSize: 12, color: "#64748b" }}>{word.romaji} / {word.reading}</span>
      <span style={{ fontFamily: "'Space Grotesk'", fontSize: 13, color: "#334155" }}>{word.meaning}</span>
    </motion.div>
  ) : (
    <motion.div
      key={word.id}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.012, duration: 0.2 }}
      style={{
        display: "grid",
        gridTemplateColumns: "52px 1fr 1fr 160px 1fr",
        borderBottom: "1px solid #f1f5f9",
        background: index % 2 === 0 ? "#fff" : "#fafbfc",
        transition: "background 0.15s",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#f0f9ff"}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = index % 2 === 0 ? "#fff" : "#fafbfc"}
    >
      <div style={{ padding: "12px 16px", fontSize: 12, color: "#94a3b8", fontWeight: 500, borderRight: "1px solid #f1f5f9", display: "flex", alignItems: "center" }}>{word.id}</div>
      <div style={{ padding: "12px 16px", borderRight: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "'Noto Sans JP'", fontWeight: 300, fontSize: 18, color: "#1e293b" }}>{word.kana}</span>
        {word.kana ? <SpeakButton text={word.kana} /> : null}
      </div>
      <div style={{ padding: "12px 16px", borderRight: "1px solid #f1f5f9", display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
        <span style={{ fontSize: 13, color: "#475569", fontWeight: 400 }}>{word.romaji}</span>
        <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 12, color: "#94a3b8", fontWeight: 100 }}>{word.reading}</span>
      </div>
      <div style={{ padding: "12px 16px", borderRight: "1px solid #f1f5f9", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <TypeBadge type={word.type} />
      </div>
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}>{word.meaning}</span>
      </div>
    </motion.div>
  )
})

export default function VocabPage() {
  const router = useRouter()
  const { isMobile } = useViewport()

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState("id")
  const [sortDir, setSortDir] = useState(1)
  const [typeFilter, setTypeFilter] = useState("All")
  const [weakCount, setWeakCount] = useState(0)
  const deferredSearch = useDeferredValue(search)

  useEffect(() => {
    fetch('/api/review/due?filter=weak&type=VOCAB')
      .then(r => r.ok ? r.json() : { cards: [] })
      .then(d => setWeakCount(d.cards?.length ?? 0))
      .catch(() => { })
  }, [])

  const allTypes = useMemo(() => {
    const s = new Set(vocabData.map((w: Record<string, any>) => w.type))
    return ["All", ...Array.from(s).sort()]
  }, [])

  const filtered = useMemo(() => {
    const q = deferredSearch.toLowerCase().trim()
    return vocabData
      .filter((w: Record<string, any>) => {
        const typeOk = typeFilter === "All" || w.type === typeFilter
        if (!typeOk) return false
        if (!q) return true
        return (
          w.kana.toLowerCase().includes(q) ||
          w.romaji.toLowerCase().includes(q) ||
          w.reading.includes(q) ||
          w.meaning.toLowerCase().includes(q)
        )
      })
      .sort((a: Record<string, any>, b: Record<string, any>) => {
        const va = a[sortKey], vb = b[sortKey]
        if (sortKey === "id") return sortDir * (va - vb)
        return sortDir * String(va).localeCompare(String(vb), "ja")
      })
  }, [deferredSearch, sortKey, sortDir, typeFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const pageData = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  )

  const handleSearch = (v: string) => { setSearch(v); setPage(1) }
  const handleType = (v: string) => { setTypeFilter(v); setPage(1) }
  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => -d)
    else { setSortKey(key); setSortDir(1) }
    setPage(1)
  }
  const sortIcon = (key: string) => sortKey === key ? (sortDir === 1 ? " ↑" : " ↓") : ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        overflowY: "auto",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(248,250,252,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
        padding: isMobile ? "12px 16px" : "14px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "nowrap", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
          <span style={{ fontFamily: "'Noto Sans JP'", fontWeight: 100, fontSize: isMobile ? 14 : 18, color: "#64748b", whiteSpace: "nowrap" }}>日本語</span>
          <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 500, color: "#1e293b", whiteSpace: "nowrap" }}>NihongoPath</span>
          {!isMobile && <span style={{ color: "#cbd5e1" }}>/</span>}
          {!isMobile && <span style={{ fontSize: 11, color: "#8b5cf6", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap" }}>N5 Vocabulary</span>}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/')}
          style={{
            background: "#0f172a", color: "#fff", border: "none",
            borderRadius: 99, padding: isMobile ? "6px 12px" : "8px 20px",
            fontSize: isMobile ? 10 : 11, fontWeight: 400, letterSpacing: "0.12em",
            textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap",
          }}
        >← Back{isMobile ? "" : " to Home"}</motion.button>
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: isMobile ? "32px 24px 80px" : "48px 48px 80px" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#f5f3ff", borderRadius: 99, padding: "5px 14px", marginBottom: 16,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6", display: "inline-block" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#7c3aed", letterSpacing: "0.15em", textTransform: "uppercase" }}>JLPT N5</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(36px,8vw,56px)", color: "#0f172a", lineHeight: 1.1 }}>
                N5 Vocabulary
              </h1>
              <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 6, fontWeight: 300 }}>
                Complete JLPT N5 word list — <strong style={{ color: "#475569" }}>{vocabData.length} words</strong> · showing <strong style={{ color: "#475569" }}>{filtered.length}</strong>
              </p>
            </div>
            <div style={{ display: "flex", gap: 0 }}>
              {[
                { label: "Total", value: vocabData.length },
                { label: "Page", value: `${page}/${totalPages}` },
                { label: "Showing", value: filtered.length },
              ].map(({ label, value }, i) => (
                <div key={label} style={{
                  textAlign: "center",
                  borderTop: "2px solid #0f172a",
                  paddingTop: 10, paddingBottom: 14,
                  paddingLeft: i === 0 ? 0 : 24,
                  paddingRight: i === 2 ? 0 : 24,
                  borderRight: i < 2 ? "1px solid #e2e8f0" : "none",
                  minWidth: 70,
                }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 600, color: "#0f172a", lineHeight: 1 }}>{value}</p>
                  <p style={{ fontSize: 9, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 10 : 12, flexWrap: "wrap", marginBottom: 28 }}>
            <div style={{ position: "relative", flexGrow: 1, width: isMobile ? "100%" : "auto", maxWidth: isMobile ? "none" : 380 }}>
              <input
                type="text" placeholder="Search kana, romaji, or meaning…"
                value={search} onChange={e => handleSearch(e.target.value)}
                style={{
                  width: "100%", background: "#fff",
                  border: "1px solid #e2e8f0", borderRadius: 10,
                  padding: "10px 14px 10px 38px",
                  fontSize: 13, color: "#334155",
                  fontFamily: "'Space Grotesk', sans-serif", outline: "none",
                }}
                onFocus={e => e.target.style.borderColor = "#c4b5fd"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
              <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#c4b5fd" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={typeFilter} onChange={e => handleType(e.target.value)}
              style={{
                width: isMobile ? "100%" : "auto",
                background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10,
                padding: "10px 14px", fontSize: 12, color: "#475569",
                fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer", outline: "none",
              }}
            >
              {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </motion.div>

        {/* Review weak vocab shortcut */}
        {weakCount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 28 }}>
            <a
              href="/review?filter=weak&type=VOCAB"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff7ed', border: '1px solid #fed7aa',
                color: '#c2410c', padding: '8px 20px', borderRadius: 99,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', textDecoration: 'none',
              }}
            >
              <span>⚠</span>
              Review {weakCount} weak {weakCount === 1 ? 'word' : 'words'}
            </a>
          </div>
        )}

        <div style={{ background: isMobile ? "transparent" : "#fff", borderRadius: 16, border: isMobile ? "none" : "1px solid #e2e8f0", overflow: "hidden", boxShadow: isMobile ? "none" : "0 1px 6px rgba(0,0,0,0.04)" }}>
          {!isMobile && (
            <div style={{
              position: "sticky", top: 72, zIndex: 5,
              display: "grid",
              gridTemplateColumns: "52px 1fr 1fr 160px 1fr",
              background: "#f8fafc",
              borderBottom: "2px solid #e2e8f0",
            }}>
              {[
                { key: "id", label: "#" },
                { key: "kana", label: "Kana / Written" },
                { key: "romaji", label: "Romaji / Reading" },
                { key: null, label: "Type" },
                { key: "meaning", label: "Meaning" },
              ].map(({ key, label }, i) => (
                <div
                  key={label}
                  onClick={key ? () => handleSort(key) : undefined}
                  style={{
                    padding: "12px 16px",
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "#64748b",
                    cursor: key ? "pointer" : "default",
                    userSelect: "none",
                    borderRight: i < 4 ? "1px solid #e2e8f0" : "none",
                    display: "flex", alignItems: "center", gap: 4,
                  }}
                >
                  {label}{key ? sortIcon(key) : ""}
                </div>
              ))}
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div key={page + search + sortKey + typeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {pageData.length > 0 ? pageData.map((w: Record<string, any>, i: number) => (
                <VocabCard key={w.id} word={w} index={i} isMobile={isMobile} />
              )) : (
                <div style={{ padding: "48px 0", textAlign: "center", color: "#cbd5e1", fontSize: 15 }}>
                  No results for &quot;{search}&quot;
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "space-between" : "center", gap: 6, marginTop: 36, width: "100%" }}>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{
                padding: "8px 16px", borderRadius: 99, border: "1px solid #e2e8f0",
                background: "#fff", fontSize: 12, color: "#64748b",
                cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1,
                fontFamily: "'Space Grotesk'",
              }}>← Prev</motion.button>

            {isMobile ? (
              <span style={{ fontFamily: "'Space Grotesk'", fontSize: 13, color: "#475569", fontWeight: 500 }}>
                {page} / {totalPages}
              </span>
            ) : (
              Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                <motion.button key={pg} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setPage(pg)}
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    border: "1px solid", borderColor: pg === page ? "#8b5cf6" : "#e2e8f0",
                    background: pg === page ? "#8b5cf6" : "#fff",
                    color: pg === page ? "#fff" : "#64748b",
                    fontSize: 12, cursor: "pointer",
                    fontFamily: "'Space Grotesk'",
                  }}>{pg}</motion.button>
              ))
            )}

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{
                padding: "8px 16px", borderRadius: 99, border: "1px solid #e2e8f0",
                background: "#fff", fontSize: 12, color: "#64748b",
                cursor: page === totalPages ? "not-allowed" : "pointer",
                opacity: page === totalPages ? 0.4 : 1,
                fontFamily: "'Space Grotesk'",
              }}>Next →</motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
