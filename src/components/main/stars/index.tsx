'use client'
import React, { useEffect, useRef, useState } from 'react'
import '@/styles/global/background.scss'

type Star = {
  id: number
  x: number
  y: number
  z: number
  speed: number
}

export default function StarsBackground() {
  const NUM_STARS = 600
  const Z_MAX = 2000
  const Z_MIN = 10
  const SPEED_MIN = 3
  const SPEED_MAX = 8
  const RADIUS_MIN = 1400
  const RADIUS_MAX = 3800
  const PERSPECTIVE = 1000
  const STAR_SIZE_MULTIPLIER = 5
  const STAR_MIN_SIZE = 0.5
  const OPACITY_DIVIDER = 1500
  const BRIGHTNESS_DIVIDER = 1200
  const SCALE_NEAR_Z = 100
  const SCALE_FACTOR = 50

  const [stars, setStars] = useState<Star[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const starArray: Star[] = []

    for (let i = 0; i < NUM_STARS; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * RADIUS_MAX + RADIUS_MIN
      starArray.push({
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.5,
        z: Math.random() * Z_MAX + Z_MIN,
        speed: SPEED_MIN + Math.random() * SPEED_MAX,
      })
    }
    setStars(starArray)

    const animate = () => {
      setStars((prevStars) =>
        prevStars.map((star) => {
          const newZ = star.z - star.speed
          if (newZ < 1) {
            const angle = Math.random() * Math.PI * 2
            const radius = Math.random() * RADIUS_MAX + RADIUS_MIN
            return {
              ...star,
              z: Z_MAX,
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius * 0.5,
              speed: SPEED_MIN + Math.random() * SPEED_MAX,
            }
          }
          return { ...star, z: newZ }
        })
      )
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="stars">
      {stars.map((star) => {
        const scale = PERSPECTIVE / (star.z + PERSPECTIVE)
        const translateX = star.x * scale + window.innerWidth / 2
        const translateY = star.y * scale + window.innerHeight / 2
        const size = Math.max(scale * STAR_SIZE_MULTIPLIER, STAR_MIN_SIZE)

        const distanceFromCenterX = Math.abs(translateX - window.innerWidth / 2)
        const distanceFromCenterY = Math.abs(
          translateY - window.innerHeight / 2
        )
        const maxDistance = Math.sqrt(
          (window.innerWidth / 2) ** 2 + (window.innerHeight / 2) ** 2
        )
        const distanceFactor =
          1 -
          Math.sqrt(distanceFromCenterX ** 2 + distanceFromCenterY ** 2) /
            maxDistance
        const opacity = Math.min(
          1,
          (distanceFactor * (Z_MAX - star.z)) / OPACITY_DIVIDER
        )
        const brightness = Math.min(1, (Z_MAX - star.z) / BRIGHTNESS_DIVIDER)

        if (opacity < 0.05) return null

        return (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${translateX - size / 2}px`,
              top: `${translateY - size / 2}px`,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, ${
                brightness * opacity
              })`,
              transform:
                star.z < SCALE_NEAR_Z
                  ? `scale(${1 + (SCALE_NEAR_Z - star.z) / SCALE_FACTOR})`
                  : 'scale(1)',
            }}
          />
        )
      })}
    </div>
  )
}
