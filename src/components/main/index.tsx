import React from 'react'
import '@/styles/mainlayout/index.scss'
import MainTextHead from './text_head/main'
import MainText from './text_main/main'
import MainFooterText from './text_footer/main'
import MainButtons from './buttons/main'
import MainBackground from './background/main'
const MainContent = (
  <div className="main__layout">
    <MainTextHead />
    <MainText />
    <MainFooterText />
    <MainButtons />
    <MainBackground />
  </div>
)

const MainLayout = () => {
  return <>{MainContent}</>
}

export default MainLayout
