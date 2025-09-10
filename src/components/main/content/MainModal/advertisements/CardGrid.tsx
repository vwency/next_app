import React, { useCallback, useMemo } from 'react'
import CardItem, { CardItemProps } from './CardItem'
import '@/styles/card/grid.scss'

interface CardGridProps {
  items: CardItemProps[]
  onItemClick?: (item: CardItemProps) => void
}

const CardGrid: React.FC<CardGridProps> = ({ items, onItemClick }) => {
  const handleItemClick = useCallback(
    (item: CardItemProps) => {
      if (onItemClick) requestAnimationFrame(() => onItemClick(item))
    },
    [onItemClick]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, item: CardItemProps) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleItemClick(item)
      }
    },
    [handleItemClick]
  )

  const itemWrapperStyle = useMemo(() => ({ cursor: 'pointer' as const }), [])

  return (
    <div className="card-grid">
      {items.map((item, index) => (
        <div
          key={`${item.image}-${item.description}-${index}`}
          onClick={() => handleItemClick(item)}
          onKeyDown={(e) => handleKeyDown(e, item)}
          style={itemWrapperStyle}
          role="button"
          tabIndex={0}
          aria-label={`Открыть ${item.description}`}
        >
          <CardItem {...item} />
        </div>
      ))}
    </div>
  )
}

export default React.memo(
  CardGrid,
  (prev, next) =>
    prev.items.length === next.items.length &&
    prev.onItemClick === next.onItemClick &&
    prev.items.every(
      (item, i) =>
        item.image === next.items[i].image &&
        item.alt === next.items[i].alt &&
        item.description === next.items[i].description &&
        item.detailedDescription === next.items[i].detailedDescription
    )
)
