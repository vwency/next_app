import { useState, useRef, useEffect, useCallback, useMemo } from 'react'

interface UseCardItemHoverProps {
  detailedDescription?: string
  imageRef?: React.RefObject<HTMLDivElement | null>
}

const DESCRIPTION_HEIGHT_REM = 3.2
const DETAILED_PADDING_REM = 0.5

let resizeTimeout: NodeJS.Timeout | null = null

export const useCardItemHover = ({
  detailedDescription = '',
  imageRef,
}: UseCardItemHoverProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const detailedRef = useRef<HTMLDivElement>(null)
  const [detailedHeight, setDetailedHeight] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)

  const heightCache = useRef<{
    imageHeight?: number
    detailedHeight?: number
    remToPx?: number
  }>({})

  const remToPx = useMemo(() => {
    if (heightCache.current.remToPx) {
      return (rem: number) => rem * heightCache.current.remToPx!
    }

    if (typeof window === 'undefined' || typeof document === 'undefined') {
      const fallback = 16
      heightCache.current.remToPx = fallback
      return (rem: number) => rem * fallback
    }

    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    )
    heightCache.current.remToPx = rootFontSize

    return (rem: number) => rem * rootFontSize
  }, [])

  const supportsHover = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(hover: hover)').matches
  }, [])

  const measureHeights = useCallback(() => {
    if (!supportsHover && !detailedDescription) return

    let newImageHeight = imageHeight
    let newDetailedHeight = detailedHeight

    if (imageRef?.current) {
      const currentImageHeight = imageRef.current.offsetHeight
      if (currentImageHeight !== heightCache.current.imageHeight) {
        newImageHeight = currentImageHeight
        heightCache.current.imageHeight = currentImageHeight
        setImageHeight(currentImageHeight)
      }
    }

    if (detailedRef.current && detailedDescription) {
      const element = detailedRef.current
      const currentDetailedHeight = heightCache.current.detailedHeight

      if (!currentDetailedHeight) {
        const originalStyles = {
          visibility: element.style.visibility,
          height: element.style.height,
          opacity: element.style.opacity,
          overflow: element.style.overflow,
          whiteSpace: element.style.whiteSpace,
          padding: element.style.padding,
        }

        element.style.visibility = 'hidden'
        element.style.height = 'auto'
        element.style.opacity = '1'
        element.style.overflow = 'visible'
        element.style.whiteSpace = 'normal'
        element.style.padding = `${
          remToPx(DETAILED_PADDING_REM) / 2
        }px ${remToPx(DETAILED_PADDING_REM)}px`

        const height = element.scrollHeight
        newDetailedHeight = height
        heightCache.current.detailedHeight = height
        setDetailedHeight(height)

        Object.assign(element.style, originalStyles)
      }
    }
  }, [
    detailedDescription,
    imageHeight,
    detailedHeight,
    remToPx,
    imageRef,
    supportsHover,
  ])

  const handleResize = useCallback(() => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }

    resizeTimeout = setTimeout(() => {
      heightCache.current = {}
      measureHeights()
    }, 150)
  }, [measureHeights])

  useEffect(() => {
    if (typeof window === 'undefined') return

    measureHeights()
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
    }
  }, [detailedDescription, handleResize, measureHeights])

  const calculateBaseHeight = useCallback(() => {
    return imageHeight + remToPx(DESCRIPTION_HEIGHT_REM)
  }, [imageHeight, remToPx])

  const calculateExpandedHeight = useCallback(() => {
    const baseHeight = calculateBaseHeight()
    return baseHeight + detailedHeight + remToPx(DETAILED_PADDING_REM)
  }, [calculateBaseHeight, detailedHeight, remToPx])

  const setIsHoveredOptimized = useCallback(
    (hovered: boolean) => {
      if (!supportsHover && hovered) return
      if (typeof window === 'undefined') return
      requestAnimationFrame(() => {
        setIsHovered(hovered)
      })
    },
    [supportsHover]
  )

  return {
    isHovered,
    setIsHovered: setIsHoveredOptimized,
    detailedRef,
    detailedHeight,
    calculateBaseHeight,
    calculateExpandedHeight,
  }
}
