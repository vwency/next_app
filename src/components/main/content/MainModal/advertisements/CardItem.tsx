'use client'
import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import '@/styles/mainlayout/card/items.scss'
import { useCardItemHover } from '@/hooks'
import { CardItemProps } from '@/interfaces'

const CardItem: React.FC<CardItemProps> = ({
  image,
  alt = '',
  description,
  detailedDescription = '',
}) => {
  const descriptionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const {
    isHovered,
    setIsHovered,
    detailedRef,
    calculateBaseHeight,
    calculateExpandedHeight,
  } = useCardItemHover({ detailedDescription, imageRef })

  const [supportsHover, setSupportsHover] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setSupportsHover(window.matchMedia('(hover: hover)').matches)
    }
  }, [])

  const heights = useMemo(() => {
    const base = calculateBaseHeight()
    const expanded = detailedDescription ? calculateExpandedHeight() : base
    return { base, expanded }
  }, [calculateBaseHeight, calculateExpandedHeight, detailedDescription])

  const handleMouseEnter = useCallback(() => {
    if (detailedDescription && supportsHover) setIsHovered(true)
  }, [detailedDescription, setIsHovered, supportsHover])

  const handleMouseLeave = useCallback(() => {
    if (supportsHover) setIsHovered(false)
  }, [setIsHovered, supportsHover])

  const detailedStyles = useMemo(
    () => ({
      height: isHovered ? 'auto' : 0,
      opacity: isHovered ? 1 : 0,
      overflow: isHovered ? 'visible' : 'hidden',
      padding: isHovered ? '0.5rem 10px' : '0 10px',
      transition: supportsHover
        ? 'opacity 0.2s ease, padding 0.2s ease'
        : 'none',
    }),
    [isHovered, supportsHover]
  )

  const cardStyles = useMemo(() => {
    const shouldExpand = isHovered && detailedDescription && supportsHover
    return {
      '--base-height': `${heights.base}px`,
      '--expanded-height': `${heights.expanded}px`,
      height: shouldExpand ? `var(--expanded-height)` : `var(--base-height)`,
      transition: supportsHover ? 'height 0.2s ease' : 'none',
      willChange: shouldExpand ? 'height' : 'auto',
    } as React.CSSProperties
  }, [heights, isHovered, detailedDescription, supportsHover])

  const cardClassName = useMemo(
    () => `card-item ${!detailedDescription ? 'no-description' : ''}`,
    [detailedDescription]
  )

  return (
    <div
      className={cardClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyles}
    >
      <div className="card-item__image" ref={imageRef}>
        <img src={image} alt={alt} loading="lazy" decoding="async" />
      </div>
      <div ref={descriptionRef} className="card-item__description">
        {description}
      </div>
      {detailedDescription && (
        <div
          ref={detailedRef}
          className="card-item__detailed"
          style={detailedStyles}
        >
          {detailedDescription}
        </div>
      )}
    </div>
  )
}

export default React.memo(
  CardItem,
  (prev, next) =>
    prev.image === next.image &&
    prev.alt === next.alt &&
    prev.description === next.description &&
    prev.detailedDescription === next.detailedDescription
)
