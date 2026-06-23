"use client"

import { useState, useEffect } from "react"
import { motion, useTransform, AnimatePresence, type MotionValue } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useViewport } from "@/hooks"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"

const NAV_LINKS = [
  { label: "KANA", to: "/kana" },
  { label: "VOCABULARY", to: "/vocabulary" },
  { label: "GRAMMAR", to: "/grammar" },
  { label: "KANJI", to: "/kanji" },
]

interface NavbarProps {
  scrollY?: MotionValue<number>
  variant?: "home" | "page"
}

export default function Navbar({ scrollY, variant = "home" }: NavbarProps) {
  const { isMobile } = useViewport()
  const router = useRouter()
  const supabase = createClient()

  const defaultScrollY = useTransform(() => 0)
  const activeScrollY = scrollY ?? defaultScrollY

  const bg = useTransform(activeScrollY, [0, 80], ["rgba(250,250,250,0)", "rgba(250,250,250,1)"])
  const borderOpacity = useTransform(activeScrollY, [0, 80], [0, 1])
  const borderBottom = useTransform(borderOpacity, v => v > 0.01 ? "1px solid rgba(0,0,0,0.08)" : "none")
  const textColor = "#0A0A0A"

  const [menuOpen, setMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // For sub-pages, use a fixed bg
  const navStyle = variant === "page"
    ? {
        position: "sticky" as const, top: 0, left: 0, right: 0, zIndex: 100,
        display: isMobile ? "flex" : "grid", alignItems: "center" as const, 
        justifyContent: isMobile ? "space-between" as const : undefined,
        gridTemplateColumns: isMobile ? undefined : "1fr auto 1fr",
        padding: isMobile ? "20px 24px" : "24px 48px",
        background: "rgba(250,250,250,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }
    : {
        position: "fixed" as const, top: 0, left: 0, right: 0, zIndex: 100,
        display: isMobile ? "flex" : "grid", alignItems: "center" as const, 
        justifyContent: isMobile ? "space-between" as const : undefined,
        gridTemplateColumns: isMobile ? undefined : "1fr auto 1fr",
        padding: isMobile ? "20px 24px" : "24px 48px",
      }

  return (
    <>
      <motion.nav
        style={variant === "home" ? {
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: isMobile ? "flex" : "grid", alignItems: "center", 
          justifyContent: isMobile ? "space-between" : undefined,
          gridTemplateColumns: isMobile ? undefined : "1fr auto 1fr",
          padding: isMobile ? "20px 24px" : "24px 48px",
          background: bg,
          borderBottom,
        } : navStyle}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
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
        </Link>

        {isMobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => setMenuOpen(open => !open)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
                fontSize: 24, color: textColor,
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        ) : (
          <>
            {/* Nav Links */}
            <motion.div style={{ display: "flex", gap: 40, alignItems: "center", justifyContent: "center" }}>
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={label}
                  href={to}
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
              ))}
            </motion.div>

            {/* Right CTA / Auth */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              {user ? (
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 0"
                    }}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Avatar" style={{ width: 24, height: 24, borderRadius: "50%" }} />
                    ) : (
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#0A0A0A", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontFamily: "'Space Grotesk', sans-serif" }}>
                        {user.email?.[0].toUpperCase()}
                      </div>
                    )}
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: textColor, fontWeight: 500 }}>
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                    <span style={{ fontSize: 10, color: textColor }}>▼</span>
                  </button>

                  <AnimatePresence>
                    {profileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                        style={{
                          position: "absolute", top: "100%", right: 0, marginTop: 8,
                          background: "#FFF", border: "1px solid rgba(10,10,10,0.08)", borderRadius: 4,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.05)", padding: 8, minWidth: 160, zIndex: 101
                        }}
                      >
                        <Link href="/dashboard" style={{ display: "block", padding: "10px 16px", textDecoration: "none", color: "#0A0A0A", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }} onClick={() => setProfileMenuOpen(false)}>Dashboard</Link>
                        <Link href="/dashboard" style={{ display: "block", padding: "10px 16px", textDecoration: "none", color: "rgba(10,10,10,0.5)", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }} onClick={() => setProfileMenuOpen(false)}>Profile</Link>
                        <div style={{ height: 1, background: "rgba(10,10,10,0.05)", margin: "4px 0" }} />
                        <button onClick={() => { handleLogout(); setProfileMenuOpen(false); }} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 16px", cursor: "pointer", color: "#0A0A0A", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>Log Out</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/auth" style={{ textDecoration: "none" }}>
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
                    SIGN IN →
                  </motion.button>
                </Link>
              )}
            </div>
          </>
        )}
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
              background: "#FAFAFA",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              display: "flex", flexDirection: "column",
              padding: "24px", gap: 24, overflow: "hidden",
            }}
          >
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                href={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 300, fontSize: 14,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  textDecoration: "none", color: textColor,
                  display: "block",
                }}
              >
                {label}
              </Link>
            ))}
            
            <div style={{ height: 1, background: "rgba(10,10,10,0.08)", margin: "8px 0" }} />

            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", color: textColor, display: "block" }}>
                  DASHBOARD
                </Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={{ background: "none", border: "none", padding: 0, textAlign: "left", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", color: textColor, display: "block", cursor: "pointer" }}>
                  LOG OUT
                </button>
              </>
            ) : (
              <Link href="/auth" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", color: textColor, display: "block" }}>
                SIGN IN →
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
