"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useAuth, type Profile } from "@/components/AuthProvider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Avatar from "@/components/Avatar"

const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"]

export default function ProfilePage() {
  const router = useRouter()
  const { user, profile: authProfile, loading: authLoading, signOut } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Edit state
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push("/login")
      return
    }

    setProfile(authProfile)
    setUsername(authProfile?.username || "")
    setFullName(authProfile?.full_name || "")
    setLoading(false)
  }, [user, authProfile, authLoading, router])

  const handleSave = async () => {
    if (!user) return
    setError("")
    setSuccess("")

    if (username.length < 3) {
      setError("Username must be at least 3 characters.")
      return
    }

    setSaving(true)

    const supabase = createClient()

    // Check if username is taken (by someone else)
    if (username !== profile?.username) {
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .neq("id", user.id)
        .single()

      if (existingUser) {
        setError("Username is already taken.")
        setSaving(false)
        return
      }
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        full_name: fullName || null,
      })
      .eq("id", user.id)

    if (error) {
      setError(error.message)
    } else {
      setSuccess("Profile updated successfully.")
      setProfile(prev => prev ? { ...prev, username, full_name: fullName || null } : prev)
    }

    setSaving(false)
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  if (authLoading || loading) {
    return (
      <>
        <Navbar variant="page" />
        <div style={{
          minHeight: "100vh", background: "#FAFAFA",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300, fontSize: 13,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "rgba(10,10,10,0.3)",
            }}
          >
            LOADING...
          </motion.div>
        </div>
      </>
    )
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
          padding: "120px 24px 80px",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
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
            <span>プロフィール</span>
          </motion.div>

          {/* Title and Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 56 }}>
            <Avatar url={profile?.avatar_url} size={96} />
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
              }}
            >
              Your Profile
            </motion.h1>
          </div>

          {/* Profile Info Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            marginBottom: 56,
          }}>
            {/* Current Level */}
            <div style={{
              border: "1px solid rgba(10,10,10,0.08)",
              padding: "24px",
            }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(10,10,10,0.35)",
                marginBottom: 8,
              }}>CURRENT LEVEL</p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600, fontSize: 36,
                color: "#0A0A0A", lineHeight: 1,
              }}>{profile?.current_level || "N5"}</p>
            </div>

            {/* Member Since */}
            <div style={{
              border: "1px solid rgba(10,10,10,0.08)",
              padding: "24px",
            }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(10,10,10,0.35)",
                marginBottom: 8,
              }}>MEMBER SINCE</p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400, fontSize: 14,
                color: "#0A0A0A", lineHeight: 1.4,
              }}>
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </p>
            </div>

            {/* Email */}
            <div style={{
              border: "1px solid rgba(10,10,10,0.08)",
              padding: "24px",
              gridColumn: "1 / -1",
            }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(10,10,10,0.35)",
                marginBottom: 8,
              }}>EMAIL</p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 14,
                color: "rgba(10,10,10,0.6)",
              }}>{user?.email || "—"}</p>
            </div>
          </div>

          {/* Edit Section */}
          <div style={{ marginBottom: 56 }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300, fontSize: 10,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "rgba(10,10,10,0.3)",
              marginBottom: 24,
              paddingBottom: 8,
              borderBottom: "1px solid rgba(10,10,10,0.06)",
            }}>EDIT PROFILE</p>

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

            {/* Success */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "12px 16px",
                  marginBottom: 24,
                  border: "1px solid rgba(16,185,129,0.2)",
                  background: "rgba(16,185,129,0.04)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13, fontWeight: 300,
                  color: "#10b981",
                }}
              >
                {success}
              </motion.div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: "block",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(10,10,10,0.4)",
                marginBottom: 8,
              }}>
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
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
                FULL NAME
              </label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
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
              onClick={handleSave}
              disabled={saving}
              whileHover={{ opacity: 0.85 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "14px 32px",
                background: "#0A0A0A",
                color: "#FAFAFA",
                border: "none",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                cursor: saving ? "wait" : "pointer",
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? "SAVING..." : "SAVE CHANGES"}
            </motion.button>
          </div>

          {/* Danger Zone */}
          <div style={{
            borderTop: "1px solid rgba(10,10,10,0.06)",
            paddingTop: 32,
          }}>
            <motion.button
              onClick={handleSignOut}
              whileHover={{ borderColor: "rgba(10,10,10,0.3)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "12px 24px",
                background: "transparent",
                border: "1px solid rgba(10,10,10,0.1)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300, fontSize: 11,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "#0A0A0A",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              SIGN OUT
            </motion.button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  )
}
