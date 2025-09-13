import React from 'react'
import '@/styles/header/menu/index.scss'
import TextMain from './text_main'

const wrapper = (
  <div className="no-select main__text__main__wrapper">
    <TextMain />
  </div>
)

const MainText = () => {
  return <>{wrapper}</>
}

export default MainText
