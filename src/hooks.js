import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react"

const ViewportContext = createContext({
  width: 1200,
  isMobile: false,
  isTablet: false,
})

export function ViewportProvider({ children }) {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  useEffect(() => {
    if (typeof window === "undefined") return undefined

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
