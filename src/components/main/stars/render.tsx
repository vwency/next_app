import { Star } from '@/types'
import { STAR_CONFIG } from '@/consts'
import '@/styles/global/star.scss'

export const render = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  starsRef: React.MutableRefObject<Star[]>
) => {
  const style = getComputedStyle(document.documentElement)

  const STAR_BASE = style.getPropertyValue('--star-base-color') || '255,255,255'
  const STAR_GLOW_1 =
    style.getPropertyValue('--star-glow-color-1') || '255,230,180'
  const STAR_GLOW_2 =
    style.getPropertyValue('--star-glow-color-2') || '255,200,100'
  const STAR_BG = style.getPropertyValue('--star-background-color') || '#000814'
  const MIN_OPACITY =
    parseFloat(style.getPropertyValue('--star-min-opacity')) || 0.25
  const GLOW_OPACITY_MULT =
    parseFloat(style.getPropertyValue('--star-glow-opacity-multiplier')) || 0.4
  const GLOW_SCALE =
    parseFloat(style.getPropertyValue('--star-glow-scale-factor')) || 0.5

  ctx.fillStyle = STAR_BG
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

    const distanceFromCenter = Math.hypot(
      translateX - centerX,
      translateY - centerY
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

    if (
      translateX >= -100 &&
      translateX <= canvas.width + 100 &&
      translateY >= -100 &&
      translateY <= canvas.height + 100
    ) {
      opacity = Math.max(opacity, MIN_OPACITY)
    }

    opacity = Math.min(opacity, 1)
    if (opacity < 0.03) continue

    ctx.globalAlpha = opacity
    ctx.fillStyle = `rgb(${STAR_BASE})`
    ctx.beginPath()
    ctx.arc(translateX, translateY, size / 2, 0, Math.PI * 2)
    ctx.fill()

    const brightness =
      STAR_CONFIG.BRIGHTNESS_BASE +
      zFactor * STAR_CONFIG.BRIGHTNESS_DISTANCE_FACTOR * scaleFactor

    if (brightness > 0.4 && scale > 0.3) {
      const glowSize = size * (1.8 + scaleFactor * GLOW_SCALE)
      const glowOpacity = opacity * brightness * GLOW_OPACITY_MULT * scaleFactor

      ctx.globalAlpha = glowOpacity
      ctx.fillStyle = `rgb(${STAR_GLOW_1})`
      ctx.beginPath()
      ctx.arc(translateX, translateY, glowSize, 0, Math.PI * 2)
      ctx.fill()

      if (scale > 0.8) {
        ctx.globalAlpha = glowOpacity * 0.6
        ctx.fillStyle = `rgb(${STAR_GLOW_2})`
        ctx.beginPath()
        ctx.arc(translateX, translateY, glowSize * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  ctx.restore()
}
