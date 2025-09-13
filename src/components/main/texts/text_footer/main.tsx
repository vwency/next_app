import React from 'react'
import '@/styles/header/menu/index.scss'
import FooterText from './text_footer'

const textHeadContent = (
  <div className="no-select main__footer__text__wrapper">
    <FooterText />
  </div>
)

const MainFooterText = () => {
  return <>{textHeadContent}</>
}

export default MainFooterText
