import React from 'react'
import MainLeftButton from './left/main'
import MainRightButton from './right/main'
import '@/styles/mainlayout/buttons/index.scss'

const MainButtonsContent = (
  <div className="main__buttons">
    <MainLeftButton />
    <MainRightButton />
  </div>
)

const MainButtons = () => {
  return <>{MainButtonsContent}</>
}

export default MainButtons
