import React from 'react'
import '@/styles/menu/index.scss'
import MainMenu from './menu/menu'

const HeaderContent = (
  <div>
    <MainMenu />
  </div>
)

const HeaderLayout = () => {
  return <>{HeaderContent}</>
}

export default HeaderLayout
