import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import '@/styles/DetaliedModal/index.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  portalRootId?: string
}

const DetailedModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  portalRootId,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    previouslyFocused.current = document.activeElement as HTMLElement | null

    modalRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
      previouslyFocused.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const portalRoot = portalRootId
    ? (document.getElementById(portalRootId) ?? document.body)
    : document.body

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

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
