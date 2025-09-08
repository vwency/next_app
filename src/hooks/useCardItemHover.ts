import { useState, useRef, useEffect } from 'react'

interface UseCardItemHoverProps {
  detailedDescription?: string
}

export const useCardItemHover = ({
  detailedDescription = '',
}: UseCardItemHoverProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const detailedRef = useRef<HTMLDivElement>(null)
  const [detailedHeight, setDetailedHeight] = useState(0)

  useEffect(() => {
    if (detailedRef.current) {
      setDetailedHeight(detailedRef.current.scrollHeight)
    }
  }, [detailedDescription])

  const calculateBaseHeight = () => {
    const imageHeight = Math.min(window.innerHeight * 0.5, 250)
    const descriptionHeight = 60
    const padding = 20
    return imageHeight + descriptionHeight + padding
  }

  const calculateExpandedHeight = () => {
    return calculateBaseHeight() + detailedHeight + 20
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
