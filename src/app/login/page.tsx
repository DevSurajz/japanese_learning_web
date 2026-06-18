"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/")
      router.refresh()
    }
  }

  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) setError(error.message)
  }

  return (
    <>
      <Navbar variant="page" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          minHeight: "100vh",
          background: "#FAFAFA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              display: "flex", gap: 16, alignItems: "center",
              marginBottom: 40,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300, fontSize: 11,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(10,10,10,0.4)",
            }}
          >
            <span>NihongoPath</span>
            <span style={{ color: "rgba(10,10,10,0.15)" }}>／</span>
            <span>ログイン</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300, fontStyle: "italic",
              fontSize: "clamp(40px, 8vw, 64px)",
              color: "#0A0A0A",
              lineHeight: 1.05,
              marginBottom: 12,
            }}
          >
            Welcome Back
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300, fontSize: 15,
              lineHeight: 1.6, color: "rgba(10,10,10,0.5)",
              marginBottom: 48,
            }}
          >
            Continue your Japanese journey.
          </motion.p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "12px 16px",
                marginBottom: 24,
                border: "1px solid rgba(220,38,38,0.2)",
                background: "rgba(220,38,38,0.04)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13, fontWeight: 300,
                color: "#dc2626",
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn}>
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: "block",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(10,10,10,0.4)",
                marginBottom: 8,
              }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid rgba(10,10,10,0.1)",
                  background: "transparent",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 300, fontSize: 14,
                  color: "#0A0A0A",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(10,10,10,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(10,10,10,0.1)"}
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{
                display: "block",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(10,10,10,0.4)",
                marginBottom: 8,
              }}>
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid rgba(10,10,10,0.1)",
                  background: "transparent",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 300, fontSize: 14,
                  color: "#0A0A0A",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(10,10,10,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(10,10,10,0.1)"}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ opacity: 0.85 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                padding: "16px",
                background: "#0A0A0A",
                color: "#FAFAFA",
                border: "none",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 12,
                letterSpacing: "0.18em", textTransform: "uppercase",
                cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.6 : 1,
                marginBottom: 12,
              }}
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </motion.button>
          </form>

          {/* Divider */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            margin: "24px 0",
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(10,10,10,0.08)" }} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300, fontSize: 10,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "rgba(10,10,10,0.25)",
            }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "rgba(10,10,10,0.08)" }} />
          </div>

          {/* Google OAuth */}
          <motion.button
            onClick={handleGoogleSignIn}
            whileHover={{ borderColor: "rgba(10,10,10,0.3)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "14px",
              background: "transparent",
              border: "1px solid rgba(10,10,10,0.1)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300, fontSize: 12,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#0A0A0A",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transition: "border-color 0.2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            CONTINUE WITH GOOGLE
          </motion.button>

          {/* Sign Up Link */}
          <p style={{
            marginTop: 40,
            textAlign: "center",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300, fontSize: 13,
            color: "rgba(10,10,10,0.4)",
          }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{
              color: "#0A0A0A",
              textDecoration: "none",
              borderBottom: "1px solid rgba(10,10,10,0.3)",
              paddingBottom: 1,
            }}>
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
      <Footer />
    </>
  )
}
