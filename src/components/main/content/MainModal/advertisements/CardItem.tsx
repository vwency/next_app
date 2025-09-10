import React, { useRef } from 'react'
import '@/styles/card/items.scss'
import { useCardItemHover } from '@/hooks'

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
  const descriptionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const {
    isHovered,
    setIsHovered,
    detailedRef,
    calculateBaseHeight,
    calculateExpandedHeight,
  } = useCardItemHover({ detailedDescription, imageRef })

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
      <div className="card-item__image" ref={imageRef}>
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
            padding: isHovered ? '0.5rem 10px' : '0 10px',
            transition: 'opacity 0.3s ease, padding 0.3s ease',
            boxSizing: 'border-box',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {detailedDescription}
        </div>
      )}
    </div>
  )
}

export default CardItem
