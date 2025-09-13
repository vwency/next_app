'use client'

import React, { useRef } from 'react'
import MainLayout from '@/components/main'
import '@/styles/global/index.scss'
import HeaderLayout from '@/components/header/index'
import Stars from '@/components/main/stars'

export default function Home() {
  const mainContentRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ height: '3000px' }}>
      <Stars />
      <HeaderLayout contentRef={mainContentRef} />
      <div ref={mainContentRef}>
        <MainLayout />
      </div>
    </div>
  )
}
