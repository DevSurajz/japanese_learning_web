"use client"

import { useViewport } from "@/hooks"
import { motion } from "motion/react"

const SupportCard = ({ title, description, link, icon, isMobile }: { title: string, description: string, link: string, icon: React.ReactNode, isMobile: boolean }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#FFF",
        border: "1px solid #EAEAEA",
        borderRadius: 16,
        padding: isMobile ? "12px 16px" : "16px 20px",
        textDecoration: "none",
        color: "inherit",
        boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
        cursor: "pointer",
        flex: 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: isMobile ? 12 : 16 }}>
        <div style={{
          width: isMobile ? 36 : 40, height: isMobile ? 36 : 40, borderRadius: 10, background: "#FAFAFA", border: "1px solid #EAEAEA",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0A"
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: isMobile ? 14 : 15, color: "#0A0A0A", letterSpacing: "0.01em" }}>
            {title}
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: isMobile ? 12 : 13, color: "rgba(10,10,10,0.55)", marginTop: isMobile ? 2 : 4, lineHeight: 1.4 }}>
            {description}
          </div>
        </div>
      </div>
      <div style={{ color: "rgba(10,10,10,0.3)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </motion.a>
  )
}

export default function Footer() {
  const { isMobile } = useViewport()

  return (
    <footer style={{
      background: "#FAFAFA",
      borderTop: "1px solid rgba(10,10,10,0.06)",
      padding: isMobile ? "64px 24px 40px" : "80px 48px 40px",
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? 48 : 80,
    }}>
      {/* Top Section */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 40 : 64,
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
      }}>
        {/* Left Side: Editorial description */}
        <div style={{ flex: 1, maxWidth: 500 }}>
          <div style={{
            display: "inline-block", padding: "4px 10px", borderRadius: 4, background: "rgba(10,10,10,0.04)",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: "0.15em", color: "rgba(10,10,10,0.6)",
            marginBottom: 20,
          }}>
            OPEN SOURCE • INDEPENDENT
          </div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: isMobile ? 24 : 32, color: "#0A0A0A",
            lineHeight: 1.2, margin: "0 0 16px 0", letterSpacing: "-0.02em"
          }}>
            Help us build the ultimate Japanese learning experience.
          </h3>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(10,10,10,0.6)",
            lineHeight: 1.6, margin: 0
          }}>
            NihongoPath is independently built and completely free to use. Your support helps fund development, new lessons, JLPT resources, hosting costs, and continuous improvements.
          </p>
        </div>

        {/* Right Side: Support Cards */}
        <div style={{
          flex: 1, display: "flex", flexDirection: isMobile ? "column" : "column", gap: isMobile ? 12 : 16, width: "100%", maxWidth: isMobile ? "100%" : 440,
        }}>
          <SupportCard
            isMobile={isMobile}
            title="GitHub Sponsors"
            description="Support NihongoPath"
            link="https://github.com/sponsors/DevSurajz"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            }
          />
          <SupportCard
            isMobile={isMobile}
            title="Buy Me a Coffee"
            description="Buy a cup to show support"
            link="https://ko-fi.com/devsuraj"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            }
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", width: "100%",
        display: "flex", flexDirection: "column", gap: 32
      }}>
        <div style={{ height: 1, background: "rgba(10,10,10,0.06)", width: "100%" }} />

        <div style={{
          display: "flex", flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", alignItems: "center",
          gap: isMobile ? 24 : 0,
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: 13, color: "rgba(10,10,10,0.5)",
        }}>
          {/* Left */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", width: isMobile ? "100%" : 200, justifyContent: isMobile ? "center" : "flex-start" }}>
            <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100 }}>日本語</span>
            <span>NihongoPath © 2026</span>
          </div>

          {/* Center */}
          <div style={{ textAlign: "center", flex: 1 }}>
            Built with ❤️ by Suraj Sharma
          </div>

          {/* Right */}
          <div style={{ display: "flex", gap: 24, alignItems: "center", width: isMobile ? "100%" : 200, justifyContent: isMobile ? "center" : "flex-end" }}>
            <a href="https://github.com/DevSurajz" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'inherit', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://x.com/Devyavz" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'inherit', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

