import React from 'react'
import { createPortal } from 'react-dom'
import { useModalClose } from '@/hooks/useModalClose'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useMountedAnimation } from '@/hooks/useMountedAnimation'
import '@/styles/card/index.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalContent: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )

  return createPortal(modalElement, document.body)
}

export default ModalContent
