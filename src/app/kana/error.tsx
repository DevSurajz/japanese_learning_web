'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function KanaError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Kana page error:', error)
  }, [error])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 24, background: '#FAFAFA', fontFamily: "'Space Grotesk', sans-serif" }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>Something went wrong!</h2>
      <p style={{ color: 'red', marginBottom: 24, textAlign: 'center', maxWidth: 400 }}>{error.message || 'An unexpected error occurred.'}</p>
      <div style={{ display: 'flex', gap: 16 }}>
        <button
          onClick={() => reset()}
          style={{ padding: '10px 20px', background: '#0A0A0A', color: '#FFF', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Try again
        </button>
        <Link href="/" style={{ padding: '10px 20px', background: '#EAEAEA', color: '#0A0A0A', textDecoration: 'none', borderRadius: 6 }}>
          Return Home
        </Link>
      </div>
    </div>
  )
}
