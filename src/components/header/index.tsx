'use client'

import React, { useState, useEffect, useRef } from 'react'
import MainMenu from './menu/menu'
import '@/styles/header/index.scss'
import { HeaderLayoutProps } from '@/consts'
import { MAX_SCROLL_HIDE, SCROLL_SHOW_THRESHOLD } from '@/consts'

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ contentRef }) => {
  const [translateY, setTranslateY] = useState(0)
  const lastScrollY = useRef(0)
  const accumulatedUpScroll = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollY.current

      if (diff > 0) {
        accumulatedUpScroll.current = 0
      } else {
        accumulatedUpScroll.current -= diff
      }

      let newTranslateY = translateY

      if (diff > 0) {
        newTranslateY += diff
      } else if (accumulatedUpScroll.current >= SCROLL_SHOW_THRESHOLD) {
        newTranslateY += diff
      }

      if (newTranslateY > MAX_SCROLL_HIDE) newTranslateY = MAX_SCROLL_HIDE
      if (newTranslateY < 0) newTranslateY = 0

      setTranslateY(newTranslateY)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [translateY])

  const translatePercent = (translateY / MAX_SCROLL_HIDE) * 100

  return (
    <div
      className="header_wrapper no-select"
      style={{
        transform: `translateY(-${translatePercent}%)`,
        transition: 'transform 0.1s linear',
      }}
    >
      <MainMenu contentRef={contentRef} />
    </div>
  )
}

export default React.memo(HeaderLayout)
