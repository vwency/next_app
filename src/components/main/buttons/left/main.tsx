import React from 'react'
import '@/styles/menu/index.scss'
import LeftButtonMain from './button'

const LeftButtonContent = (
  <div className="no-select main__button__left ">
    <LeftButtonMain />
  </div>
)

const MainLeftButton = () => {
  return <>{LeftButtonContent}</>
}

export default MainLeftButton
