'use client'

import React, { useState } from 'react'
import '@/styles/menu/index.scss'

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="menu_wrapper no-select">
      <div className="menu__logo">
        <div className="menu__logo__text">Serendale</div>
      </div>

      <div className="menu__options">
        <button
          className={`menu-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <ul className={`list-inline ${isOpen ? 'active' : ''}`}>
          <li className="list-inline__item">Smart Contracts</li>
          <li className="list-inline__item">Services</li>
          <li className="list-inline__item">Solutions</li>
          <li className="list-inline__item">Whitepaper</li>
        </ul>
      </div>

      <div className="menu__refferal">
        <ul className="list-inline-refferal">
          <li className="list-inline__item">
            <img src="assets/mdi_github.svg" alt="GitHub" />
          </li>
          <li className="list-inline__item">
            <img src="assets/mdi_discord.svg" alt="Discord" />
          </li>
          <li className="list-inline__item">
            <img src="assets/mdi_reddit.svg" alt="Reddit" />
          </li>
          <li className="list-inline__item">
            <img src="assets/mdi_twitter.svg" alt="Twitter" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MainMenu
