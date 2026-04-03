import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router-dom"

const hiraganaGrid = [
  { kana: "あ", romaji: "a" }, { kana: "い", romaji: "i" }, { kana: "う", romaji: "u" }, { kana: "え", romaji: "e" }, { kana: "お", romaji: "o" },
  { kana: "か", romaji: "ka" }, { kana: "き", romaji: "ki" }, { kana: "く", romaji: "ku" }, { kana: "け", romaji: "ke" }, { kana: "こ", romaji: "ko" },
  { kana: "さ", romaji: "sa" }, { kana: "し", romaji: "shi" }, { kana: "す", romaji: "su" }, { kana: "せ", romaji: "se" }, { kana: "そ", romaji: "so" },
  { kana: "た", romaji: "ta" }, { kana: "ち", romaji: "chi" }, { kana: "つ", romaji: "tsu" }, { kana: "て", romaji: "te" }, { kana: "と", romaji: "to" },
  { kana: "な", romaji: "na" }, { kana: "に", romaji: "ni" }, { kana: "ぬ", romaji: "nu" }, { kana: "ね", romaji: "ne" }, { kana: "の", romaji: "no" },
  { kana: "は", romaji: "ha" }, { kana: "ひ", romaji: "hi" }, { kana: "ふ", romaji: "fu" }, { kana: "へ", romaji: "he" }, { kana: "ほ", romaji: "ho" },
  { kana: "ま", romaji: "ma" }, { kana: "み", romaji: "mi" }, { kana: "む", romaji: "mu" }, { kana: "め", romaji: "me" }, { kana: "も", romaji: "mo" },
  { kana: "や", romaji: "ya" }, { empty: true },           { kana: "ゆ", romaji: "yu" }, { empty: true },           { kana: "よ", romaji: "yo" },
  { kana: "ら", romaji: "ra" }, { kana: "り", romaji: "ri" }, { kana: "る", romaji: "ru" }, { kana: "れ", romaji: "re" }, { kana: "ろ", romaji: "ro" },
  { kana: "わ", romaji: "wa" }, { empty: true },           { empty: true },           { empty: true },           { kana: "を", romaji: "wo" },
  { kana: "ん", romaji: "n" },  { empty: true },           { empty: true },           { empty: true },           { empty: true },
]

const hiraganaDakuten = [
  { kana: "が", romaji: "ga" }, { kana: "ぎ", romaji: "gi" }, { kana: "ぐ", romaji: "gu" }, { kana: "げ", romaji: "ge" }, { kana: "ご", romaji: "go" },
  { kana: "ざ", romaji: "za" }, { kana: "じ", romaji: "ji" }, { kana: "ず", romaji: "zu" }, { kana: "ぜ", romaji: "ze" }, { kana: "ぞ", romaji: "zo" },
  { kana: "だ", romaji: "da" }, { kana: "ぢ", romaji: "ji" }, { kana: "づ", romaji: "zu" }, { kana: "で", romaji: "de" }, { kana: "ど", romaji: "do" },
  { kana: "ば", romaji: "ba" }, { kana: "び", romaji: "bi" }, { kana: "ぶ", romaji: "bu" }, { kana: "べ", romaji: "be" }, { kana: "ぼ", romaji: "bo" },
]

const hiraganaHandakuten = [
  { kana: "ぱ", romaji: "pa" }, { kana: "ぴ", romaji: "pi" }, { kana: "ぷ", romaji: "pu" }, { kana: "ぺ", romaji: "pe" }, { kana: "ぽ", romaji: "po" },
]

const katakanaGrid = [
  { kana: "ア", romaji: "a" }, { kana: "イ", romaji: "i" }, { kana: "ウ", romaji: "u" }, { kana: "エ", romaji: "e" }, { kana: "オ", romaji: "o" },
  { kana: "カ", romaji: "ka" }, { kana: "キ", romaji: "ki" }, { kana: "ク", romaji: "ku" }, { kana: "ケ", romaji: "ke" }, { kana: "コ", romaji: "ko" },
  { kana: "サ", romaji: "sa" }, { kana: "シ", romaji: "shi" }, { kana: "ス", romaji: "su" }, { kana: "セ", romaji: "se" }, { kana: "ソ", romaji: "so" },
  { kana: "タ", romaji: "ta" }, { kana: "チ", romaji: "chi" }, { kana: "ツ", romaji: "tsu" }, { kana: "テ", romaji: "te" }, { kana: "ト", romaji: "to" },
  { kana: "ナ", romaji: "na" }, { kana: "ニ", romaji: "ni" }, { kana: "ヌ", romaji: "nu" }, { kana: "ネ", romaji: "ne" }, { kana: "ノ", romaji: "no" },
  { kana: "ハ", romaji: "ha" }, { kana: "ヒ", romaji: "hi" }, { kana: "フ", romaji: "fu" }, { kana: "ヘ", romaji: "he" }, { kana: "ホ", romaji: "ho" },
  { kana: "マ", romaji: "ma" }, { kana: "ミ", romaji: "mi" }, { kana: "ム", romaji: "mu" }, { kana: "メ", romaji: "me" }, { kana: "モ", romaji: "mo" },
  { kana: "ヤ", romaji: "ya" }, { empty: true },           { kana: "ユ", romaji: "yu" }, { empty: true },           { kana: "ヨ", romaji: "yo" },
  { kana: "ラ", romaji: "ra" }, { kana: "リ", romaji: "ri" }, { kana: "ル", romaji: "ru" }, { kana: "レ", romaji: "re" }, { kana: "ロ", romaji: "ro" },
  { kana: "ワ", romaji: "wa" }, { empty: true },           { empty: true },           { empty: true },           { kana: "ヲ", romaji: "wo" },
  { kana: "ン", romaji: "n" },  { empty: true },           { empty: true },           { empty: true },           { empty: true },
]

