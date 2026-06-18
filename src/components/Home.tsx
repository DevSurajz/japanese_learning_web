"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, animate } from "motion/react"
import Link from "next/link"
import { useViewport } from "@/hooks"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const MARQUEE_WORDS = ["語学", "KANJI", "文法", "GRAMMAR", "語彙", "VOCABULARY", "日本語", "NIHONGO", "N5→N1", "学習"]

const FEATURE_CARDS = [
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
    link: "/grammar",
  },
  {
    ja: "語彙", en: "VOCABULARY", num: "03",
    desc: "800+ words essential for JLPT N5. Grouped by topic with example sentences and audio.",
    offset: 160,
    link: "/vocabulary",
  },
]

const QUOTE_CHARS = "千里の道も一歩から".split("")
const QUOTE_TEXT = "A journey of a thousand miles begins with a single step."

// ─── HERO ────────────────────────────────────────────────────────
function Hero({ scrollY }: { scrollY: ReturnType<typeof useScroll>["scrollY"] }) {
  const { isMobile } = useViewport()

  const kanjiY = useTransform(scrollY, [0, 600], [0, -120])
  const kanjiOpacity = useTransform(scrollY, [0, 400], [0.06, 0])
  const springY = useSpring(kanjiY, { stiffness: 80, damping: 20 })

  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const kanjiCount = useMotionValue(0)
  const grammarCount = useMotionValue(0)
  const vocabCount = useMotionValue(0)

  const kanjiDisplay = useTransform(kanjiCount, Math.round)
  const grammarDisplay = useTransform(grammarCount, Math.round)
  const vocabDisplay = useTransform(vocabCount, Math.round)

  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true
      animate(kanjiCount, 80, { duration: 2, ease: "easeOut" })
      animate(grammarCount, 11, { duration: 2, ease: "easeOut" })
      animate(vocabCount, 800, { duration: 2, ease: "easeOut" })
    }
  }, [inView, kanjiCount, grammarCount, vocabCount])

  return (
    <section
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: isMobile ? "100px 24px 60px" : "120px 48px 80px", position: "relative", overflow: "hidden",
        background: "#FAFAFA",
      }}
    >
      {/* Parallax background kanji — pinned to right-middle */}
      <motion.div
        style={{
          position: "absolute",
          right: "8%",
          top: "50%",
          translateY: "-50%",
          y: isMobile ? 0 : springY,
          opacity: kanjiOpacity,
          fontFamily: "'Noto Sans JP', sans-serif",
          fontWeight: 100,
          fontSize: "clamp(280px, 30vw, 480px)",
          color: "#0A0A0A",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >語</motion.div>

      <div style={{ maxWidth: 680, position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
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
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300, lineHeight: 1.0,
            fontSize: "clamp(64px, 12vw, 140px)",
            color: "#0A0A0A",
            marginBottom: 32,
          }}
        >
          <span style={{ display: "block", fontStyle: "italic" }}>Master</span>
          <span style={{ display: "block", fontWeight: 600, fontStyle: "normal" }}>Japanese.</span>
          <span style={{ display: "block", fontStyle: "italic" }}>Perfectly.</span>
        </motion.h1>

        {/* Body */}
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

        {/* Stats */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ display: "flex", gap: 0, flexDirection: isMobile ? "column" : "row" }}
        >
          {[
            { value: kanjiDisplay, suffix: "", label: "N5 KANJI" },
            { value: grammarDisplay, suffix: "", label: "GRAMMAR POINTS" },
            { value: vocabDisplay, suffix: "+", label: "VOCABULARY WORDS" },
          ].map(({ value, suffix, label }, i) => (
            <div
              key={label}
              style={{
                borderTop: "2px solid #0A0A0A",
                paddingTop: 16, paddingBottom: 24,
                paddingLeft: isMobile ? 0 : (i === 0 ? 0 : 32),
                paddingRight: isMobile ? 0 : (i === 2 ? 0 : 32),
                borderRight: isMobile ? "none" : (i < 2 ? "1px solid rgba(10,10,10,0.12)" : "none"),
              }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600, fontSize: "clamp(40px, 10vw, 60px)",
                color: "#0A0A0A", lineHeight: 1,
              }}>
                <motion.span>{value}</motion.span>{suffix}
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

      {/* Scroll indicator */}
      {!isMobile && (
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
      )}
    </section>
  )
}

// ─── MARQUEE STRIP ───────────────────────────────────────────────
function MarqueeStrip() {
  const { isMobile } = useViewport()
  return (
    <div style={{
      overflow: "hidden", borderTop: "1px solid rgba(10,10,10,0.08)",
      borderBottom: "1px solid rgba(10,10,10,0.08)",
      padding: "18px 0", background: "#FAFAFA",
    }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: isMobile ? 32 : 64, whiteSpace: "nowrap", width: "max-content" }}
      >
        {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
          <span key={i} style={{
            fontFamily: i % 2 === 0 ? "'Noto Sans JP'" : "'Space Grotesk'",
            fontWeight: i % 2 === 0 ? 100 : 300,
            fontSize: isMobile ? 11 : 13, letterSpacing: "0.2em",
            color: "rgba(10,10,10,0.25)",
            textTransform: "uppercase",
          }}>{w}</span>
        ))}
      </motion.div>
    </div>
  )
}

