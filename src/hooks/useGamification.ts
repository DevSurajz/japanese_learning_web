import { useState, useCallback } from 'react'
import { useAnimation } from 'framer-motion'

export function useGamification() {
  const controls = useAnimation()
  const [isError, setIsError] = useState(false)

  const triggerError = useCallback(() => {
    setIsError(true)
    controls.start({
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }).then(() => {
      setIsError(false)
    })
  }, [controls])

  const triggerSuccess = useCallback(() => {
    // We could trigger confetti or a subtle green pulse here
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    })
  }, [controls])

  return {
    controls,
    isError,
    triggerError,
    triggerSuccess
  }
}
