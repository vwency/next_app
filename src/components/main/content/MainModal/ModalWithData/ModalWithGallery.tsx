import React, { useState, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import '@/styles/mainlayout/card/index.scss'
import { useLockBodyScroll, useMountedAnimation } from '@/hooks'
import { CardGrid } from '../advertisements'
import { galleryItems } from './items'
import DetailedModal from '../../DetailedModal/modal'
import { CardItemProps, GalleryItem, ModalProps } from '@/interfaces'

const CLOSE_ICON_SIZE = 20
const MODAL_CLOSE_TIMEOUT = 300

const ModalWithGallery: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { mounted, animating } = useMountedAnimation(
    isOpen,
    MODAL_CLOSE_TIMEOUT
  )
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
        alt: item.alt || item.description,
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
          <svg
            width={CLOSE_ICON_SIZE}
            height={CLOSE_ICON_SIZE}
            viewBox="0 0 24 24"
            fill="none"
          >
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
          <h1 id="modal-title" className="modal__title">
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
            className="modal__image"
          />
          {selectedItem.detailedDescription && (
            <p className="modal__details">{selectedItem.detailedDescription}</p>
          )}
        </DetailedModal>
      )}
    </div>
  )

  return createPortal(modalElement, document.body)
}

export default React.memo(ModalWithGallery)
