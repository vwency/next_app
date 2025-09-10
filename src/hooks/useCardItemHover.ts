import { useState, useRef, useEffect } from 'react'

interface UseCardItemHoverProps {
  detailedDescription?: string
  imageRef?: React.RefObject<HTMLDivElement | null>
}

const DESCRIPTION_HEIGHT_REM = 3.2
const DETAILED_PADDING_REM = 1.02

export const useCardItemHover = ({
  detailedDescription = '',
  imageRef,
}: UseCardItemHoverProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const detailedRef = useRef<HTMLDivElement>(null)
  const [detailedHeight, setDetailedHeight] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)

  const remToPx = (rem: number) => {
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    )
    return rem * rootFontSize
  }

  const measureHeights = () => {
    if (imageRef?.current) {
      setImageHeight(imageRef.current.offsetHeight)
    }

    if (detailedRef.current && detailedDescription) {
      const element = detailedRef.current

      element.style.visibility = 'hidden'
      element.style.height = 'auto'
      element.style.opacity = '1'
      element.style.overflow = 'visible'
      element.style.whiteSpace = 'normal'
      element.style.padding = `${remToPx(DETAILED_PADDING_REM) / 2}px ${remToPx(
        DETAILED_PADDING_REM
      )}px`

      const height = element.scrollHeight
      setDetailedHeight(height)

      element.style.visibility = ''
      element.style.height = '0'
      element.style.opacity = '0'
      element.style.overflow = 'hidden'
      element.style.padding = `0 ${remToPx(DETAILED_PADDING_REM)}px`
    }
  }

  useEffect(() => {
    measureHeights()
    window.addEventListener('resize', measureHeights)
    return () => {
      window.removeEventListener('resize', measureHeights)
    }
  }, [detailedDescription])

  const calculateBaseHeight = () => {
    return imageHeight + remToPx(DESCRIPTION_HEIGHT_REM)
  }

  const calculateExpandedHeight = () => {
    const baseHeight = calculateBaseHeight()
    return baseHeight + detailedHeight + remToPx(DETAILED_PADDING_REM)
  }

  return {
    isHovered,
    setIsHovered,
    detailedRef,
    detailedHeight,
    calculateBaseHeight,
    calculateExpandedHeight,
  }
}
