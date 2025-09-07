import React from 'react'
import '@/styles/mainlayout/background/index.scss'
import ImageBackground from './background'
import SphereBackground from './sphere'

const MainBackground = () => {
  return (
    <div className="main__background">
      <ImageBackground />
      <SphereBackground />
    </div>
  )
}

export default MainBackground
