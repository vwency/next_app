'use client'

import React, { useState, useEffect, useRef } from 'react'
import MainMenu from './menu/menu'
import '@/styles/header/index.scss'

const SCROLL_HIDE_THRESHOLD = 1

const HeaderLayout: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollY.current

      let newVisibility = isVisible

      if (currentScrollY <= SCROLL_HIDE_THRESHOLD) {
        newVisibility = true
      } else if (diff > 0) {
        newVisibility = false
      } else if (diff < 0) {
        newVisibility = true
      }

      if (newVisibility !== isVisible) {
        setIsVisible(newVisibility)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  return (
    <div
      className={`header_wrapper no-select ${isVisible ? 'visible' : 'hidden'}`}
    >
      <MainMenu />
    </div>
  )
}

export default React.memo(HeaderLayout)
