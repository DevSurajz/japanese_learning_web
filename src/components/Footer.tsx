"use client"

import { useViewport } from "@/hooks"

export default function Footer() {
  const { isMobile } = useViewport()

  return (
    <footer style={{
      padding: isMobile ? "40px 24px" : "40px 48px",
      background: "#FAFAFA",
      borderTop: "1px solid rgba(10,10,10,0.06)",
      display: "flex", alignItems: isMobile ? "flex-start" : "center",
      justifyContent: isMobile ? "center" : "space-between",
      flexDirection: isMobile ? "column" : "row", gap: isMobile ? 24 : 0,
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
        textAlign: isMobile ? "left" : "right"
      }}>
        © 2026&nbsp;&nbsp;·&nbsp;&nbsp;JLPT N5–N1&nbsp;&nbsp;·&nbsp;&nbsp;Made with 愛
      </p>
    </footer>
  )
}
