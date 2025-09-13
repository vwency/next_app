'use client'

import React, { useState, useEffect, useRef } from 'react'
import MainMenu from './menu/menu'
import '@/styles/header/index.scss'
import { HeaderLayoutProps } from '@/interfaces'
import { MAX_SCROLL_HIDE, SCROLL_SHOW_THRESHOLD } from '@/consts'

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ contentRef }) => {
  const [translateY, setTranslateY] = useState(0)
  const lastScrollY = useRef(0)
  const accumulatedUpScroll = useRef(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollY.current

      if (diff > 0 && isMenuOpen) setIsMenuOpen(false)

      if (diff > 0) {
        setTranslateY(MAX_SCROLL_HIDE)
        accumulatedUpScroll.current = 0
      } else if (diff < 0) {
        accumulatedUpScroll.current -= diff
        if (accumulatedUpScroll.current >= SCROLL_SHOW_THRESHOLD) {
          setTranslateY(0)
          accumulatedUpScroll.current = 0
        }
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  const translatePercent = (translateY / MAX_SCROLL_HIDE) * 100

  useEffect(() => {
    if (contentRef?.current) {
      requestAnimationFrame(() => {
        let offset = 0
        if (isMenuOpen) {
          const menuList = menuRef.current?.querySelector(
            '.list-inline.active'
          ) as HTMLElement
          if (menuList) offset = menuList.offsetHeight
        }

        contentRef.current!.style.transform = `translateY(${offset}px)`
        contentRef.current!.style.transition = 'transform 0.3s ease'
      })
    }
  }, [isMenuOpen, contentRef])

  return (
    <div
      className="header_wrapper no-select"
      style={{
        transform: `translateY(-${translatePercent}%)`,
        transition: 'transform 0.1s linear',
        position: 'fixed', // ключевой момент
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <MainMenu
        ref={menuRef}
        contentRef={contentRef}
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
    </div>
  )
}

export default React.memo(HeaderLayout)
