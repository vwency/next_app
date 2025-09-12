import React, { useState, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import '@/styles/mainlayout/card/index.scss'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useMountedAnimation } from '@/hooks/useMountedAnimation'
import CardGrid from '../advertisements/CardGrid'
import { galleryItems, GalleryItem } from './items'
import DetailedModal from '../../DetailedModal/modal'
import { CardItemProps } from '../advertisements/CardItem'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const ModalWithGallery: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { mounted, animating } = useMountedAnimation(isOpen)
  useLockBodyScroll(isOpen)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose]
  )

  const handleCloseClick = useCallback(() => onClose(), [onClose])

  const handleItemClick = useCallback((item: CardItemProps) => {
    requestAnimationFrame(() => {
      setSelectedItem({
        ...item,
        alt: item.alt || item.description, // гарантируем, что alt не undefined
      } as GalleryItem)
    })
  }, [])

  const handleSelectedItemClose = useCallback(() => setSelectedItem(null), [])

  const handleBodyClick = useCallback(
    (e: React.MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.card-item')) onClose()
    },
    [onClose]
  )

  const overlayClassName = useMemo(
    () => `modal__overlay ${isOpen ? 'modal--open' : 'modal--close'}`,
    [isOpen]
  )

  const titleStyle = useMemo(
    () => ({
      textAlign: 'center' as const,
      marginBottom: '30px',
    }),
    []
  )

  const imageStyle = useMemo(
    () => ({
      maxWidth: '100%',
      display: 'block' as const,
      margin: '0 auto',
      height: 'auto',
      objectFit: 'contain' as const,
    }),
    []
  )

  const detailsStyle = useMemo(
    () => ({
      marginTop: '15px',
    }),
    []
  )

  if (!mounted || (!isOpen && !animating)) return null

  const modalElement = (
    <div
      className={overlayClassName}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={handleCloseClick}
          aria-label="Закрыть модальное окно"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <main className="modal__body" onClick={handleBodyClick}>
          <h1 id="modal-title" style={titleStyle}>
            Галерея картинок
          </h1>
          <CardGrid
            items={galleryItems.map((item) => ({
              ...item,
              alt: item.alt || item.description,
            }))}
            onItemClick={handleItemClick}
          />
        </main>
      </div>

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
            style={imageStyle}
          />
          {selectedItem.detailedDescription && (
            <p style={detailsStyle}>{selectedItem.detailedDescription}</p>
          )}
        </DetailedModal>
      )}
    </div>
  )

  return createPortal(modalElement, document.body)
}

export default React.memo(ModalWithGallery)
