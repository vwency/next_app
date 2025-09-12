import { STAR_CONFIG } from '@/consts'
import { Star } from '@/types'
import React from 'react'
import { render } from './render'

export const animate = (
  currentTime: number,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  starsRef: React.MutableRefObject<Star[]>,
  lastTimeRef: React.MutableRefObject<number>,
  animationRef: React.MutableRefObject<number | null>
  // eslint-disable-next-line max-params
) => {
  const deltaTime = currentTime - lastTimeRef.current

  if (deltaTime >= STAR_CONFIG.FRAME_TIME) {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (canvas && ctx) {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const screenDiagonal = Math.sqrt(
        canvas.width * canvas.width + canvas.height * canvas.height
      )

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i]
        star.z -= star.speed

        const scale =
          STAR_CONFIG.PERSPECTIVE / (star.z + STAR_CONFIG.PERSPECTIVE)
        const translateX = star.x * scale + centerX
        const translateY = star.y * scale + centerY

        const distanceFromCenter = Math.sqrt(
          (translateX - centerX) * (translateX - centerX) +
            (translateY - centerY) * (translateY - centerY)
        )

        if (star.z < 1 || distanceFromCenter > screenDiagonal * 3) {
          const angle = Math.random() * Math.PI * 2
          const radius =
            Math.random() * (STAR_CONFIG.RADIUS_MAX - STAR_CONFIG.RADIUS_MIN) +
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

      render(ctx, canvas, starsRef)
    }

    lastTimeRef.current = currentTime
  }

  animationRef.current = requestAnimationFrame((t) =>
    animate(t, canvasRef, starsRef, lastTimeRef, animationRef)
  )
}