const katakanaDakuten = [
  { kana: "ガ", romaji: "ga" }, { kana: "ギ", romaji: "gi" }, { kana: "グ", romaji: "gu" }, { kana: "ゲ", romaji: "ge" }, { kana: "ゴ", romaji: "go" },
  { kana: "ザ", romaji: "za" }, { kana: "ジ", romaji: "ji" }, { kana: "ズ", romaji: "zu" }, { kana: "ゼ", romaji: "ze" }, { kana: "ゾ", romaji: "zo" },
  { kana: "ダ", romaji: "da" }, { kana: "ヂ", romaji: "ji" }, { kana: "ヅ", romaji: "zu" }, { kana: "デ", romaji: "de" }, { kana: "ド", romaji: "do" },
  { kana: "バ", romaji: "ba" }, { kana: "ビ", romaji: "bi" }, { kana: "ブ", romaji: "bu" }, { kana: "ベ", romaji: "be" }, { kana: "ボ", romaji: "bo" },
]

const katakanaHandakuten = [
  { kana: "パ", romaji: "pa" }, { kana: "ピ", romaji: "pi" }, { kana: "プ", romaji: "pu" }, { kana: "ペ", romaji: "pe" }, { kana: "ポ", romaji: "po" },
]


function KanaCard({ item, index }) {
  if (item.empty) return <div /> 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.015, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -3 }}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        padding: "20px 14px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        height: "100%",
        cursor: "default",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)"}
    >
      
      <div style={{
        position: "relative", width: 72, height: 72,
        borderRadius: 12,
        background: "#f8fafc",
        border: "1px solid #f1f5f9",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300, fontSize: 40, color: "#0f172a", lineHeight: 1 }}>
          {item.kana}
        </span>
      </div>

      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: "#64748b", textTransform: "lowercase", letterSpacing: "0.05em" }}>
        {item.romaji}
      </p>
    </motion.div>
  )
}

export default function KanaPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Hiragana")

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        overflowY: "auto",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >

      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(248,250,252,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
        padding: "16px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100, fontSize: 18, color: "#64748b" }}>日本語</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#1e293b", letterSpacing: "0.02em" }}>NihongoPath</span>
          <span style={{ color: "#cbd5e1", fontSize: 13 }}>/</span>
          <span style={{ fontSize: 11, color: "#10b981", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Kana Reference</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/')}
          style={{
            background: "#0f172a", color: "#fff",
            border: "none", borderRadius: 99,
            padding: "8px 20px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11, fontWeight: 400,
            letterSpacing: "0.12em", textTransform: "uppercase",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}
        >
          ← Back to Home
        </motion.button>
      </div>

    
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 48px 100px" }}>
        
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 40, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#ecfdf5", borderRadius: 99,
            padding: "6px 14px", marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
            {/* <span style={{ fontSize: 10, fontWeight: 700, color: "#059669", letterSpacing: "0.15em", textTransform: "uppercase" }}>Foundations</span> */}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(48px, 6vw, 72px)", color: "#0f172a", lineHeight: 1 }}>
            Kana
          </h1>
          <p style={{ fontSize: 15, color: "#64748b", marginTop: 12, fontWeight: 300 }}>
            Learn Hiragana and Katakana — the foundational alphabets of Japanese.
          </p>
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 56 }}>
          <div style={{ background: "#e2e8f0", padding: 6, borderRadius: 99, display: "inline-flex", gap: 4 }}>
            {["Hiragana", "Katakana"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? "#fff" : "transparent",
                  color: activeTab === tab ? "#0f172a" : "#64748b",
                  padding: "10px 32px",
                  borderRadius: 99, border: "none", cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.05em",
                  boxShadow: activeTab === tab ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {[
              {
                title: "Gojūon (Basic)",
                desc: `The 46 foundational characters of ${activeTab}.`,
                data: activeTab === "Hiragana" ? hiraganaGrid : katakanaGrid
              },
              {
                title: "Dakuten (Voiced)",
                desc: "Characters with ゛ markers softening the consonant (k→g, s→z, t→d, h→b).",
                data: activeTab === "Hiragana" ? hiraganaDakuten : katakanaDakuten
              },
              {
                title: "Handakuten (Half-voiced)",
                desc: "Characters with ゜ markers converting h sounds to p sounds.",
                data: activeTab === "Hiragana" ? hiraganaHandakuten : katakanaHandakuten
              }
            ].map((section, sIdx) => (
              <div key={section.title} style={{ marginBottom: 64 }}>
                <div style={{ marginBottom: 24, paddingLeft: 4 }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>
                    {section.title}
                  </h2>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#94a3b8" }}>{section.desc}</p>
                </div>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 16,
                }}>
                  {section.data.map((item, i) => (
                    <KanaCard key={`${sIdx}-${i}`} item={item} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </motion.div>
  )
}
