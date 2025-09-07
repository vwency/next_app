import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './modal.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalContent: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (isOpen) {
      setAnimating(true)
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      const timer = setTimeout(() => {
        setAnimating(false)
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [isOpen, mounted])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!mounted || (!isOpen && !animating)) {
    return null
  }

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
