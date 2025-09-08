import React from 'react'
import '@/styles/card/items.scss'

export interface CardItemProps {
  image: string
  alt?: string
  description: string
}

const CardItem: React.FC<CardItemProps> = ({
  image,
  alt = '',
  description,
}) => {
  return (
    <div className="card-item">
      <div className="card-item__image">
        <img src={image} alt={alt} />
      </div>
      <div className="card-item__description">{description}</div>
    </div>
  )
}

export default CardItem
