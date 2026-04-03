import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react"
import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Noto+Sans+JP:wght@100;300;400&family=Space+Grotesk:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #FAFAFA; color: #0A0A0A; overflow-x: hidden; }
    ::selection { background: #0A0A0A; color: #FAFAFA; }
  `}</style>
)
function Navbar({ scrollY }) {
  const bg = useTransform(scrollY, [0, 80], ["rgba(250,250,250,0)", "rgba(250,250,250,1)"])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const textColor = "#0A0A0A"

  return (
    <motion.nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 48px",
        background: bg,
        borderBottom: borderOpacity.get() > 0.01 ? "1px solid rgba(0,0,0,0.08)" : "none",
      }}
    >
      
      <motion.div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <motion.span
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 100, fontSize: 22,
            color: textColor, letterSpacing: "0.05em",
          }}
        >日本語</motion.span>
        <motion.span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300, fontSize: 13,
            color: textColor, letterSpacing: "0.12em",
          }}
        >NihongoPath</motion.span>
      </motion.div>

      
      <motion.div style={{ display: "flex", gap: 40 }}>
        {[
          { label: "KANJI", to: "/kanji" },
          { label: "GRAMMAR", to: "#" },
          { label: "VOCABULARY", to: "/vocab" },
          { label: "KANA", to: "/kana" },
        ].map(({ label, to }) =>
          to.startsWith("/") ? (
            <Link
              key={label}
              to={to}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                textDecoration: "none", cursor: "pointer",
                color: "inherit",
              }}
            >
              <motion.span style={{ color: textColor }} whileHover={{ opacity: 0.5 }} transition={{ duration: 0.2 }}>
                {label}
              </motion.span>
            </Link>
          ) : (
            <motion.a
              key={label}
              href="#"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 11,
                letterSpacing: "0.18em", textDecoration: "none",
                color: textColor, cursor: "pointer",
              }}
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.a>
          )
        )}
      </motion.div>

      
      <Link to="/kana" style={{ textDecoration: "none" }}>
        <motion.button
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "#0A0A0A", color: "#FAFAFA",
            border: "none", borderRadius: 0,
            padding: "10px 20px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300, fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          START KANA →
        </motion.button>
      </Link>
    </motion.nav>
  )
}
function Hero({ scrollY }) {
  const kanjiY = useTransform(scrollY, [0, 600], [0, -120])
  const kanjiOpacity = useTransform(scrollY, [0, 400], [0.06, 0])
  const springY = useSpring(kanjiY, { stiffness: 80, damping: 20 })

  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [counts, setCounts] = useState({ kanji: 0, grammar: 0, vocab: 0 })

  useEffect(() => {
    if (!inView) return
    const targets = { kanji: 80, grammar: 23, vocab: 800 }
    const duration = 2000
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCounts({
        kanji: Math.round(targets.kanji * ease),
        grammar: Math.round(targets.grammar * ease),
        vocab: Math.round(targets.vocab * ease),
      })
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView])

  return (
    <section
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px 48px 80px", position: "relative", overflow: "hidden",
        background: "#FAFAFA",
      }}
    >
      
      <motion.div
        style={{
          position: "absolute", right: "8%", top: "50%",
          transform: "translateY(-50%)",
          y: springY, opacity: kanjiOpacity,
          fontFamily: "'Noto Sans JP', sans-serif",
          fontWeight: 100, fontSize: "clamp(280px, 30vw, 480px)",
          color: "#0A0A0A", lineHeight: 1, userSelect: "none",
          pointerEvents: "none",
        }}
      >語</motion.div>

      <div style={{ maxWidth: 680, position: "relative", zIndex: 1 }}>
        
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
          <span>始める</span>
          <span style={{ color: "rgba(10,10,10,0.15)" }}>／</span>
          <span>2024</span>
        </motion.div>

        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300, lineHeight: 1.0,
            fontSize: "clamp(64px, 9vw, 140px)",
            color: "#0A0A0A",
            marginBottom: 32,
          }}
        >
          <span style={{ display: "block", fontStyle: "italic" }}>Master</span>
          <span style={{ display: "block", fontWeight: 600, fontStyle: "normal" }}>Japanese.</span>
          <span style={{ display: "block", fontStyle: "italic" }}>Perfectly.</span>
        </motion.h1>

        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300, fontSize: 15,
            lineHeight: 1.8, color: "rgba(10,10,10,0.55)",
            maxWidth: 440, marginBottom: 56,
          }}
        >
          From absolute beginner to advanced. Structured JLPT N5 curriculum with
          Kanji, Grammar, and Vocabulary — built to take you further.
        </motion.p>

        
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ display: "flex", gap: 0 }}
        >
          {[
            { value: counts.kanji, suffix: "", label: "N5 KANJI" },
            { value: counts.grammar, suffix: "", label: "GRAMMAR POINTS" },
            { value: counts.vocab, suffix: "+", label: "VOCABULARY WORDS" },
          ].map(({ value, suffix, label }, i) => (
            <div
              key={label}
              style={{
                borderTop: "2px solid #0A0A0A",
                paddingTop: 16, paddingBottom: 24,
                paddingLeft: i === 0 ? 0 : 32,
                paddingRight: i === 2 ? 0 : 32,
                borderRight: i < 2 ? "1px solid rgba(10,10,10,0.12)" : "none",
              }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600, fontSize: "clamp(40px, 5vw, 60px)",
                color: "#0A0A0A", lineHeight: 1,
              }}>
                {value}{suffix}
              </p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 9,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(10,10,10,0.35)", marginTop: 8,
              }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute", bottom: 40, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 300, fontSize: 9,
          letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(10,10,10,0.3)",
        }}
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 40, background: "rgba(10,10,10,0.2)" }}
        />
      </motion.div>
    </section>
  )
}
function MarqueeStrip() {
  const words = ["語学", "KANJI", "文法", "GRAMMAR", "語彙", "VOCABULARY", "日本語", "NIHONGO", "N5→N1", "学習"]
  return (
    <div style={{
      overflow: "hidden", borderTop: "1px solid rgba(10,10,10,0.08)",
      borderBottom: "1px solid rgba(10,10,10,0.08)",
      padding: "18px 0", background: "#FAFAFA",
    }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 64, whiteSpace: "nowrap", width: "max-content" }}
      >
        {[...words, ...words].map((w, i) => (
          <span key={i} style={{
            fontFamily: i % 2 === 0 ? "'Noto Sans JP'" : "'Space Grotesk'",
            fontWeight: i % 2 === 0 ? 100 : 300,
            fontSize: 13, letterSpacing: "0.2em",
            color: "rgba(10,10,10,0.25)",
            textTransform: "uppercase",
          }}>{w}</span>
        ))}
      </motion.div>
    </div>
  )
}
function FeatureCards({ scrollY }) {
  const cards = [
    {
      ja: "漢字", en: "KANJI", num: "01",
      desc: "80 essential N5 characters. Master stroke order, readings, and meaning through spaced repetition.",
      offset: 0,
      link: "/kanji",
    },
    {
      ja: "文法", en: "GRAMMAR", num: "02",
      desc: "23 core grammar patterns. From particles to verb conjugations — structured, clear, complete.",
      offset: 80,
      link: null,
    },
    {
      ja: "語彙", en: "VOCABULARY", num: "03",
      desc: "800+ words essential for JLPT N5. Grouped by topic with example sentences and audio.",
      offset: 160,
      link: "/vocab",
    },
  ]

  return (
    <section style={{ padding: "120px 48px", background: "#FAFAFA" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: 72 }}
      >
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
          fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(10,10,10,0.3)", marginBottom: 16,
        }}>The curriculum.</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontWeight: 300, fontSize: "clamp(36px,5vw,64px)",
          color: "#0A0A0A", lineHeight: 1.05,
        }}>Three pillars of fluency.</h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {cards.map(({ ja, en, num, desc, offset, link }, i) => {
          const cardY = useTransform(scrollY, [300, 900], [offset, 0])
          const springCardY = useSpring(cardY, { stiffness: 80, damping: 20 })
          return (
            <motion.div
              key={en}
              style={{ y: springCardY }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                style={{
                  border: "1px solid rgba(10,10,10,0.08)",
                  padding: "48px 40px 56px",
                  position: "relative", overflow: "hidden",
                  cursor: link ? "pointer" : "default",
                }}
              >
                
                <motion.div
                  style={{
                    position: "absolute", bottom: -20, right: 24,
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontWeight: 100, color: "rgba(10,10,10,0.03)",
                    lineHeight: 1, userSelect: "none", pointerEvents: "none",
                  }}
                  initial={{ fontSize: 120 }}
                  whileHover={{ fontSize: 160 }}
                  transition={{ duration: 0.5 }}
                >{ja}</motion.div>

                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
                  fontSize: 10, letterSpacing: "0.25em",
                  color: "rgba(10,10,10,0.25)", marginBottom: 48,
                }}>{num}</p>

                <p style={{
                  fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100,
                  fontSize: 40, color: "rgba(10,10,10,0.6)",
                  marginBottom: 8, lineHeight: 1,
                }}>{ja}</p>

                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
                  fontSize: 11, letterSpacing: "0.2em",
                  color: "#0A0A0A", marginBottom: 28,
                }}>{en}</p>

                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
                  fontSize: 13, lineHeight: 1.8,
                  color: "rgba(10,10,10,0.45)", marginBottom: 40,
                }}>{desc}</p>

                {link ? (
                  <Link
                    to={link}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
                      fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "#0A0A0A", textDecoration: "none",
                      borderBottom: "1px solid rgba(10,10,10,0.3)",
                      paddingBottom: 2,
                    }}
                  >EXPLORE →</Link>
                ) : (
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
                    fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "rgba(10,10,10,0.3)",
                    borderBottom: "1px solid rgba(10,10,10,0.1)",
                    paddingBottom: 2,
                  }}>COMING SOON</span>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
function QuoteSection() {
  const words = "千里の道も一歩から".split("")
  const subWords = "A journey of a thousand miles begins with a single step.".split(" ")

  return (
    <section style={{
      padding: "140px 48px",
      background: "#FAFAFA",
      display: "flex", flexDirection: "column", alignItems: "center",
      borderTop: "1px solid rgba(10,10,10,0.08)",
    }}>
      <div style={{ maxWidth: 800, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex", gap: 6, justifyContent: "center",
            flexWrap: "wrap", marginBottom: 28,
          }}
        >
          {words.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 100, fontSize: "clamp(36px,5vw,64px)",
                color: "#0A0A0A", lineHeight: 1.1,
              }}
            >{char}</motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(18px,2.5vw,26px)",
            color: "rgba(10,10,10,0.45)", lineHeight: 1.5,
          }}
        >
          {subWords.join(" ")}
        </motion.p>
      </div>
    </section>
  )
}
function CTASection() {
  const [visitors, setVisitors] = useState(null)
  const effectRun = useRef(false)

  useEffect(() => {
    if (effectRun.current) return
    effectRun.current = true
    const localVisits = parseInt(localStorage.getItem('np_unique_visits') || "0")
    const total = 14205 + localVisits + 1
    localStorage.setItem('np_unique_visits', localVisits + 1)
    let start = 14100
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 5) + 1
      if (start >= total) {
        setVisitors(total)
        clearInterval(interval)
      } else {
        setVisitors(start)
      }
    }, 15)
    return () => clearInterval(interval)
  }, [])

  return (
    <section style={{
      padding: "120px 48px",
      background: "#FAFAFA",
      display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
          fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(10,10,10,0.3)", marginBottom: 24,
        }}>Start today.</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontWeight: 300, fontSize: "clamp(40px,6vw,80px)",
          color: "#0A0A0A", lineHeight: 1.05, marginBottom: 56,
        }}>
          Begin your path<br />to Japanese mastery.
        </h2>
        
        
        <div style={{
          display: "inline-flex", flexDirection: "column", alignItems: "center",
          border: "1px solid rgba(10,10,10,0.1)",
          padding: "24px 40px",
          borderRadius: 2,
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600, fontSize: 40,
            color: "#0A0A0A", lineHeight: 1,
            marginBottom: 8,
          }}>
            {visitors !== null ? visitors.toLocaleString() : "..."}
          </p>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300, fontSize: 9,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(10,10,10,0.4)",
          }}>
            Website Visitors
          </p>
        </div>
      </motion.div>
    </section>
  )
}
function Footer() {
  return (
    <footer style={{
      padding: "40px 48px",
      background: "#FAFAFA",
      borderTop: "1px solid rgba(10,10,10,0.06)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{
        display: "flex", gap: 12, alignItems: "center",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300, fontSize: 11, color: "#555",
      }}>
        <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100, color: "#555" }}>日本語</span>
        <span>NihongoPath</span>
      </div>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300, fontSize: 11, color: "#555", letterSpacing: "0.05em",
      }}>
        © 2024&nbsp;&nbsp;·&nbsp;&nbsp;JLPT N5–N1&nbsp;&nbsp;·&nbsp;&nbsp;Made with 愛
      </p>
    </footer>
  )
}
export default function Home() {
  const { scrollY } = useScroll()

  return (
    <>
      <GlobalStyle />
      <Navbar scrollY={scrollY} />
      <main>
        <Hero scrollY={scrollY} />
        <MarqueeStrip />
        <FeatureCards scrollY={scrollY} />
        <QuoteSection />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
