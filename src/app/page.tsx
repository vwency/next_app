'use client'

import React from 'react'
import MainLayout from '@/components/main'
import '@/styles/global/index.scss'
import HeaderLayout from '@/components/header'
import Stars from '@/components/main/stars'

export default function Home() {
  return (
    <div style={{ height: '3000px' }}>
      <Stars />
      <HeaderLayout />
      <div>
        <MainLayout />
      </div>
    </div>
  )
}
