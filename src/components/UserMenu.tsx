"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Avatar from "./Avatar"
import { useAuth } from "./AuthProvider"
import { useViewport } from "@/hooks"

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { profile, user, signOut } = useAuth()
  const { isMobile } = useViewport()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
    router.push("/")
    router.refresh()
  }

  return (
    <div style={{ position: "relative" }}>
      <motion.div
        whileHover={{ opacity: 0.85 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Avatar 
          url={profile?.avatar_url} 
          size={isMobile ? 36 : 40} 
          onClick={() => setIsOpen(v => !v)} 
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 12px)",
              right: 0,
              background: "#FAFAFA",
              border: "1px solid rgba(10,10,10,0.08)",
              minWidth: 200,
              zIndex: 200,
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(10,10,10,0.06)",
            }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#0A0A0A",
                marginBottom: 4,
              }}>
                {profile?.username || user?.email?.split('@')[0] || "User"}
              </p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: "0.05em",
                color: "rgba(10,10,10,0.4)",
              }}>
                {profile?.current_level || "N5"} Learner
              </p>
            </div>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                padding: "14px 20px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#0A0A0A",
                borderBottom: "1px solid rgba(10,10,10,0.06)",
              }}
            >
              PROFILE
            </Link>

            <div
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                padding: "14px 20px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.3)",
                borderBottom: "1px solid rgba(10,10,10,0.06)",
                cursor: "not-allowed",
              }}
            >
              SETTINGS
            </div>

            <button
              onClick={handleSignOut}
              style={{
                display: "block",
                width: "100%",
                padding: "14px 20px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#0A0A0A",
                textAlign: "left",
              }}
            >
              LOGOUT
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
