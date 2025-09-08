import { useState, useEffect } from 'react'

export const useMountedAnimation = (isOpen: boolean, delay = 400) => {
  const [mounted, setMounted] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (isOpen) {
      setAnimating(true)
    } else {
      const timer = setTimeout(() => {
        setAnimating(false)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isOpen, mounted, delay])

  return { mounted, animating }
}
