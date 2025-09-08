import React from 'react'
import CardItem, { CardItemProps } from './CardItem'
import '@/styles/card/grid.scss'

interface CardGridProps {
  items: CardItemProps[]
}

const CardGrid: React.FC<CardGridProps> = ({ items }) => {
  return (
    <div className="card-grid">
      {items.map((item, index) => (
        <CardItem
          key={index}
          image={item.image}
          alt={item.alt}
          description={item.description}
          detailedDescription={item.detailedDescription}
        />
      ))}
    </div>
  )
}

export default CardGrid
