"use client"

import { createClient } from '@/utils/supabase/client'
import { motion } from 'motion/react'
import { useViewport } from '@/hooks'
import Link from 'next/link'

export default function AuthPage() {
  const { isMobile } = useViewport()
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Left Side: Visual Storytelling */}
      {!isMobile && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
          borderRight: '1px solid rgba(10,10,10,0.05)'
        }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url('/new.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }} />
          
          {/* Subtle white mist overlay for readability */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(145deg, rgba(250,250,250,0.85) 0%, rgba(250,250,250,0.5) 100%)',
            zIndex: 0
          }} />

          {/* Subtle noise texture */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            opacity: 0.04, pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            zIndex: 0
          }} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ position: 'relative', zIndex: 1, maxWidth: 480, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 100, fontSize: "clamp(48px, 6vw, 64px)",
              color: "#0A0A0A", lineHeight: 1.4, marginBottom: 64,
              writingMode: "vertical-rl", textOrientation: "upright", height: 400
            }}>
              千里の道も一歩から
            </h1>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
                fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#0A0A0A", marginBottom: 12
              }}>
                NihongoPath
              </p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontWeight: 300, fontSize: 24, color: "rgba(10,10,10,0.6)"
              }}>
                A structured path to Japanese mastery.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Right Side: Auth Panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '40px 24px' : '80px',
        background: '#FAFAFA'
      }}>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: 400, width: '100%', margin: '0 auto' }}>
          
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 64 }}>
             <p style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 11,
                letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)"
              }}>← Back to home</p>
          </Link>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontWeight: 300, fontSize: 40, color: "#0A0A0A", marginBottom: 16
          }}>
            NihongoPath
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 15,
            color: "rgba(10,10,10,0.6)", marginBottom: 48
          }}>
            Your Japanese journey starts here.
          </p>

          <button
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              background: '#0A0A0A', color: '#FAFAFA',
              border: 'none', padding: '16px 24px', cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13,
              letterSpacing: "0.1em", textTransform: "uppercase",
              transition: 'opacity 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FAFAFA" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#FAFAFA" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FAFAFA" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#FAFAFA" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

        </motion.div>
      </div>
    </div>
  )
}
