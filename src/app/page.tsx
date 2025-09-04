'use client'

import React, { useRef } from 'react'
import MainLayout from '@/components/main'
import '@/styles/global/index.scss'
import HeaderLayout from '@/components/header'

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <HeaderLayout contentRef={mainRef} />
      <div ref={mainRef}>
        <MainLayout />
      </div>
    </div>
  )
}
