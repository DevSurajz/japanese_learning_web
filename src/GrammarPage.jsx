import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router-dom"
import { useWindowWidth } from "./hooks.js"
import { grammarData } from "./grammarData.js"

const ExampleItem = React.memo(function ExampleItem({ ex, isMobile }) {
  return (
    <div>
      <p style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontWeight: 400,
        fontSize: isMobile ? 16 : 18,
        color: "#0A0A0A",
        marginBottom: 4,
      }}>{ex.japanese}</p>
      {ex.romaji && (
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 300,
          fontSize: 13,
          color: "rgba(10,10,10,0.4)",
          marginBottom: 2,
        }}>{ex.romaji}</p>
      )}
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300,
        fontSize: isMobile ? 14 : 15,
        color: "rgba(10,10,10,0.6)",
      }}>{ex.english}</p>
    </div>
  )
})

const PracticeItem = React.memo(function PracticeItem({ prac, index }) {
  return (
    <details style={{
      background: "#FAFAFA",
      border: "1px solid rgba(10,10,10,0.06)",
      padding: "12px 16px",
      borderRadius: 4,
      cursor: "pointer",
    }}>
      <summary style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        fontWeight: 400,
        fontSize: 15,
        color: "#0A0A0A",
        outline: "none",
        listStyle: "none",
      }}>
        <span style={{ fontSize: 13, marginRight: 8, color: "rgba(10,10,10,0.3)" }}>Q{index + 1}.</span>
        {prac.question}
      </summary>
      <div style={{
        marginTop: 12,
        paddingTop: 12,
        borderTop: "1px dashed rgba(10,10,10,0.1)",
      }}>
        <p style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontWeight: 400,
          fontSize: 15,
          color: "#10b981",
        }}>A: {prac.answer}</p>
        {prac.hint && (
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300,
            fontSize: 12,
            color: "rgba(10,10,10,0.4)",
            marginTop: 4,
          }}>Hint: {prac.hint}</p>
        )}
      </div>
    </details>
  )
})

const GrammarItem = React.memo(function GrammarItem({ item }) {
  const width = useWindowWidth()
  const isMobile = width < 768
  const [showHeavy, setShowHeavy] = useState(false)

  useEffect(() => {
    let handle;
    if (typeof window.requestIdleCallback !== 'undefined') {
      handle = window.requestIdleCallback(() => setShowHeavy(true), { timeout: 1000 })
    } else {
      handle = setTimeout(() => setShowHeavy(true), 200)
    }
    return () => {
      if (typeof window.cancelIdleCallback !== 'undefined' && window.requestIdleCallback) window.cancelIdleCallback(handle)
      else clearTimeout(handle)
    }
  }, [])

  return (
    <div style={{
      marginBottom: 48,
      paddingBottom: 48,
      borderBottom: "1px solid rgba(10,10,10,0.06)",
    }}>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: isMobile ? 22 : 28,
        color: "#0A0A0A",
        marginBottom: 16,
        lineHeight: 1.2,
      }}>{item.title}</h3>
      
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300,
        fontSize: isMobile ? 14 : 16,
        color: "rgba(10,10,10,0.6)",
        lineHeight: 1.7,
        marginBottom: 24,
        whiteSpace: "pre-line",
      }}>{item.explanation}</p>

      {item.structure && (
        <div style={{
          background: "rgba(10,10,10,0.02)",
          border: "1px solid rgba(10,10,10,0.06)",
          borderRadius: 6,
          padding: "16px 20px",
          marginBottom: 32,
        }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(10,10,10,0.4)",
            marginBottom: 8,
          }}>Structure</p>
          <p style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 400,
            fontSize: isMobile ? 15 : 18,
            color: "#0A0A0A",
            lineHeight: 1.5,
            whiteSpace: "pre-line",
          }}>{item.structure}</p>
        </div>
      )}

      {showHeavy && item.examples && item.examples.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(10,10,10,0.4)",
            marginBottom: 16,
          }}>Examples</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {item.examples.map((ex, i) => (
              <ExampleItem key={i} ex={ex} isMobile={isMobile} />
            ))}
          </div>
        </div>
      )}

      {item.notes && (
        <div style={{
          borderLeft: "2px solid rgba(10,10,10,0.2)",
          paddingLeft: 16,
          marginBottom: 32,
        }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: "rgba(10,10,10,0.6)",
            lineHeight: 1.6,
          }}><span style={{fontWeight: 600, color: "#0A0A0A"}}>Note:</span> {item.notes}</p>
        </div>
      )}

      {showHeavy && item.practice && item.practice.length > 0 && (
        <div>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(10,10,10,0.4)",
            marginBottom: 16,
          }}>Practice</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {item.practice.map((prac, i) => (
              <PracticeItem key={i} prac={prac} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

const LessonCard = React.memo(function LessonCard({ lessonData, index }) {
  const width = useWindowWidth()
  const isMobile = width < 768
  const [isOpen, setIsOpen] = useState(false)
  const [grammarItems, setGrammarItems] = useState(null)

  useEffect(() => {
    let mounted = true
    if (isOpen && !grammarItems) {
      lessonData.loadGrammar().then((mod) => {
        if (mounted) setGrammarItems(mod.default || mod)
      })
    }
    return () => { mounted = false }
  }, [isOpen, grammarItems, lessonData])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        border: "1px solid rgba(10,10,10,0.08)",
        background: "#FAFAFA",
        marginBottom: 24,
        overflow: "hidden",
      }}
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: isMobile ? "24px 20px" : "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          background: isOpen ? "rgba(10,10,10,0.02)" : "transparent",
          transition: "background 0.3s ease",
        }}
      >
        <div>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(10,10,10,0.4)",
            marginBottom: 8,
          }}>{lessonData.lesson.toUpperCase()}</p>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: isMobile ? 24 : 32,
              color: "#0A0A0A",
              lineHeight: 1,
            }}>{lessonData.lessonTitle || lessonData.lesson}</h2>
            {lessonData.lessonJapanese && (
              <span style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 300,
                fontSize: isMobile ? 18 : 22,
                color: "rgba(10,10,10,0.3)",
              }}>
                {lessonData.lessonJapanese}
              </span>
            )}
          </div>
        </div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 300,
          fontSize: 24,
          color: "rgba(10,10,10,0.3)",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}>+</div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              padding: isMobile ? "32px 20px 0" : "48px 64px 0",
              borderTop: "1px solid rgba(10,10,10,0.04)",
              background: "#FFF",
            }}>
              {!grammarItems ? (
                <div style={{ padding: "40px", textAlign: "center", color: "rgba(10,10,10,0.3)", fontFamily: "'Space Grotesk', sans-serif" }}>Loading...</div>
              ) : (
                grammarItems.map((item, idx) => (
                  <GrammarItem key={idx} item={item} />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

function GrammarHero() {
  const width = useWindowWidth()
  const isMobile = width < 768

  return (
    <section
      style={{
        padding: isMobile ? "80px 24px 60px" : "120px 48px 80px",
        background: "#FAFAFA",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
      }}
    >
      <div style={{ maxWidth: 800 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex", gap: 16, alignItems: "center",
            marginBottom: 40,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300, fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(10,10,10,0.4)",
          }}
        >
          <span>JLPT N5 → N1</span>
          <span style={{ color: "rgba(10,10,10,0.15)" }}>／</span>
          <span>文法</span>
          <span style={{ color: "rgba(10,10,10,0.15)" }}>／</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300, lineHeight: 1.0,
            fontSize: "clamp(64px, 10vw, 120px)",
            color: "#0A0A0A",
            marginBottom: 32,
          }}
        >
          <span style={{ display: "block", fontStyle: "italic" }}>Master</span>
          <span style={{ display: "block", fontWeight: 600, fontStyle: "normal" }}>Japanese Grammar.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300, fontSize: 16,
            lineHeight: 1.8, color: "rgba(10,10,10,0.55)",
            maxWidth: 480,
          }}
        >
          Structured lessons from beginner to advanced. Clear explanations, practical examples, and essential patterns to build your fluency.
        </motion.p>
      </div>
    </section>
  )
}

