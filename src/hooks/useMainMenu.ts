import { useState, useRef, useEffect } from 'react'

export const useMainMenu = (
  contentRef?: React.RefObject<HTMLDivElement | null>
) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (menuRef.current && contentRef?.current) {
      const menuHeight = isOpen ? menuRef.current.scrollHeight : 0
      contentRef.current.style.marginTop = `${menuHeight + 30}px`
    }
  }, [isOpen, contentRef])

  const toggleMenu = () => setIsOpen((prev) => !prev)

  return {
    isOpen,
    toggleMenu,
    menuRef,
  }
}
