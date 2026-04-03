import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router-dom"
const kanjiData = [
  { kanji: "一", meaning: "One", strokes: 1, onyomi: ["イチ", "イツ"], kunyomi: ["ひと", "ひとつ"], examples: ["一つ (ひとつ) — one thing", "一月 (いちがつ) — January"] },
  { kanji: "二", meaning: "Two", strokes: 2, onyomi: ["ニ"], kunyomi: ["ふた", "ふたつ"], examples: ["二つ (ふたつ) — two things", "二月 (にがつ) — February"] },
  { kanji: "三", meaning: "Three", strokes: 3, onyomi: ["サン"], kunyomi: ["み", "みっつ"], examples: ["三つ (みっつ) — three things", "三月 (さんがつ) — March"] },
  { kanji: "四", meaning: "Four", strokes: 5, onyomi: ["シ"], kunyomi: ["よ", "よっつ", "よん"], examples: ["四つ (よっつ) — four things", "四月 (しがつ) — April"] },
  { kanji: "五", meaning: "Five", strokes: 4, onyomi: ["ゴ"], kunyomi: ["いつ", "いつつ"], examples: ["五つ (いつつ) — five things", "五月 (ごがつ) — May"] },
  { kanji: "六", meaning: "Six", strokes: 4, onyomi: ["ロク"], kunyomi: ["む", "むっつ"], examples: ["六つ (むっつ) — six things", "六月 (ろくがつ) — June"] },
  { kanji: "七", meaning: "Seven", strokes: 2, onyomi: ["シチ"], kunyomi: ["なな", "ななつ"], examples: ["七つ (ななつ) — seven things", "七月 (しちがつ) — July"] },
  { kanji: "八", meaning: "Eight", strokes: 2, onyomi: ["ハチ"], kunyomi: ["や", "やっつ"], examples: ["八つ (やっつ) — eight things", "八月 (はちがつ) — August"] },
  { kanji: "九", meaning: "Nine", strokes: 2, onyomi: ["キュウ", "ク"], kunyomi: ["ここの", "ここのつ"], examples: ["九つ (ここのつ) — nine things", "九月 (くがつ) — September"] },
  { kanji: "十", meaning: "Ten", strokes: 2, onyomi: ["ジュウ", "ジッ"], kunyomi: ["とお", "と"], examples: ["十 (じゅう) — ten", "十月 (じゅうがつ) — October"] },
  { kanji: "百", meaning: "Hundred", strokes: 6, onyomi: ["ヒャク"], kunyomi: [], examples: ["百円 (ひゃくえん) — 100 yen", "三百 (さんびゃく) — 300"] },
  { kanji: "千", meaning: "Thousand", strokes: 3, onyomi: ["セン"], kunyomi: ["ち"], examples: ["千円 (せんえん) — 1000 yen", "三千 (さんぜん) — 3000"] },
  { kanji: "万", meaning: "Ten Thousand", strokes: 3, onyomi: ["マン", "バン"], kunyomi: [], examples: ["一万円 (いちまんえん) — 10,000 yen", "万年筆 — fountain pen"] },
  { kanji: "円", meaning: "Yen / Circle", strokes: 4, onyomi: ["エン"], kunyomi: ["まるい"], examples: ["百円 (ひゃくえん) — 100 yen", "円い (まるい) — round"] },
  { kanji: "時", meaning: "Time / Hour", strokes: 10, onyomi: ["ジ"], kunyomi: ["とき"], examples: ["何時 (なんじ) — what time", "時間 (じかん) — time / hours"] },
  { kanji: "年", meaning: "Year", strokes: 6, onyomi: ["ネン"], kunyomi: ["とし"], examples: ["今年 (ことし) — this year", "来年 (らいねん) — next year"] },
  { kanji: "月", meaning: "Moon / Month", strokes: 4, onyomi: ["ゲツ", "ガツ"], kunyomi: ["つき"], examples: ["今月 (こんげつ) — this month", "月曜日 — Monday"] },
  { kanji: "日", meaning: "Sun / Day", strokes: 4, onyomi: ["ニチ", "ジツ"], kunyomi: ["ひ", "か"], examples: ["今日 (きょう) — today", "日本 (にほん) — Japan"] },
  { kanji: "上", meaning: "Up / Above", strokes: 3, onyomi: ["ジョウ", "ショウ"], kunyomi: ["うえ", "のぼる"], examples: ["上手 (じょうず) — skilled", "上 (うえ) — above"] },
  { kanji: "下", meaning: "Down / Below", strokes: 3, onyomi: ["カ", "ゲ"], kunyomi: ["した", "くだる"], examples: ["下手 (へた) — unskilled", "下 (した) — below"] },
  { kanji: "右", meaning: "Right", strokes: 5, onyomi: ["ウ", "ユウ"], kunyomi: ["みぎ"], examples: ["右手 (みぎて) — right hand", "右折 (うせつ) — turn right"] },
  { kanji: "左", meaning: "Left", strokes: 5, onyomi: ["サ"], kunyomi: ["ひだり"], examples: ["左手 (ひだりて) — left hand", "左折 (させつ) — turn left"] },
  { kanji: "中", meaning: "Middle / Inside", strokes: 4, onyomi: ["チュウ"], kunyomi: ["なか"], examples: ["中学校 — middle school", "中 (なか) — inside"] },
  { kanji: "北", meaning: "North", strokes: 5, onyomi: ["ホク"], kunyomi: ["きた"], examples: ["北口 (きたぐち) — north exit", "北海道 — Hokkaido"] },
  { kanji: "南", meaning: "South", strokes: 9, onyomi: ["ナン", "ナ"], kunyomi: ["みなみ"], examples: ["南口 (みなみぐち) — south exit", "南米 — South America"] },
  { kanji: "東", meaning: "East", strokes: 8, onyomi: ["トウ"], kunyomi: ["ひがし"], examples: ["東京 (とうきょう) — Tokyo", "東口 (ひがしぐち) — east exit"] },
  { kanji: "西", meaning: "West", strokes: 6, onyomi: ["セイ", "サイ"], kunyomi: ["にし"], examples: ["西口 (にしぐち) — west exit", "関西 (かんさい) — Kansai"] },
  { kanji: "人", meaning: "Person", strokes: 2, onyomi: ["ジン", "ニン"], kunyomi: ["ひと"], examples: ["日本人 (にほんじん) — Japanese person", "人 (ひと) — person"] },
  { kanji: "今", meaning: "Now / This", strokes: 4, onyomi: ["コン", "キン"], kunyomi: ["いま"], examples: ["今日 (きょう) — today", "今 (いま) — now"] },
  { kanji: "休", meaning: "Rest", strokes: 6, onyomi: ["キュウ"], kunyomi: ["やすむ"], examples: ["休日 (きゅうじつ) — holiday", "休む (やすむ) — to rest"] },
  { kanji: "会", meaning: "Meet / Society", strokes: 6, onyomi: ["カイ", "エ"], kunyomi: ["あう"], examples: ["会社 (かいしゃ) — company", "会う (あう) — to meet"] },
  { kanji: "何", meaning: "What", strokes: 7, onyomi: ["カ"], kunyomi: ["なに", "なん"], examples: ["何 (なに) — what", "何時 (なんじ) — what time"] },
  { kanji: "先", meaning: "Before / Ahead", strokes: 6, onyomi: ["セン"], kunyomi: ["さき"], examples: ["先生 (せんせい) — teacher", "先 (さき) — ahead"] },
  { kanji: "入", meaning: "Enter", strokes: 2, onyomi: ["ニュウ"], kunyomi: ["いる", "はいる"], examples: ["入口 (いりぐち) — entrance", "入る (はいる) — enter"] },
  { kanji: "出", meaning: "Exit / Go out", strokes: 5, onyomi: ["シュツ", "スイ"], kunyomi: ["でる", "だす"], examples: ["出口 (でぐち) — exit", "出る (でる) — to leave"] },
  { kanji: "分", meaning: "Minute / Understand", strokes: 4, onyomi: ["フン", "ブン"], kunyomi: ["わかる"], examples: ["五分 (ごふん) — 5 minutes", "分かる (わかる) — understand"] },
  { kanji: "前", meaning: "Before / Front", strokes: 9, onyomi: ["ゼン"], kunyomi: ["まえ"], examples: ["午前 (ごぜん) — AM", "前 (まえ) — in front of"] },
  { kanji: "午", meaning: "Noon", strokes: 4, onyomi: ["ゴ"], kunyomi: [], examples: ["午前 (ごぜん) — AM", "午後 (ごご) — PM"] },
  { kanji: "半", meaning: "Half", strokes: 5, onyomi: ["ハン"], kunyomi: ["なかば"], examples: ["半分 (はんぶん) — half", "三時半 — 3:30"] },
  { kanji: "友", meaning: "Friend", strokes: 4, onyomi: ["ユウ"], kunyomi: ["とも"], examples: ["友達 (ともだち) — friend", "友人 (ゆうじん) — friend (formal)"] },
  { kanji: "父", meaning: "Father", strokes: 4, onyomi: ["フ"], kunyomi: ["ちち"], examples: ["父 (ちち) — my father", "父親 (ちちおや) — father"] },
  { kanji: "母", meaning: "Mother", strokes: 5, onyomi: ["ボ"], kunyomi: ["はは"], examples: ["母 (はは) — my mother", "母親 (ははおや) — mother"] },
  { kanji: "子", meaning: "Child", strokes: 3, onyomi: ["シ", "ス"], kunyomi: ["こ"], examples: ["子供 (こども) — child", "女子 (じょし) — girl"] },
  { kanji: "女", meaning: "Woman", strokes: 3, onyomi: ["ジョ", "ニョ"], kunyomi: ["おんな"], examples: ["女性 (じょせい) — woman", "女の子 — girl"] },
  { kanji: "学", meaning: "Study / Learn", strokes: 8, onyomi: ["ガク"], kunyomi: ["まなぶ"], examples: ["学生 (がくせい) — student", "学校 (がっこう) — school"] },
  { kanji: "生", meaning: "Life / Birth", strokes: 5, onyomi: ["セイ", "ショウ"], kunyomi: ["いきる", "うまれる"], examples: ["学生 (がくせい) — student", "先生 (せんせい) — teacher"] },
  { kanji: "山", meaning: "Mountain", strokes: 3, onyomi: ["サン"], kunyomi: ["やま"], examples: ["富士山 (ふじさん) — Mt. Fuji", "山 (やま) — mountain"] },
  { kanji: "川", meaning: "River", strokes: 3, onyomi: ["セン"], kunyomi: ["かわ"], examples: ["川 (かわ) — river", "神奈川 — Kanagawa"] },
  { kanji: "天", meaning: "Heaven / Sky", strokes: 4, onyomi: ["テン"], kunyomi: ["あめ", "あま"], examples: ["天気 (てんき) — weather", "天ぷら — tempura"] },
  { kanji: "気", meaning: "Spirit / Energy", strokes: 6, onyomi: ["キ", "ケ"], kunyomi: [], examples: ["天気 (てんき) — weather", "元気 (げんき) — energetic"] },
  { kanji: "水", meaning: "Water", strokes: 4, onyomi: ["スイ"], kunyomi: ["みず"], examples: ["水曜日 — Wednesday", "水 (みず) — water"] },
  { kanji: "火", meaning: "Fire", strokes: 4, onyomi: ["カ"], kunyomi: ["ひ"], examples: ["火曜日 — Tuesday", "火事 (かじ) — fire / blaze"] },
  { kanji: "木", meaning: "Tree / Wood", strokes: 4, onyomi: ["モク", "ボク"], kunyomi: ["き"], examples: ["木曜日 — Thursday", "木 (き) — tree"] },
  { kanji: "金", meaning: "Gold / Money", strokes: 8, onyomi: ["キン", "コン"], kunyomi: ["かね"], examples: ["金曜日 — Friday", "お金 (おかね) — money"] },
  { kanji: "土", meaning: "Earth / Soil", strokes: 3, onyomi: ["ド", "ト"], kunyomi: ["つち"], examples: ["土曜日 — Saturday", "土 (つち) — soil"] },
  { kanji: "本", meaning: "Book / Origin", strokes: 5, onyomi: ["ホン"], kunyomi: ["もと"], examples: ["日本 (にほん) — Japan", "本 (ほん) — book"] },
  { kanji: "校", meaning: "School", strokes: 10, onyomi: ["コウ"], kunyomi: [], examples: ["学校 (がっこう) — school", "高校 (こうこう) — high school"] },
  { kanji: "店", meaning: "Shop / Store", strokes: 8, onyomi: ["テン"], kunyomi: ["みせ"], examples: ["店 (みせ) — shop", "お店 (おみせ) — store"] },
  { kanji: "車", meaning: "Car / Vehicle", strokes: 7, onyomi: ["シャ"], kunyomi: ["くるま"], examples: ["電車 (でんしゃ) — train", "車 (くるま) — car"] },
  { kanji: "電", meaning: "Electricity", strokes: 13, onyomi: ["デン"], kunyomi: [], examples: ["電車 (でんしゃ) — train", "電話 (でんわ) — telephone"] },
  { kanji: "駅", meaning: "Station", strokes: 14, onyomi: ["エキ"], kunyomi: [], examples: ["駅 (えき) — station", "東京駅 — Tokyo Station"] },
  { kanji: "社", meaning: "Company / Shrine", strokes: 7, onyomi: ["シャ", "ジャ"], kunyomi: ["やしろ"], examples: ["会社 (かいしゃ) — company", "神社 (じんじゃ) — shrine"] },
  { kanji: "空", meaning: "Sky / Empty", strokes: 8, onyomi: ["クウ"], kunyomi: ["そら", "から"], examples: ["空 (そら) — sky", "空港 (くうこう) — airport"] },
  { kanji: "語", meaning: "Language / Word", strokes: 14, onyomi: ["ゴ"], kunyomi: ["かたる"], examples: ["日本語 (にほんご) — Japanese", "英語 (えいご) — English"] },
  { kanji: "読", meaning: "Read", strokes: 14, onyomi: ["ドク", "トク"], kunyomi: ["よむ"], examples: ["読む (よむ) — to read", "読書 (どくしょ) — reading"] },
  { kanji: "書", meaning: "Write", strokes: 10, onyomi: ["ショ"], kunyomi: ["かく"], examples: ["書く (かく) — to write", "教科書 — textbook"] },
  { kanji: "話", meaning: "Talk / Speech", strokes: 13, onyomi: ["ワ"], kunyomi: ["はなす", "はなし"], examples: ["話す (はなす) — to speak", "電話 (でんわ) — telephone"] },
  { kanji: "見", meaning: "See / Look", strokes: 7, onyomi: ["ケン"], kunyomi: ["みる"], examples: ["見る (みる) — to see / watch", "意見 (いけん) — opinion"] },
  { kanji: "行", meaning: "Go", strokes: 6, onyomi: ["コウ", "ギョウ"], kunyomi: ["いく", "おこなう"], examples: ["行く (いく) — to go", "銀行 (ぎんこう) — bank"] },
  { kanji: "来", meaning: "Come", strokes: 7, onyomi: ["ライ"], kunyomi: ["くる", "きたる"], examples: ["来る (くる) — to come", "来年 (らいねん) — next year"] },
  { kanji: "食", meaning: "Eat / Food", strokes: 9, onyomi: ["ショク", "ジキ"], kunyomi: ["たべる"], examples: ["食べる (たべる) — to eat", "食事 (しょくじ) — meal"] },
  { kanji: "飲", meaning: "Drink", strokes: 12, onyomi: ["イン"], kunyomi: ["のむ"], examples: ["飲む (のむ) — to drink", "飲み物 (のみもの) — beverage"] },
  { kanji: "雨", meaning: "Rain", strokes: 8, onyomi: ["ウ"], kunyomi: ["あめ", "あま"], examples: ["雨 (あめ) — rain", "雨天 (うてん) — rainy weather"] },
  { kanji: "高", meaning: "High / Tall / Expensive", strokes: 10, onyomi: ["コウ"], kunyomi: ["たかい"], examples: ["高い (たかい) — expensive / tall", "高校 (こうこう) — high school"] },
]

