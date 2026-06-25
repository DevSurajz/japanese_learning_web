'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  kanji: string
}

export default function StrokeOrderViewer({ kanji }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [strokeCount, setStrokeCount] = useState(0)
  const [error, setError] = useState(false)
  const timers = useRef<NodeJS.Timeout[]>([])

  const animate = async () => {
    if (!containerRef.current) return
    setError(false)

    const code = kanji.codePointAt(0)!.toString(16).padStart(5, '0')

    try {
      const res = await fetch(`/kanjivg/${code}.svg`)
      if (!res.ok) throw new Error('not found')
      const svgText = await res.text()

      const cleanedSvgText = svgText.substring(svgText.indexOf('<svg'))
      containerRef.current.innerHTML = cleanedSvgText
      const svg = containerRef.current.querySelector('svg')
      if (!svg) throw new Error('no svg')

      // size it to fit the modal
      svg.setAttribute('width', '130')
      svg.setAttribute('height', '130')
      svg.setAttribute('viewBox', '0 0 109 109')

      const paths = Array.from(svg.querySelectorAll('path'))
      setStrokeCount(paths.length)

      // hide all strokes initially
      paths.forEach((path) => {
        const len = path.getTotalLength()
        path.style.strokeDasharray = String(len)
        path.style.strokeDashoffset = String(len)
        path.style.stroke = '#2d2d6b'
        path.style.strokeWidth = '3'
        path.style.fill = 'none'
        path.style.transition = 'none'
      })

      // clear old timers
      timers.current.forEach(clearTimeout)
      timers.current = []

      // animate strokes one by one
      setPlaying(true)
      paths.forEach((path, i) => {
        const t = setTimeout(() => {
          path.style.transition = 'stroke-dashoffset 0.45s ease-in-out'
          path.style.strokeDashoffset = '0'
          if (i === paths.length - 1) setPlaying(false)
        }, i * 600)
        timers.current.push(t)
      })
    } catch {
      setError(true)
      setPlaying(false)
    }
  }

  useEffect(() => {
    animate()
    return () => timers.current.forEach(clearTimeout)
  }, [kanji])

  if (error) {
    return (
      <p style={{ fontSize: 12, color: '#999', textAlign: 'center', padding: '24px 0' }}>
        Stroke order not available for this character.
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '8px 0' }}>
      {/* SVG canvas */}
      <div
        ref={containerRef}
        style={{
          border: '1.5px solid #e8eaf6',
          borderRadius: 12,
          padding: 8,
          minHeight: 146,
          minWidth: 146,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafafa',
        }}
      />

      {/* stroke count */}
      {strokeCount > 0 && (
        <p style={{ fontSize: 11, color: '#999', margin: 0 }}>
          {strokeCount} stroke{strokeCount !== 1 ? 's' : ''}
        </p>
      )}

      {/* controls */}
      <button
        onClick={animate}
        disabled={playing}
        style={{
          fontSize: 12,
          padding: '5px 16px',
          borderRadius: 20,
          border: '1px solid #c7c9e8',
          background: playing ? '#f3f4f6' : 'white',
          color: playing ? '#aaa' : '#4a4aad',
          cursor: playing ? 'not-allowed' : 'pointer',
          fontWeight: 500,
        }}
      >
        {playing ? 'Animating...' : '↺ Replay'}
      </button>
    </div>
  )
}
