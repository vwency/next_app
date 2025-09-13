import React from 'react'
import '@/styles/header/menu/index.scss'
import FastText from './fast_text'

const textHeadContent = (
  <div className="no-select main__fast__text__wrapper">
    <FastText />
  </div>
)

const MainTextHead = () => {
  return <>{textHeadContent}</>
}

export default MainTextHead
