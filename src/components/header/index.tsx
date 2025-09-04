import React from 'react'
import MainMenu from './menu/menu'
import '@/styles/header/index.scss'

interface HeaderLayoutProps {
  contentRef: React.RefObject<HTMLDivElement | null>
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ contentRef }) => {
  return (
    <div className="header_wrapper no-select">
      <MainMenu contentRef={contentRef} />
    </div>
  )
}

export default HeaderLayout
