import React from 'react'
import '@/styles/header/menu/index.scss'
import RightButtonMain from './button'

const RightButtonContent = (
  <div className="no-select main__button__right">
    <RightButtonMain />
  </div>
)

const MainRightButton = () => {
  return <>{RightButtonContent}</>
}

export default MainRightButton
