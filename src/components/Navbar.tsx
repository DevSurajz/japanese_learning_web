"use client"

import { useState } from "react"
import { motion, useTransform, AnimatePresence, type MotionValue } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useViewport } from "@/hooks"
import { useAuth } from "@/components/AuthProvider"

import UserMenu from "./UserMenu"

const NAV_LINKS = [
  { label: "KANJI", to: "/kanji" },
  { label: "GRAMMAR", to: "/grammar" },
  { label: "VOCABULARY", to: "/vocabulary" },
  { label: "KANA", to: "/kana" },
]

interface NavbarProps {
  scrollY?: MotionValue<number>
  variant?: "home" | "page"
}

export default function Navbar({ scrollY, variant = "home" }: NavbarProps) {
  const { isMobile } = useViewport()
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  // For home page with scroll-based background
  const defaultScrollY = useTransform(() => 0)
  const activeScrollY = scrollY ?? defaultScrollY

  const bg = useTransform(activeScrollY, [0, 80], ["rgba(250,250,250,0)", "rgba(250,250,250,1)"])
  const borderOpacity = useTransform(activeScrollY, [0, 80], [0, 1])
  const borderBottom = useTransform(borderOpacity, v => v > 0.01 ? "1px solid rgba(0,0,0,0.08)" : "none")
  const textColor = "#0A0A0A"

  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setMenuOpen(false)
    router.push("/")
    router.refresh()
  }

  // For sub-pages, use a fixed bg
  const navStyle = variant === "page"
    ? {
        position: "sticky" as const, top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center" as const, justifyContent: "space-between" as const,
        padding: isMobile ? "20px 24px" : "24px 48px",
        background: "rgba(250,250,250,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }
    : {
        position: "fixed" as const, top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center" as const, justifyContent: "space-between" as const,
        padding: isMobile ? "20px 24px" : "24px 48px",
      }

  return (
    <>
      <motion.nav
        style={variant === "home" ? {
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
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
            {!loading && user && <UserMenu />}
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
            <motion.div style={{ display: "flex", gap: 40, alignItems: "center" }}>
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

            {/* Auth CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {loading ? (
                <div style={{ width: 40, height: 40 }} />
              ) : user ? (
                <UserMenu />
              ) : (
                <Link href="/login" style={{ textDecoration: "none" }}>
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

            {/* Mobile Auth */}
            {!loading && !user && (
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", marginTop: 8 }}>
                <div style={{
                  background: "#0A0A0A", color: "#FAFAFA",
                  padding: "16px", textAlign: "center",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 300, fontSize: 12,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                }}>
                  SIGN IN →
                </div>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
