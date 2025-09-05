'use client'

import React from 'react'
import Slider from './slider'
import '@/styles/slider/index.scss'

const MainSliderContent = (
  <div className="slider__wrapper">
    <Slider />
  </div>
)

const MainSlider = () => {
  return <>{MainSliderContent}</>
}

export default MainSlider
