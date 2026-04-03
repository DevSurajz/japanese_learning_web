import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home.jsx"
import KanjiPage from "./KanjiPage.jsx"
import VocabPage from "./VocabPage.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanji" element={<KanjiPage />} />
        <Route path="/vocab" element={<VocabPage />} />
      </Routes>
    </BrowserRouter>
  )
}