function Footer() {
  const width = useWindowWidth()
  const isMobile = width < 768

  return (
    <footer style={{
      padding: isMobile ? "40px 24px" : "40px 48px",
      background: "#FAFAFA",
      borderTop: "1px solid rgba(10,10,10,0.06)",
      display: "flex", alignItems: isMobile ? "flex-start" : "center", 
      justifyContent: isMobile ? "center" : "space-between",
      flexDirection: isMobile ? "column" : "row", gap: isMobile ? 24 : 0,
    }}>
      <div style={{
        display: "flex", gap: 12, alignItems: "center",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300, fontSize: 11, color: "rgba(10,10,10,0.5)",
      }}>
        <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100 }}>日本語</span>
        <span>NihongoPath</span>
      </div>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300, fontSize: 11, color: "rgba(10,10,10,0.5)", letterSpacing: "0.05em",
        textAlign: isMobile ? "left" : "right"
      }}>
        © 2026&nbsp;&nbsp;·&nbsp;&nbsp;JLPT N5–N1&nbsp;&nbsp;·&nbsp;&nbsp;Made with 愛
      </p>
    </footer>
  )
}

export default function GrammarPage() {
  const navigate = useNavigate()
  const width = useWindowWidth()
  const isMobile = width < 768

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        minHeight: "100vh",
        background: "#FAFAFA",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(250,250,250,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(10,10,10,0.08)",
        padding: isMobile ? "10px 16px" : "16px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "nowrap", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, overflow: "hidden" }}>
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100, fontSize: isMobile ? 13 : 18, color: "rgba(10,10,10,0.4)", whiteSpace: "nowrap" }}>日本語</span>
          <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 300, color: "#0A0A0A", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>NihongoPath</span>
          <span style={{ display: isMobile ? "none" : "inline", color: "rgba(10,10,10,0.15)", fontSize: 13 }}>/</span>
          <span style={{ display: isMobile ? "none" : "inline", fontSize: 11, color: "rgba(10,10,10,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400, whiteSpace: "nowrap" }}>Grammar Reference</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/')}
          style={{
            background: "#0A0A0A", color: "#FAFAFA",
            border: "none", borderRadius: 99,
            padding: isMobile ? "6px 12px" : "8px 20px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isMobile ? 10 : 11, fontWeight: 300,
            letterSpacing: "0.12em", textTransform: "uppercase",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
            whiteSpace: "nowrap",
          }}
        >
          ← {isMobile ? "Back" : "Back to Home"}
        </motion.button>
      </div>

      <GrammarHero />

      <section style={{ padding: isMobile ? "40px 24px 80px" : "80px 48px 120px", maxWidth: 1000, margin: "0 auto" }}>
        {grammarData.map((lessonData, index) => (
          <LessonCard key={index} lessonData={lessonData} index={index} />
        ))}
      </section>
      
      <Footer />
    </motion.div>
  )
}