function FeatureCard({ ja, en, num, desc, offset, link, scrollY, delay, isMobile, isTablet }: {
  ja: string; en: string; num: string; desc: string; offset: number; link: string;
  scrollY: ReturnType<typeof useScroll>["scrollY"]; delay: number; isMobile: boolean; isTablet: boolean;
}) {
  const shouldParallax = !isMobile && !isTablet
  const cardY = useTransform(scrollY, [300, 900], [shouldParallax ? offset : 0, 0])
  const springCardY = useSpring(cardY, { stiffness: 80, damping: 20 })

  return (
    <motion.div
      style={{ y: springCardY }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        style={{
          border: "1px solid rgba(10,10,10,0.08)",
          padding: isMobile ? "32px 24px 40px" : "48px 40px 56px",
          position: "relative", overflow: "hidden",
          cursor: link ? "pointer" : "default",
          height: "100%",
        }}
      >
        {/* BG kanji */}
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
          color: "rgba(10,10,10,0.25)", marginBottom: isMobile ? 32 : 48,
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
            href={link}
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
}

function FeatureCards({ scrollY }: { scrollY: ReturnType<typeof useScroll>["scrollY"] }) {
  const { isMobile, isTablet } = useViewport()
  const columns = isMobile ? 1 : isTablet ? 2 : 3

  return (
    <section style={{ padding: isMobile ? "64px 24px" : "120px 48px", background: "#FAFAFA" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: isMobile ? 48 : 72 }}
      >
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
          fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(10,10,10,0.3)", marginBottom: 16,
        }}>The curriculum.</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontWeight: 300, fontSize: "clamp(36px,8vw,64px)",
          color: "#0A0A0A", lineHeight: 1.05,
        }}>Three pillars of fluency.</h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: isMobile ? 16 : 2 }}>
        {FEATURE_CARDS.map((card, i) => (
          <FeatureCard key={card.en} {...card} scrollY={scrollY} delay={i * 0.12} isMobile={isMobile} isTablet={isTablet} />
        ))}
      </div>
    </section>
  )
}

function QuoteSection() {
  const { isMobile } = useViewport()

  return (
    <section style={{
      padding: isMobile ? "80px 24px" : "140px 48px",
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
          {QUOTE_CHARS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 100, fontSize: "clamp(36px,8vw,64px)",
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
            fontSize: "clamp(18px,4vw,26px)",
            color: "rgba(10,10,10,0.45)", lineHeight: 1.5,
          }}
        >
          {QUOTE_TEXT}
        </motion.p>
      </div>
    </section>
  )
}

// ─── CTA SECTION ─────────────────────────────────────────────────
function CTASection() {
  const { isMobile } = useViewport()

  return (
    <section style={{
      padding: isMobile ? "80px 24px" : "120px 48px",
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
          fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(10,10,10,0.3)", marginBottom: 24,
        }}>Start today.</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontWeight: 300, fontSize: "clamp(40px,8vw,80px)",
          color: "#0A0A0A", lineHeight: 1.05, marginBottom: 56,
        }}>
          Begin your path<br />to Japanese mastery.
        </h2>

        <Link href="/kana" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ opacity: 0.8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex", flexDirection: "column", alignItems: "center",
              background: "#0A0A0A",
              padding: "24px 40px",
              borderRadius: 2,
              cursor: "pointer",
            }}
          >
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300, fontSize: 13,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#FAFAFA",
            }}>
              START YOUR JOURNEY →
            </p>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}

export default function Home() {
  const { scrollY } = useScroll()

  return (
    <>
      <Navbar scrollY={scrollY} variant="home" />
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
