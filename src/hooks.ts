"use client"

import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

interface ViewportContextType {
  width: number
  isMobile: boolean
  isTablet: boolean
}

const ViewportContext = createContext<ViewportContextType>({
  width: 1200,
  isMobile: false,
  isTablet: false,
})

export function ViewportProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [width, setWidth] = useState(1200) // Default fallback

  useEffect(() => {
    setMounted(true)
    setWidth(window.innerWidth)

    let frame = 0
    const handleResize = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        setWidth(window.innerWidth)
      })
    }

    window.addEventListener("resize", handleResize, { passive: true })
    return () => {
      window.removeEventListener("resize", handleResize)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const value = useMemo(() => ({
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
  }), [width])

  return createElement(ViewportContext.Provider, { value }, children)
}

export function useViewport() {
  return useContext(ViewportContext)
}

export function useWindowWidth() {
  return useViewport().width
}

export function useIsMobile() {
  return useViewport().isMobile
}

export function useIsTablet() {
  return useViewport().isTablet
}
