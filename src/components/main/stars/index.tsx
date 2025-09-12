import React, { useEffect, useRef, useCallback } from 'react'
import { Star } from '@/types'
import { STAR_CONFIG } from '@/consts'

export default function OptimizedStarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  const initializeStars = useCallback(() => {
    const starArray: Star[] = []
    for (let i = 0; i < STAR_CONFIG.NUM_STARS; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius =
        Math.random() * (STAR_CONFIG.RADIUS_MAX - STAR_CONFIG.RADIUS_MIN) +
        STAR_CONFIG.RADIUS_MIN
      starArray.push({
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.5,
        z:
          Math.random() * (STAR_CONFIG.Z_MAX - STAR_CONFIG.Z_MIN) +
          STAR_CONFIG.Z_MIN,
        speed:
          STAR_CONFIG.SPEED_MIN +
          Math.random() * (STAR_CONFIG.SPEED_MAX - STAR_CONFIG.SPEED_MIN),
        initialX: Math.cos(angle) * radius,
        initialY: Math.sin(angle) * radius * 0.5,
        initialRadius: radius,
        angle: angle,
      })
    }
    starsRef.current = starArray
  }, [])

  const render = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.fillStyle = '#000814'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
      ctx.save()

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i]
        const scale =
          STAR_CONFIG.PERSPECTIVE / (star.z + STAR_CONFIG.PERSPECTIVE)
        const translateX = star.x * scale + centerX
        const translateY = star.y * scale + centerY

        if (
          translateX < -50 ||
          translateX > canvas.width + 50 ||
          translateY < -50 ||
          translateY > canvas.height + 50
        ) {
          continue
        }

        const size = Math.max(
          scale * STAR_CONFIG.STAR_SIZE_MULTIPLIER,
          STAR_CONFIG.STAR_MIN_SIZE
        )

        const distanceFromCenterX = Math.abs(translateX - centerX)
        const distanceFromCenterY = Math.abs(translateY - centerY)
        const distanceFactor =
          1 -
          Math.sqrt(
            distanceFromCenterX * distanceFromCenterX +
              distanceFromCenterY * distanceFromCenterY
          ) /
            maxDistance

        const opacity = Math.min(
          1,
          (distanceFactor * (STAR_CONFIG.Z_MAX - star.z)) /
            STAR_CONFIG.OPACITY_DIVIDER
        )
        const brightness = Math.min(
          1,
          (STAR_CONFIG.Z_MAX - star.z) / STAR_CONFIG.BRIGHTNESS_DIVIDER
        )

        if (opacity < 0.05) continue

        ctx.globalAlpha = opacity
        ctx.fillStyle = `rgb(255, 255, 255)`

        ctx.beginPath()
        ctx.arc(translateX, translateY, size / 2, 0, Math.PI * 2)
        ctx.fill()

        if (brightness > 0.3) {
          ctx.globalAlpha = opacity * brightness * 0.3
          ctx.fillStyle = `rgb(255, 220, 150)`
          ctx.beginPath()
          ctx.arc(translateX, translateY, size * 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.restore()
    },
    []
  )

  const animate = useCallback(
    (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current

      if (deltaTime >= STAR_CONFIG.FRAME_TIME) {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')

        if (canvas && ctx) {
          for (let i = 0; i < starsRef.current.length; i++) {
            const star = starsRef.current[i]
            star.z -= star.speed

            if (star.z < 1) {
              const angle = Math.random() * Math.PI * 2
              const radius =
                Math.random() *
                  (STAR_CONFIG.RADIUS_MAX - STAR_CONFIG.RADIUS_MIN) +
                STAR_CONFIG.RADIUS_MIN
              star.z = STAR_CONFIG.Z_MAX
              star.x = Math.cos(angle) * radius
              star.y = Math.sin(angle) * radius * 0.5
              star.speed =
                STAR_CONFIG.SPEED_MIN +
                Math.random() * (STAR_CONFIG.SPEED_MAX - STAR_CONFIG.SPEED_MIN)
              star.angle = angle
              star.initialRadius = radius
            }
          }

          render(ctx, canvas)
        }

        lastTimeRef.current = currentTime
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [render]
  )

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

    initializeStars()
    animationRef.current = requestAnimationFrame(animate)
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [animate, handleResize, initializeStars])

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
        background: 'radial-gradient(circle, #000814 0%, #000 80%)',
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
