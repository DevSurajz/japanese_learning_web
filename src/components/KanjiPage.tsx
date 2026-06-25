"use client"

import { useDeferredValue, useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useRouter } from "next/navigation"
import { kanjiData } from "@/kanjiData"
import { useViewport } from "@/hooks"
import SpeakButton from "@/components/SpeakButton"
import StrokeOrderViewer from "@/components/kanji/StrokeOrderViewer"

const CARDS_PER_PAGE = 20

function KanjiModal({ item, onClose, isMobile }: { item: any; onClose: () => void; isMobile: boolean }) {
  const [activeTab, setActiveTab] = useState<'info' | 'stroke'>('info')
  useEffect(() => setActiveTab('info'), [item])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="modal-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            padding: isMobile ? 24 : 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 24,
              boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
              width: isMobile ? "90vw" : "100%", maxWidth: 460,
              padding: isMobile ? 24 : 36,
              display: "flex", flexDirection: "column", gap: 24,
              position: "relative",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: 18, right: 18,
                background: "#f1f5f9", border: "none", borderRadius: "50%",
                width: 32, height: 32, cursor: "pointer",
                fontSize: 14, color: "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >✕</button>

            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                position: "relative", width: 110, height: 110, flexShrink: 0,
                border: "2px solid #bfdbfe", borderRadius: 16,
                background: "rgba(239,246,255,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#bfdbfe" }} />
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#bfdbfe" }} />
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100, fontSize: 60, color: "#1e293b", lineHeight: 1, position: "relative" }}>
                  {item.kanji}
                </span>
              </div>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>
                  {item.meaning}
                </h2>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                  {item.strokes} strokes
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {Array.from({ length: item.strokes }).map((_, i) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04, duration: 0.2 }}
                      style={{ width: 8, height: 8, borderRadius: "50%", background: "#93c5fd" }} />
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: 4,
              borderBottom: '1px solid #f0f0f0',
              marginBottom: 16,
            }}>
              {(['info', 'stroke'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '6px 16px',
                    fontSize: 12,
                    fontWeight: activeTab === tab ? 600 : 400,
                    color: activeTab === tab ? '#3730a3' : '#94a3b8',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === tab ? '2px solid #3730a3' : '2px solid transparent',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {tab === 'info' ? 'Info' : 'Stroke Order'}
                </button>
              ))}
            </div>

            {activeTab === 'info' && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { label: "On'yomi", data: item.onyomi, bg: "#eef2ff", pillBg: "#c7d2fe", pillText: "#3730a3", labelColor: "#818cf8" },
                    { label: "Kun'yomi", data: item.kunyomi, bg: "#f0fdf4", pillBg: "#bbf7d0", pillText: "#166534", labelColor: "#4ade80" },
                  ].map(({ label, data, bg, pillBg, pillText, labelColor }) => (
                    <div key={label} style={{ background: bg, borderRadius: 16, padding: "16px 18px" }}>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600, color: labelColor, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                        {label}
                      </p>
                      {data.length > 0 ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {data.map((r: string, i: number) => (
                            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: pillBg, color: pillText, borderRadius: 99, padding: "3px 10px", fontSize: 13, fontFamily: "'Noto Sans JP', sans-serif" }}>
                              {r}
                              {r ? <SpeakButton text={r} /> : null}
                            </span>
                          ))}
                        </div>
                      ) : <span style={{ color: "#cbd5e1", fontSize: 13 }}>—</span>}
                    </div>
                  ))}
                </div>

                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600, color: "#cbd5e1", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                    Example Words
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {item.examples.map((ex: string, i: number) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                        style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#93c5fd", marginTop: 6, flexShrink: 0 }} />
                        <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, color: "#475569", lineHeight: 1.6 }}>{ex}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'stroke' && (
              <StrokeOrderViewer kanji={item.kanji} />
            )}

            <motion.button
              whileHover={{ scale: 1.02, background: "#334155" }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "#0f172a", color: "#fff",
                border: "none", borderRadius: 14,
                padding: "15px 24px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400, fontSize: 12,
                letterSpacing: "0.2em", textTransform: "uppercase",
                cursor: "pointer", transition: "background 0.3s",
              }}
            >
              Practice Writing
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function KanjiCard({ item, index, onClick }: { item: any; index: number; onClick: (item: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.42, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -4 }}
      onClick={() => onClick(item)}
      style={{ cursor: "pointer" }}
    >
      <div style={{
        background: "#fff",
        borderRadius: 18,
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        padding: "22px 16px 20px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        height: "100%",
        transition: "box-shadow 0.4s ease",
      }}
        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"}
        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"}
      >
        <div style={{
          position: "relative", width: 90, height: 90,
          border: "2px solid #bfdbfe", borderRadius: 14,
          background: "rgba(239,246,255,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#dbeafe" }} />
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#dbeafe" }} />
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100, fontSize: 46, color: "#1e293b", lineHeight: 1, position: "relative" }}>
            {item.kanji}
          </span>
        </div>

        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13, color: "#334155", textAlign: "center", lineHeight: 1.3 }}>
          {item.meaning}
        </p>

        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: "#cbd5e1", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {item.strokes} strokes
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center" }}>
          {item.onyomi.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#eef2ff", borderRadius: 99, padding: "3px 10px" }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#a5b4fc", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>On</span>
              <span style={{ fontSize: 11, color: "#4338ca", fontFamily: "'Noto Sans JP', sans-serif" }}>{item.onyomi.slice(0, 2).join("・")}</span>
            </div>
          )}
          {item.kunyomi.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#f0fdf4", borderRadius: 99, padding: "3px 10px" }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#86efac", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>Kun</span>
              <span style={{ fontSize: 11, color: "#166534", fontFamily: "'Noto Sans JP', sans-serif" }}>{item.kunyomi.slice(0, 1).join("・")}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function KanjiPage() {
  const router = useRouter()
  const { isMobile, isTablet } = useViewport()

  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<any>(null)
  const [page, setPage] = useState(1)
  const [weakCount, setWeakCount] = useState(0)
  const deferredSearch = useDeferredValue(search)

  useEffect(() => {
    fetch('/api/review/due?filter=weak&type=KANJI')
      .then(r => r.ok ? r.json() : { cards: [] })
      .then(d => setWeakCount(d.cards?.length ?? 0))
      .catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    const q = deferredSearch.toLowerCase()
    if (!q) return kanjiData
    return kanjiData.filter((k: any) =>
      k.kanji.includes(q) ||
      k.meaning.toLowerCase().includes(q) ||
      k.onyomi.some((r: string) => r.includes(q)) ||
      k.kunyomi.some((r: string) => r.includes(q))
    )
  }, [deferredSearch])

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE)
  const paginated = useMemo(
    () => filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE),
    [filtered, page]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        overflowY: "auto",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(248,250,252,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
        padding: isMobile ? "12px 16px" : "16px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "nowrap", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, overflow: "hidden" }}>
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100, fontSize: isMobile ? 14 : 18, color: "#64748b", whiteSpace: "nowrap" }}>日本語</span>
          <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 500, color: "#1e293b", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>NihongoPath</span>
          {!isMobile && <span style={{ color: "#cbd5e1", fontSize: 13 }}>/</span>}
          {!isMobile && <span style={{ fontSize: 11, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap" }}>N5 Kanji</span>}
        </div>
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => router.push('/')}
          style={{
            background: "#0f172a", color: "#fff",
            border: "none", borderRadius: 99,
            padding: isMobile ? "6px 12px" : "8px 20px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isMobile ? 10 : 11, fontWeight: 400,
            letterSpacing: "0.12em", textTransform: "uppercase",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
            whiteSpace: "nowrap",
          }}
        >
          ← Back{isMobile ? "" : " to Home"}
        </motion.button>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "32px 24px 80px" : "56px 48px 80px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#eff6ff", borderRadius: 99,
            padding: "6px 14px", marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.15em", textTransform: "uppercase" }}>JLPT N5</span>
          </div>

          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(40px, 10vw, 64px)", color: "#0f172a", lineHeight: 1.1 }}>
                N5 Kanji
              </h1>
              <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 8, fontWeight: 300 }}>
                Learn stroke order, meaning, and readings — <strong style={{ color: "#475569", fontWeight: 500 }}>{kanjiData.length} kanji</strong> total
              </p>
            </div>

            <div style={{ display: "flex", gap: 0 }}>
              {[
                { value: kanjiData.length, label: "Total" },
                { value: `${page}/${totalPages}`, label: "Page" },
                { value: paginated.length, label: "Showing" },
              ].map(({ value, label }, i) => (
                <div key={label} style={{
                  textAlign: "center",
                  borderTop: "2px solid #0f172a",
                  paddingTop: 10, paddingBottom: 14,
                  paddingLeft: i === 0 ? 0 : 24,
                  paddingRight: i === 2 ? 0 : 24,
                  borderRight: i < 2 ? "1px solid #e2e8f0" : "none",
                  minWidth: 70,
                }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: "#0f172a", lineHeight: 1 }}>{value}</p>
                  <p style={{ fontSize: 9, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", width: "100%", maxWidth: isMobile ? "none" : 420, marginBottom: 48 }}>
            <input
              type="text"
              placeholder="Search kanji, meaning, or reading…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              style={{
                width: "100%",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "12px 16px 12px 42px",
                fontSize: 14, color: "#334155",
                fontFamily: "'Space Grotesk', sans-serif",
                outline: "none",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onFocus={e => { e.target.style.borderColor = "#a5b4fc"; e.target.style.boxShadow = "0 0 0 3px rgba(165,180,252,0.15)" }}
              onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)" }}
            />
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#cbd5e1" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Review weak kanji shortcut */}
        {weakCount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 32 }}>
            <a
              href="/review?filter=weak&type=KANJI"
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
              Review {weakCount} weak {weakCount === 1 ? 'kanji' : 'kanji'}
            </a>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={page + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            {paginated.length > 0 ? paginated.map((item: any, i: number) => (
              <KanjiCard key={item.kanji} item={item} index={i} onClick={setSelected} />
            )) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "64px 0", color: "#cbd5e1", fontSize: 16 }}>
                No kanji found for &quot;{search}&quot;
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "space-between" : "center", gap: 8, marginTop: 56, width: "100%" }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: "8px 18px", borderRadius: 99, border: "1px solid #e2e8f0",
                background: "#fff", fontSize: 13, color: "#64748b",
                cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1,
                fontFamily: "'Space Grotesk', sans-serif",
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
                    width: 36, height: 36, borderRadius: "50%",
                    border: "1px solid",
                    borderColor: pg === page ? "#0f172a" : "#e2e8f0",
                    background: pg === page ? "#0f172a" : "#fff",
                    color: pg === page ? "#fff" : "#64748b",
                    fontSize: 13, cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>{pg}</motion.button>
              ))
            )}

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: "8px 18px", borderRadius: 99, border: "1px solid #e2e8f0",
                background: "#fff", fontSize: 13, color: "#64748b",
                cursor: page === totalPages ? "not-allowed" : "pointer",
                opacity: page === totalPages ? 0.4 : 1,
                fontFamily: "'Space Grotesk', sans-serif",
              }}>Next →</motion.button>
          </div>
        )}
      </div>

      <KanjiModal item={selected} onClose={() => setSelected(null)} isMobile={isMobile} />
    </motion.div>
  )
}
