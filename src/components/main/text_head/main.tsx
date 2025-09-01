import React from 'react'
import '@/styles/menu/index.scss'
import FastText from './fast_text'

const textHeadContent = (
  <div className="no-select">
    <FastText />
  </div>
)

const MainTextHead = () => {
  return <>{textHeadContent}</>
}

export default MainTextHead
