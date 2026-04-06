import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home.jsx"
import KanjiPage from "./KanjiPage.jsx"
import KanaPage from "./KanaPage.jsx"
import VocabPage from "./VocabPage.jsx"
import GrammarPage from "./GrammarPage.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanji" element={<KanjiPage />} />
        <Route path="/vocab" element={<VocabPage />} />
        <Route path="/kana" element={<KanaPage />} />
        <Route path="/grammar" element={<GrammarPage />} />
      </Routes>
    </BrowserRouter>
  )
}
