'use client'

import React from 'react'
import '@/styles/header/menu/index.scss'
import { MainMenuProps } from '@/interfaces'
import { useMainMenu } from '@/hooks'

const MainMenu: React.FC<MainMenuProps> = ({ contentRef }) => {
  const { isOpen, toggleMenu, menuRef } = useMainMenu(contentRef)

  return (
    <div className="menu_wrapper no-select" ref={menuRef}>
      <div className="menu__logo">
        <div className="menu__logo__text">КиноАфиша</div>
      </div>

      <div className="menu__options">
        <button
          className={`menu-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <ul className={`list-inline ${isOpen ? 'active' : ''}`}>
          <li className="list-inline__item">Премьеры</li>
          <li className="list-inline__item">Афиша</li>
          <li className="list-inline__item">Кинотеатры</li>
          <li className="list-inline__item">О нас</li>
        </ul>
      </div>

      <div className="menu__refferal">
        <ul className="list-inline-refferal">
          <li className="list-inline__item__refferal">
            <img src="assets/mdi_github.svg" alt="GitHub" />
          </li>
          <li className="list-inline__item__refferal">
            <img src="assets/mdi_discord.svg" alt="Discord" />
          </li>
          <li className="list-inline__item__refferal">
            <img src="assets/mdi_reddit.svg" alt="Reddit" />
          </li>
          <li className="list-inline__item__refferal">
            <img src="assets/mdi_twitter.svg" alt="Twitter" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MainMenu
