import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { ViewportProvider } from '@/hooks'
import { Analytics } from "@vercel/analytics/react"
import ProgressBar from '@/components/ProgressBar'
import GamificationProvider from '@/providers/GamificationProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '300', '400'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'NihongoPath',
  description: 'Master Japanese from N5 to N1. Structured JLPT curriculum with Kanji, Grammar, and Vocabulary.',
  keywords: ['Japanese', 'JLPT', 'N5', 'Kanji', 'Grammar', 'Vocabulary', 'NihongoPath'],
  verification: {
    google: "p3IvjsCn2URCDY9_7KIZpsxilf2JwE5AcZyr3Opx95E",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${notoSansJP.variable}`}>
      <head>
        <link rel="icon" type="image/jpeg" href="/favicon.jpg" />
      </head>
      <body>
        <ProgressBar />
        <GamificationProvider>
          <ViewportProvider>
            {children}
          </ViewportProvider>
        </GamificationProvider>
        <Analytics />
      </body>
    </html>
  )
}
