import React, { useState, useCallback } from 'react'
import '@/styles/mainlayout/card/index.scss'
import { CardGrid } from '../advertisements'
import { galleryItems } from './items'
import DetailedModal from '../../DetailedModal/modal'
import { CardItemProps, GalleryItem } from '@/interfaces'
import '@/styles/mainlayout/gallery/index.scss'

const GalleryNoModal: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const handleItemClick = useCallback((item: CardItemProps) => {
    requestAnimationFrame(() => {
      setSelectedItem({
        ...item,
        alt: item.alt || item.description,
      } as GalleryItem)
    })
  }, [])

  const handleSelectedItemClose = useCallback(() => setSelectedItem(null), [])

  return (
    <div className="gallery_wrapper">
      <div className="gallery">
        <CardGrid
          items={galleryItems.map((item) => ({
            ...item,
            alt: item.alt || item.description,
          }))}
          onItemClick={handleItemClick}
        />

        {selectedItem && (
          <DetailedModal
            isOpen={!!selectedItem}
            onClose={handleSelectedItemClose}
            title={selectedItem.description}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.alt}
              loading="lazy"
              decoding="async"
              className="gallery__image"
            />
            {selectedItem.detailedDescription && (
              <p className="gallery__details">
                {selectedItem.detailedDescription}
              </p>
            )}
          </DetailedModal>
        )}
      </div>
    </div>
  )
}

export default React.memo(GalleryNoModal)
