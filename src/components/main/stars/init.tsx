import React from 'react'
import { Star } from '@/types'
import { STAR_CONFIG } from '@/consts'

export const initializeStars = (starsRef: React.MutableRefObject<Star[]>) => {
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
}
