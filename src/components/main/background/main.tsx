import React from 'react'
import '@/styles/mainlayout/background/index.scss'
import ImageBackground from './background'
import SphereBackground from './sphere'

const MainBackground = () => {
  return (
    <div>
      <ImageBackground />
      <SphereBackground />
    </div>
  )
}

export default MainBackground
