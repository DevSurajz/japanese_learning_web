"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useTransform, AnimatePresence, type MotionValue } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useViewport } from "@/hooks"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"
import ConfirmDialog from "@/components/ConfirmDialog"
import StreakIndicator from "@/components/StreakIndicator"

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

  const bg = useTransform(activeScrollY, [0, 80], ["rgba(250,248,244,0)", "var(--bg-primary)"])
  const borderOpacity = useTransform(activeScrollY, [0, 80], [0, 1])
  const borderBottom = useTransform(borderOpacity, v => v > 0.01 ? "1px solid var(--border-color)" : "none")
  const textColor = "var(--text-primary)"

  const [menuOpen, setMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)
  const [streak, setStreak] = useState<number>(0)
  const [isStreakCompletedToday, setIsStreakCompletedToday] = useState<boolean>(true)
  const [xpToday, setXpToday] = useState<number>(0)
  const [dailyGoal, setDailyGoal] = useState<number>(20)
  const [toast, setToast] = useState<string | null>(null)

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

  useEffect(() => {
    if (!user) return
    
    // Dynamically import dateUtils on the client to get local evaluated date state
    import('@/utils/dateUtils').then(({ evaluateStreakState, getLocalToday }) => {
      supabase
        .from('profiles')
        .select('current_streak, last_studied_date, xp_today_earned, daily_goal_xp, xp_today_date')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (!data) return
          
          const state = evaluateStreakState(data.current_streak ?? 0, data.last_studied_date)
          setStreak(state.displayStreak)
          setIsStreakCompletedToday(state.isCompletedToday)

          const today = getLocalToday()
          setXpToday(data.xp_today_date === today ? (data.xp_today_earned ?? 0) : 0)
          setDailyGoal(data.daily_goal_xp ?? 20)
        })
    })
  }, [user, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const requestLogout = useCallback(() => {
    setProfileMenuOpen(false)
    setMenuOpen(false)
    setLogoutConfirmOpen(true)
  }, [])

  const confirmLogout = useCallback(() => {
    setLogoutConfirmOpen(false)
    handleLogout()
  }, [])

  const cancelLogout = useCallback(() => {
    setLogoutConfirmOpen(false)
  }, [])

  // For sub-pages, use a fixed bg
  const navStyle = variant === "page"
    ? {
        position: "sticky" as const, top: 0, left: 0, right: 0, zIndex: 100,
        display: isMobile ? "flex" : "grid", alignItems: "center" as const, 
        justifyContent: isMobile ? "space-between" as const : undefined,
        gridTemplateColumns: isMobile ? undefined : "1fr auto 1fr",
        padding: isMobile ? "20px 24px" : "24px 48px",
        background: "rgba(250,248,244,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-color)",
      }
    : {
        position: "fixed" as const, top: 0, left: 0, right: 0, zIndex: 100,
        display: isMobile ? "flex" : "grid", alignItems: "center" as const, 
        justifyContent: isMobile ? "space-between" as const : undefined,
        gridTemplateColumns: isMobile ? undefined : "1fr auto 1fr",
        padding: isMobile ? "20px 24px" : "24px 48px",
      }

  const renderProfileMenu = () => {
    if (!user) {
      if (isMobile) return null // Sign in is in the drawer on mobile
      return (
        <Link href="/auth" style={{ textDecoration: "none" }}>
          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "var(--text-primary)", color: "var(--bg-card)",
              border: "none", borderRadius: 0,
              padding: "10px 20px",
              fontFamily: "var(--font-inter)",
              fontWeight: 300, fontSize: 11,
              letterSpacing: "0.18em", textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            SIGN IN →
          </motion.button>
        </Link>
      )
    }

    return (
      <div style={{ position: "relative", flexShrink: 0 }}>
        <button
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          aria-haspopup="true"
          aria-expanded={profileMenuOpen}
          aria-label="Toggle profile menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 8, margin: -8, // Increased clickable area
            borderRadius: "50%", // Better focus outline shape
            flexShrink: 0,
          }}
        >
          {user.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Profile Avatar" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          ) : (
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--text-primary)", color: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontFamily: "var(--font-inter)", flexShrink: 0 }}>
              {user.email?.[0].toUpperCase()}
            </div>
          )}
        </button>

        <AnimatePresence>
          {profileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
              style={{
                position: "absolute", top: "100%", right: 0, marginTop: 16,
                background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)", padding: 8, minWidth: 160, zIndex: 101
              }}
            >
              <Link href="/dashboard" style={{ display: "block", padding: "10px 16px", textDecoration: "none", color: "var(--text-primary)", fontFamily: "var(--font-inter)", fontSize: 13 }} onClick={() => setProfileMenuOpen(false)}>Dashboard</Link>
              <Link href="/profile" style={{ display: "block", padding: "10px 16px", textDecoration: "none", color: "var(--text-secondary)", fontFamily: "var(--font-inter)", fontSize: 13 }} onClick={() => setProfileMenuOpen(false)}>Profile</Link>
              <Link href="/leaderboard" style={{ display: "block", padding: "10px 16px", textDecoration: "none", color: "var(--text-secondary)", fontFamily: "var(--font-inter)", fontSize: 13 }} onClick={() => setProfileMenuOpen(false)}>Leaderboard</Link>
              <div style={{ height: 1, background: "var(--border-color)", margin: "4px 0" }} />
              <button onClick={requestLogout} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 16px", cursor: "pointer", color: "var(--text-primary)", fontFamily: "var(--font-inter)", fontSize: 13 }}>Log Out</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
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
              fontFamily: "var(--font-inter)",
              fontWeight: 300, fontSize: 13,
              color: textColor, letterSpacing: "0.12em",
            }}
          >NihongoPath</motion.span>
        </Link>

        {isMobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {renderProfileMenu()}
            <button
              onClick={() => setMenuOpen(open => !open)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-inter)", fontWeight: 300,
                fontSize: 24, color: textColor, padding: 8, margin: -8
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
                    fontFamily: "var(--font-inter)",
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
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 20 }}>
              {user && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StreakIndicator streak={streak} showText={true} size={14} isCompletedToday={isStreakCompletedToday} />
                </div>
              )}
              {renderProfileMenu()}
            </div>
          </>
        )}
      </motion.nav>

      {/* Ambient daily goal progress bar */}
      {user && (
        <div style={{ position: variant === 'page' ? 'sticky' : 'fixed', top: variant === 'page' ? 'auto' : 72, left: 0, right: 0, zIndex: 99, height: 3, background: 'var(--border-color)' }}>
          <div style={{
            height: '100%',
            width: `${Math.min(100, (xpToday / dailyGoal) * 100)}%`,
            background: xpToday >= dailyGoal ? 'var(--accent-red)' : 'var(--text-primary)',
            transition: 'width 0.6s ease, background 0.4s ease',
          }} />
        </div>
      )}

      {/* Streak milestone toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            style={{
              position: 'fixed', bottom: 24, left: '50%',
              background: 'var(--text-primary)', color: 'var(--bg-card)',
              padding: '12px 24px', zIndex: 300,
              fontFamily: "var(--font-inter)",
              fontSize: 13, fontWeight: 300,
              letterSpacing: '0.05em',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
              background: "var(--bg-primary)",
              borderBottom: "1px solid var(--border-color)",
              display: "flex", flexDirection: "column",
              padding: "24px", gap: 24, overflow: "hidden",
            }}
          >
            {user && (
              <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 24, borderBottom: "1px solid var(--border-color)" }}>
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Avatar" style={{ width: 48, height: 48, borderRadius: "50%" }} />
                ) : (
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--text-primary)", color: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontFamily: "var(--font-inter)" }}>
                    {user.email?.[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 16, color: textColor, fontWeight: 500 }}>
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--text-secondary)" }}>
                    {user.email}
                  </div>
                </div>
              </div>
            )}

            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                href={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 300, fontSize: 14,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  textDecoration: "none", color: textColor,
                  display: "block",
                }}
              >
                {label}
              </Link>
            ))}
            
            <div style={{ height: 1, background: "var(--border-color)", margin: "8px 0" }} />

            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", color: textColor, display: "block" }}>
                  DASHBOARD
                </Link>
                <Link href="/profile" onClick={() => setMenuOpen(false)} style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", color: textColor, display: "block" }}>
                  PROFILE
                </Link>
                <Link href="/leaderboard" onClick={() => setMenuOpen(false)} style={{ fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", color: textColor, display: "block" }}>
                  LEADERBOARD
                </Link>
                <button onClick={requestLogout} style={{ background: "none", border: "none", padding: 0, textAlign: "left", fontFamily: "var(--font-inter)", fontWeight: 300, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", color: textColor, display: "block", cursor: "pointer" }}>
                  LOG OUT
                </button>
              </>
            ) : (
              <Link href="/auth" onClick={() => setMenuOpen(false)} style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", color: textColor, display: "block" }}>
                SIGN IN →
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={logoutConfirmOpen}
        title="Sign out?"
        description="Are you sure you want to sign out of NihongoPath?"
        confirmLabel="Sign Out"
        cancelLabel="Cancel"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
        destructive
      />
    </>
  )
}
