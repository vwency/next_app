import React, { useCallback, useMemo } from 'react'
import CardItem from './CardItem'
import '@/styles/mainlayout/card/grid.scss'
import { CardGridProps, CardItemProps } from '@/interfaces'

const CardGrid: React.FC<CardGridProps> = ({ items, onItemClick }) => {
  const handleItemClick = useCallback(
    (item: CardItemProps) => {
      if (onItemClick) {
        requestAnimationFrame(() => onItemClick(item))
      }
    },
    [onItemClick]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, item: CardItemProps) => {
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
          role="button"
          tabIndex={0}
          aria-label={`Открыть ${item.description}`}
          style={itemWrapperStyle}
          onClick={() => handleItemClick(item)}
          onKeyDown={(e) => handleKeyDown(e, item)}
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
    prev.items.every((item, i) => {
      const nextItem = next.items[i]
      return (
        item.image === nextItem.image &&
        item.alt === nextItem.alt &&
        item.description === nextItem.description &&
        item.detailedDescription === nextItem.detailedDescription
      )
    })
)
