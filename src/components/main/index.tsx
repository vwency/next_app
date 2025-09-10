import React from 'react'
import '@/styles/mainlayout/index.scss'
import MainTextHead from './text_head/main'
import MainText from './text_main/main'
import MainButtons from './buttons/main'
import MainSlider from './slider/main'
import MainFooterText from './text_footer/main'
const MainContent = (
  <div className="main__layout no-select">
    <MainTextHead />
    <MainText />
    <MainFooterText />
    <MainSlider />
    <MainButtons />
  </div>
)

const MainLayout = () => {
  return <>{MainContent}</>
}

export default MainLayout
