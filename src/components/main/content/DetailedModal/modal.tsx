import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import '@/styles/mainlayout/DetaliedModal/index.scss'
import { ModalProps } from '@/interfaces'
import { useModalClose } from '@/hooks/useModalClose'

const DetailedModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  portalRootId,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null)

  const { handleOverlayClick } = useModalClose({ isOpen, onClose })

  if (!isOpen) return null

  const portalRoot = portalRootId
    ? (document.getElementById(portalRootId) ?? document.body)
    : document.body

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'modal'}
      tabIndex={-1}
      ref={modalRef}
      onClick={handleOverlayClick}
      className="modal-overlay"
    >
      <div
        role="document"
        className="modal-content"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {title && (
          <header>
            <h2 id="modal-title">{title}</h2>
          </header>
        )}

        <div className="modal-body">{children}</div>

        <footer>
          <button type="button" onClick={onClose} aria-label="Close modal">
            Close
          </button>
        </footer>
      </div>
    </div>,
    portalRoot
  )
}

export default React.memo(DetailedModal)
