import React from 'react'
import { createPortal } from 'react-dom'
import '@/styles/card/index.scss'
import { useModalClose } from '@/hooks/useModalClose'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useMountedAnimation } from '@/hooks/useMountedAnimation'
import CardGrid from '../advertisements/CardGrid'
import { galleryItems } from './items'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const ModalWithGallery: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { mounted, animating } = useMountedAnimation(isOpen)
  const { handleOverlayClick } = useModalClose({ isOpen, onClose })
  useLockBodyScroll(isOpen)

  if (!mounted || (!isOpen && !animating)) return null

  const modalElement = (
    <div
      className={`modal__overlay ${isOpen ? 'modal--open' : 'modal--close'}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal__content">
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

        <main style={{ padding: '20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
            Галерея картинок
          </h1>
          <CardGrid items={galleryItems} />
        </main>
      </div>
    </div>
  )

  return createPortal(modalElement, document.body)
}

export default ModalWithGallery
