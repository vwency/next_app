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
    const distanceFromCenter = Math.sqrt(
      distanceFromCenterX * distanceFromCenterX +
        distanceFromCenterY * distanceFromCenterY
    )
    const distanceFactor = 1 - distanceFromCenter / maxDistance

    const zFactor = (STAR_CONFIG.Z_MAX - star.z) / STAR_CONFIG.Z_MAX
    const scaleFactor = Math.pow(scale, 0.3)

    let opacity =
      STAR_CONFIG.OPACITY_BASE +
      distanceFactor *
        STAR_CONFIG.OPACITY_DISTANCE_FACTOR *
        zFactor *
        scaleFactor

    const brightness =
      STAR_CONFIG.BRIGHTNESS_BASE +
      zFactor * STAR_CONFIG.BRIGHTNESS_DISTANCE_FACTOR * scaleFactor

    if (
      translateX >= -100 &&
      translateX <= canvas.width + 100 &&
      translateY >= -100 &&
      translateY <= canvas.height + 100
    ) {
      opacity = Math.max(opacity, 0.25)
    }

    opacity = Math.min(opacity, 1)

    if (opacity < 0.03) continue

    ctx.globalAlpha = opacity
    ctx.fillStyle = `rgb(255, 255, 255)`
    ctx.beginPath()
    ctx.arc(translateX, translateY, size / 2, 0, Math.PI * 2)
    ctx.fill()

    if (brightness > 0.4 && scale > 0.3) {
      const glowSize = size * (1.8 + scaleFactor * 0.5)
      const glowOpacity = opacity * brightness * 0.4 * scaleFactor

      ctx.globalAlpha = glowOpacity
      ctx.fillStyle = `rgb(255, 230, 180)`
      ctx.beginPath()
      ctx.arc(translateX, translateY, glowSize, 0, Math.PI * 2)
      ctx.fill()

      if (scale > 0.8) {
        ctx.globalAlpha = glowOpacity * 0.6
        ctx.fillStyle = `rgb(255, 200, 100)`
        ctx.beginPath()
        ctx.arc(translateX, translateY, glowSize * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  ctx.restore()
}
