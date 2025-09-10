import React from 'react'
import CardItem, { CardItemProps } from './CardItem'
import '@/styles/card/grid.scss'

interface CardGridProps {
  items: CardItemProps[]
  onItemClick?: (item: CardItemProps) => void
}

const CardGrid: React.FC<CardGridProps> = ({ items, onItemClick }) => {
  return (
    <div className="card-grid">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick?.(item)}
          style={{ cursor: 'pointer' }}
        >
          <CardItem
            image={item.image}
            alt={item.alt}
            description={item.description}
            detailedDescription={item.detailedDescription}
          />
        </div>
      ))}
    </div>
  )
}

export default CardGrid
