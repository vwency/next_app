import React, { useRef, useState, useEffect } from 'react'
import '@/styles/card/items.scss'

export interface CardItemProps {
  image: string
  alt?: string
  description: string
  detailedDescription?: string
}

const CardItem: React.FC<CardItemProps> = ({
  image,
  alt = '',
  description,
  detailedDescription = '',
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const detailedRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
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
    const baseHeight = calculateBaseHeight()
    return baseHeight + detailedHeight + 20
  }

  return (
    <div
      className={`card-item ${!detailedDescription ? 'no-description' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        height:
          isHovered && detailedDescription
            ? `${calculateExpandedHeight()}px`
            : `${calculateBaseHeight()}px`,
      }}
    >
      <div className="card-item__image">
        <img src={image} alt={alt} />
      </div>
      <div ref={descriptionRef} className="card-item__description">
        {description}
      </div>
      {detailedDescription && (
        <div
          ref={detailedRef}
          className="card-item__detailed"
          style={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
            overflow: isHovered ? 'visible' : 'hidden',
            padding: isHovered ? '10px' : '0 10px',
          }}
        >
          {detailedDescription}
        </div>
      )}
    </div>
  )
}

export default CardItem
