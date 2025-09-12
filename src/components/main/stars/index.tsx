import React, { useEffect, useRef, useCallback } from 'react'
import { Star } from '@/types'
import { initializeStars } from './init'
import { animate } from './animate'

export default function OptimizedStarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    initializeStars(starsRef)
    animationRef.current = requestAnimationFrame((t) =>
      animate(t, canvasRef, starsRef, lastTimeRef, animationRef)
    )
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: -1,
        background:
          'radial-gradient(ellipse at center, #001122 0%, #000814 40%, #000 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  )
}
