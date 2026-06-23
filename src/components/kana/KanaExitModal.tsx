"use client"

import { motion } from "motion/react"

interface KanaExitModalProps {
  isOpen: boolean
  onContinue: () => void
  onLeave: () => void
}

export function KanaExitModal({ isOpen, onContinue, onLeave }: KanaExitModalProps) {
  if (!isOpen) return null

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onContinue}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "40px 32px",
          maxWidth: 400, width: "100%",
          position: "relative", zIndex: 1,
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>
          Your journey isn't finished yet.
        </h2>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 32 }}>
          Whoa! You're giving up midway.<br/>
          Review the remaining characters to strengthen your foundation.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            style={{
              background: "#0f172a", color: "#fff",
              border: "none", borderRadius: 12, padding: "16px",
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500,
              letterSpacing: "0.05em", textTransform: "uppercase",
              cursor: "pointer", width: "100%",
            }}
          >
            Continue Practice
          </motion.button>
          <motion.button
            whileHover={{ opacity: 0.7 }}
            onClick={onLeave}
            style={{
              background: "transparent", color: "#64748b",
              border: "none", padding: "16px",
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500,
              letterSpacing: "0.05em", textTransform: "uppercase",
              cursor: "pointer", width: "100%",
            }}
          >
            Leave Anyway
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
