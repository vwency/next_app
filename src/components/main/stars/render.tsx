import { Star } from '@/types'
import { STAR_CONFIG } from '@/consts'

export const render = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  starsRef: React.MutableRefObject<Star[]>
) => {
  ctx.fillStyle = '#000814'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
  ctx.save()

  for (let i = 0; i < starsRef.current.length; i++) {
    const star = starsRef.current[i]
    const scale = STAR_CONFIG.PERSPECTIVE / (star.z + STAR_CONFIG.PERSPECTIVE)
    const translateX = star.x * scale + centerX
    const translateY = star.y * scale + centerY

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

    let opacity = Math.min(
      1,
      (distanceFactor * (STAR_CONFIG.Z_MAX - star.z)) /
        STAR_CONFIG.OPACITY_DIVIDER
    )

    if (
      translateX >= -50 &&
      translateX <= canvas.width + 50 &&
      translateY >= -50 &&
      translateY <= canvas.height + 50
    ) {
      opacity = Math.max(opacity, 0.15)
    }
    const brightness = Math.min(
      1,
      (STAR_CONFIG.Z_MAX - star.z) / STAR_CONFIG.BRIGHTNESS_DIVIDER
    )

    if (opacity < 0.02) continue

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
}
