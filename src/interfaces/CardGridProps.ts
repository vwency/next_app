import { CardItemProps } from '@/interfaces'

export interface CardGridProps {
  items: CardItemProps[]
  onItemClick?: (item: CardItemProps) => void
}
