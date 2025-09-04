import React from 'react'
import '@/styles/menu/index.scss'
import MainMenu from './menu/menu'
import '@/styles/header/index.scss'

const HeaderContent = (
  <div className="header_wrapper no-select">
    <MainMenu />
  </div>
)

const HeaderLayout = () => {
  return <>{HeaderContent}</>
}

export default HeaderLayout
