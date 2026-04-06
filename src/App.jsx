import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home.jsx"

const KanjiPage = lazy(() => import("./KanjiPage.jsx"))
const KanaPage = lazy(() => import("./KanaPage.jsx"))
const VocabPage = lazy(() => import("./VocabPage.jsx"))
const GrammarPage = lazy(() => import("./GrammarPage.jsx"))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ height: "100vh", background: "#FAFAFA" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kanji" element={<KanjiPage />} />
          <Route path="/vocab" element={<VocabPage />} />
          <Route path="/kana" element={<KanaPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

