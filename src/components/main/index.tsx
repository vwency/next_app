import React from 'react'
import '@/styles/menu/index.scss'
import MainTextHead from './text_head/main'
import MainText from './text_main/text_main'
import MainFooterText from './text_footer/main'
import MainButtons from './buttons/main'
const MainContent = (
  <div>
    <MainTextHead />
    <MainText />
    <MainFooterText />
    <MainButtons />
  </div>
)

const MainLayout = () => {
  return <>{MainContent}</>
}

export default MainLayout
