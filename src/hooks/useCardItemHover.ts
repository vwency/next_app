import { useState, useRef, useEffect } from 'react'

interface UseCardItemHoverProps {
  detailedDescription?: string
  imageRef?: React.RefObject<HTMLDivElement | null>
}

const DESCRIPTION_HEIGHT = 40 // px
const DETAILED_PADDING = 30 // px

export const useCardItemHover = ({
  detailedDescription = '',
  imageRef,
}: UseCardItemHoverProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const detailedRef = useRef<HTMLDivElement>(null)
  const [detailedHeight, setDetailedHeight] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)

  useEffect(() => {
    if (imageRef?.current) {
      setImageHeight(imageRef.current.offsetHeight)
    }
  }, [imageRef?.current])

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
    return imageHeight + DESCRIPTION_HEIGHT
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