const CARDS_PER_PAGE = 20
function KanjiModal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="modal-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            padding: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 24,
              boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
              width: "100%", maxWidth: 460,
              padding: 36,
              display: "flex", flexDirection: "column", gap: 24,
              position: "relative",
            }}
          >
            
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: 18, right: 18,
                background: "#f1f5f9", border: "none", borderRadius: "50%",
                width: 32, height: 32, cursor: "pointer",
                fontSize: 14, color: "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >✕</button>

            
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                position: "relative", width: 110, height: 110, flexShrink: 0,
                border: "2px solid #bfdbfe", borderRadius: 16,
                background: "rgba(239,246,255,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#bfdbfe" }} />
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#bfdbfe" }} />
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100, fontSize: 60, color: "#1e293b", lineHeight: 1, position: "relative" }}>
                  {item.kanji}
                </span>
              </div>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>
                  {item.meaning}
                </h2>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                  {item.strokes} strokes
                </p>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {Array.from({ length: item.strokes }).map((_, i) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04, duration: 0.2 }}
                      style={{ width: 8, height: 8, borderRadius: "50%", background: "#93c5fd" }} />
                  ))}
                </div>
              </div>
            </div>

            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "On'yomi", data: item.onyomi, bg: "#eef2ff", pillBg: "#c7d2fe", pillText: "#3730a3", labelColor: "#818cf8" },
                { label: "Kun'yomi", data: item.kunyomi, bg: "#f0fdf4", pillBg: "#bbf7d0", pillText: "#166534", labelColor: "#4ade80" },
              ].map(({ label, data, bg, pillBg, pillText, labelColor }) => (
                <div key={label} style={{ background: bg, borderRadius: 16, padding: "16px 18px" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600, color: labelColor, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                    {label}
                  </p>
                  {data.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {data.map((r, i) => (
                        <span key={i} style={{ background: pillBg, color: pillText, borderRadius: 99, padding: "3px 10px", fontSize: 13, fontFamily: "'Noto Sans JP', sans-serif" }}>{r}</span>
                      ))}
                    </div>
                  ) : <span style={{ color: "#cbd5e1", fontSize: 13 }}>—</span>}
                </div>
              ))}
            </div>

            
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600, color: "#cbd5e1", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                Example Words
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {item.examples.map((ex, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#93c5fd", marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, color: "#475569", lineHeight: 1.6 }}>{ex}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            
            <motion.button
              whileHover={{ scale: 1.02, background: "#334155" }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "#0f172a", color: "#fff",
                border: "none", borderRadius: 14,
                padding: "15px 24px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400, fontSize: 12,
                letterSpacing: "0.2em", textTransform: "uppercase",
                cursor: "pointer", transition: "background 0.3s",
              }}
            >
              ✏️ Practice Writing
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
function KanjiCard({ item, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.42, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -4 }}
      onClick={() => onClick(item)}
      style={{ cursor: "pointer" }}
    >
      <div style={{
        background: "#fff",
        borderRadius: 18,
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        padding: "22px 16px 20px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        height: "100%",
        transition: "box-shadow 0.4s ease",
      }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"}
        onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"}
      >
        
        <div style={{
          position: "relative", width: 90, height: 90,
          border: "2px solid #bfdbfe", borderRadius: 14,
          background: "rgba(239,246,255,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#dbeafe" }} />
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#dbeafe" }} />
          <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 100, fontSize: 46, color: "#1e293b", lineHeight: 1, position: "relative" }}>
            {item.kanji}
          </span>
        </div>

        
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13, color: "#334155", textAlign: "center", lineHeight: 1.3 }}>
          {item.meaning}
        </p>

        
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: "#cbd5e1", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {item.strokes} strokes
        </p>

        
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center" }}>
          {item.onyomi.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#eef2ff", borderRadius: 99, padding: "3px 10px" }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#a5b4fc", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>On</span>
              <span style={{ fontSize: 11, color: "#4338ca", fontFamily: "'Noto Sans JP', sans-serif" }}>{item.onyomi.slice(0, 2).join("・")}</span>
            </div>
          )}
          {item.kunyomi.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#f0fdf4", borderRadius: 99, padding: "3px 10px" }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#86efac", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>Kun</span>
              <span style={{ fontSize: 11, color: "#166534", fontFamily: "'Noto Sans JP', sans-serif" }}>{item.kunyomi.slice(0, 1).join("・")}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
export default function KanjiPage() {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return kanjiData
    return kanjiData.filter(k =>
      k.kanji.includes(q) ||
      k.meaning.toLowerCase().includes(q) ||
      k.onyomi.some(r => r.includes(q)) ||
      k.kunyomi.some(r => r.includes(q))
    )
  }, [search])

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
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
          <span style={{ fontSize: 11, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>N5 Kanji</span>
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

      
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 48px 80px" }}>

        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#eff6ff", borderRadius: 99,
            padding: "6px 14px", marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.15em", textTransform: "uppercase" }}>JLPT N5</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(40px, 5vw, 64px)", color: "#0f172a", lineHeight: 1.1 }}>
                N5 Kanji
              </h1>
              <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 8, fontWeight: 300 }}>
                Learn stroke order, meaning, and readings — <strong style={{ color: "#475569", fontWeight: 500 }}>{kanjiData.length} kanji</strong> total
              </p>
            </div>
            
            <div style={{ display: "flex", gap: 0 }}>
              {[
                { value: kanjiData.length, label: "Total" },
                { value: `${page}/${totalPages}`, label: "Page" },
                { value: paginated.length, label: "Showing" },
              ].map(({ value, label }, i) => (
                <div key={label} style={{
                  textAlign: "center",
                  borderTop: "2px solid #0f172a",
                  paddingTop: 10, paddingBottom: 14,
                  paddingLeft: i === 0 ? 0 : 24,
                  paddingRight: i === 2 ? 0 : 24,
                  borderRight: i < 2 ? "1px solid #e2e8f0" : "none",
                  minWidth: 70,
                }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: "#0f172a", lineHeight: 1 }}>{value}</p>
                  <p style={{ fontSize: 9, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          
          <div style={{ position: "relative", maxWidth: 420, marginBottom: 48 }}>
            <input
              type="text"
              placeholder="Search kanji, meaning, or reading…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              style={{
                width: "100%",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "12px 16px 12px 42px",
                fontSize: 14, color: "#334155",
                fontFamily: "'Space Grotesk', sans-serif",
                outline: "none",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onFocus={e => { e.target.style.borderColor = "#a5b4fc"; e.target.style.boxShadow = "0 0 0 3px rgba(165,180,252,0.15)" }}
              onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)" }}
            />
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#cbd5e1" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        
        <AnimatePresence mode="wait">
          <motion.div
            key={page + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: 16,
            }}
          >
            {paginated.length > 0 ? paginated.map((item, i) => (
              <KanjiCard key={item.kanji} item={item} index={i} onClick={setSelected} />
            )) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "64px 0", color: "#cbd5e1", fontSize: 16 }}>
                No kanji found for "{search}"
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 56 }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: "8px 18px", borderRadius: 99, border: "1px solid #e2e8f0",
                background: "#fff", fontSize: 13, color: "#64748b",
                cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1,
                fontFamily: "'Space Grotesk', sans-serif",
              }}>← Prev</motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
              <motion.button key={pg} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => setPage(pg)}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid",
                  borderColor: pg === page ? "#0f172a" : "#e2e8f0",
                  background: pg === page ? "#0f172a" : "#fff",
                  color: pg === page ? "#fff" : "#64748b",
                  fontSize: 13, cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>{pg}</motion.button>
            ))}

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: "8px 18px", borderRadius: 99, border: "1px solid #e2e8f0",
                background: "#fff", fontSize: 13, color: "#64748b",
                cursor: page === totalPages ? "not-allowed" : "pointer",
                opacity: page === totalPages ? 0.4 : 1,
                fontFamily: "'Space Grotesk', sans-serif",
              }}>Next →</motion.button>
          </div>
        )}
      </div>

      
      <KanjiModal item={selected} onClose={() => setSelected(null)} />
    </motion.div>
  )
}
