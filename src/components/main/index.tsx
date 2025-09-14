import React from 'react'
import '@/styles/mainlayout/index.scss'
import MainTextHead from './texts/text_head/main'
import MainText from './texts/text_main/main'
import { MainButtons } from './buttons'
import MainSlider from './slider/main'
import MainFooterText from './texts/text_footer/main'
import GallertNoModal from './content/MainModal/ModalWithData/NonModal'

const MainLayout = () => {
  return (
    <div className="main__layout no-select">
      <MainTextHead />
      <MainText />
      <MainFooterText />
      <MainSlider />
      <MainButtons />
      <GallertNoModal />
    </div>
  )
}

export default React.memo(MainLayout)
