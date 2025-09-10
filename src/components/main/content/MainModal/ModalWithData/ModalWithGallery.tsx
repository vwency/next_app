import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import '@/styles/card/index.scss'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useMountedAnimation } from '@/hooks/useMountedAnimation'
import CardGrid from '../advertisements/CardGrid'
import { galleryItems, GalleryItem } from './items'
import DetailedModal from '../../DetailedModal/modal'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const ModalWithGallery: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { mounted, animating } = useMountedAnimation(isOpen)
  useLockBodyScroll(isOpen)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  if (!mounted || (!isOpen && !animating)) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalElement = (
    <div
      className={`modal__overlay ${isOpen ? 'modal--open' : 'modal--close'}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={onClose}
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

        <main
          className="modal__body"
          onClick={(e) => {
            const target = e.target as HTMLElement
            if (!target.closest('.card-item')) {
              onClose()
            }
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
            Галерея картинок
          </h1>
          <CardGrid
            items={galleryItems}
            onItemClick={(item) =>
              setSelectedItem({
                ...item,
                alt: item.alt || item.description,
              })
            }
          />
        </main>
      </div>

      {selectedItem && (
        <DetailedModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.description}
        >
          <img
            src={selectedItem.image}
            alt={selectedItem.alt}
            style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
          />
          {selectedItem.detailedDescription && (
            <p style={{ marginTop: '15px' }}>
              {selectedItem.detailedDescription}
            </p>
          )}
        </DetailedModal>
      )}
    </div>
  )

  return createPortal(modalElement, document.body)
}

export default ModalWithGallery
