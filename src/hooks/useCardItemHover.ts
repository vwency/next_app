import { useState, useRef, useEffect } from 'react'

interface UseCardItemHoverProps {
  detailedDescription?: string
}

const IMAGE_HEIGHT_VH = 35
const DESCRIPTION_HEIGHT_VH = 8
const PADDING_VH = 0
const DETAILED_PADDING = 30

export const useCardItemHover = ({
  detailedDescription = '',
}: UseCardItemHoverProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const detailedRef = useRef<HTMLDivElement>(null)
  const [detailedHeight, setDetailedHeight] = useState(0)

  useEffect(() => {
    if (detailedRef.current && detailedDescription) {
      const element = detailedRef.current
      element.style.visibility = 'hidden'
      element.style.height = 'auto'
      element.style.opacity = '1'
      element.style.padding = '15px'

      const height = element.scrollHeight
      setDetailedHeight(height)

      element.style.visibility = ''
      element.style.height = '0'
      element.style.opacity = '0'
      element.style.padding = '0 15px'
    }
  }, [detailedDescription])

  const calculateBaseHeight = () => {
    const imageHeight = Math.min(
      window.innerHeight * (IMAGE_HEIGHT_VH / 100),
      window.innerHeight
    )
    const descriptionHeight = window.innerHeight * (DESCRIPTION_HEIGHT_VH / 100)
    const padding = window.innerHeight * (PADDING_VH / 100)
    return imageHeight + descriptionHeight + padding
  }

  const calculateExpandedHeight = () => {
    const baseHeight = calculateBaseHeight()
    return baseHeight + detailedHeight + DETAILED_PADDING
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
