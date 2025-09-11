'use client'

import React from 'react'
import MainLayout from '@/components/main'
import '@/styles/global/index.scss'
import HeaderLayout from '@/components/header'

export default function Home() {
  return (
    <div style={{ height: '3000px' }}>
      <HeaderLayout />
      <div>
        <MainLayout />
      </div>
    </div>
  )
}
