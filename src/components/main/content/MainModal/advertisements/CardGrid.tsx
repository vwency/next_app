import React from 'react'
import CardItem, { CardItemProps } from './CardItem'
import '@/styles/card/grid.scss'
import { useModalClose } from '@/hooks'

interface CardGridProps {
  items: CardItemProps[]
  isOpen: boolean
  onClose: () => void
  onItemClick?: (item: CardItemProps) => void
}

const CardGrid: React.FC<CardGridProps> = ({
  items,
  isOpen,
  onClose,
  onItemClick,
}) => {
  const { handleOverlayClick } = useModalClose({ isOpen, onClose })

  return (
    <div className="card-grid-container">
      <div className="card-grid-background" onClick={handleOverlayClick} />

      <div className="card-grid" onClick={handleOverlayClick}>
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
    </div>
  )
}

export default CardGrid
