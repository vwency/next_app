import { useState, useRef, useEffect } from 'react'

interface UseCardItemHoverProps {
  detailedDescription?: string
  imageRef?: React.RefObject<HTMLDivElement | null>
}

const DESCRIPTION_HEIGHT_VH = 3.5
const DETAILED_PADDING_VH = 2

export const useCardItemHover = ({
  detailedDescription = '',
  imageRef,
}: UseCardItemHoverProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const detailedRef = useRef<HTMLDivElement>(null)
  const [detailedHeight, setDetailedHeight] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)

  const vhToPx = (vh: number) => (window.innerHeight * vh) / 100

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
      element.style.padding = `${vhToPx(DETAILED_PADDING_VH) / 2}px ${vhToPx(
        DETAILED_PADDING_VH
      )}px`

      const height = element.scrollHeight
      setDetailedHeight(height)

      element.style.visibility = ''
      element.style.height = '0'
      element.style.opacity = '0'
      element.style.padding = `0 ${vhToPx(DETAILED_PADDING_VH)}px`
    }
  }, [detailedDescription])

  const calculateBaseHeight = () => {
    return imageHeight + vhToPx(DESCRIPTION_HEIGHT_VH)
  }

  const calculateExpandedHeight = () => {
    const baseHeight = calculateBaseHeight()
    return baseHeight + detailedHeight + vhToPx(DETAILED_PADDING_VH)
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
