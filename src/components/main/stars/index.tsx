import React, { useEffect, useRef, useCallback, useMemo } from 'react'

type Star = {
  id: number
  x: number
  y: number
  z: number
  speed: number
  initialX: number
  initialY: number
  initialRadius: number
  angle: number
}

export default function OptimizedStarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  const config = useMemo(
    () => ({
      NUM_STARS: 800, // Reduced for better performance
      Z_MAX: 2000,
      Z_MIN: 10,
      SPEED_MIN: 2,
      SPEED_MAX: 6,
      RADIUS_MIN: 1200,
      RADIUS_MAX: 3000,
      PERSPECTIVE: 1000,
      STAR_SIZE_MULTIPLIER: 3,
      STAR_MIN_SIZE: 0.3,
      OPACITY_DIVIDER: 1500,
      BRIGHTNESS_DIVIDER: 1200,
      SCALE_NEAR_Z: 100,
      SCALE_FACTOR: 50,
      TARGET_FPS: 60,
      FRAME_TIME: 1000 / 60,
    }),
    []
  )

  const initializeStars = useCallback(() => {
    const starArray: Star[] = []
    for (let i = 0; i < config.NUM_STARS; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius =
        Math.random() * (config.RADIUS_MAX - config.RADIUS_MIN) +
        config.RADIUS_MIN
      starArray.push({
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.5,
        z: Math.random() * (config.Z_MAX - config.Z_MIN) + config.Z_MIN,
        speed:
          config.SPEED_MIN +
          Math.random() * (config.SPEED_MAX - config.SPEED_MIN),
        initialX: Math.cos(angle) * radius,
        initialY: Math.sin(angle) * radius * 0.5,
        initialRadius: radius,
        angle: angle,
      })
    }
    starsRef.current = starArray
  }, [config])

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
        const scale = config.PERSPECTIVE / (star.z + config.PERSPECTIVE)
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
          scale * config.STAR_SIZE_MULTIPLIER,
          config.STAR_MIN_SIZE
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
          (distanceFactor * (config.Z_MAX - star.z)) / config.OPACITY_DIVIDER
        )
        const brightness = Math.min(
          1,
          (config.Z_MAX - star.z) / config.BRIGHTNESS_DIVIDER
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
    [config]
  )

  const animate = useCallback(
    (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current

      if (deltaTime >= config.FRAME_TIME) {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')

        if (canvas && ctx) {
          for (let i = 0; i < starsRef.current.length; i++) {
            const star = starsRef.current[i]
            star.z -= star.speed

            if (star.z < 1) {
              const angle = Math.random() * Math.PI * 2
              const radius =
                Math.random() * (config.RADIUS_MAX - config.RADIUS_MIN) +
                config.RADIUS_MIN
              star.z = config.Z_MAX
              star.x = Math.cos(angle) * radius
              star.y = Math.sin(angle) * radius * 0.5
              star.speed =
                config.SPEED_MIN +
                Math.random() * (config.SPEED_MAX - config.SPEED_MIN)
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
    [config, render]
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
