import React from "react";
import '@/styles/menu/index.scss';

const menuContent = (
    <div className="menu_wrapper no-select">
        <div className="menu__logo">
            <div className="menu__logo__text">
                Serendale
            </div>
        </div>
        <div className="menu__options">
            <ul className="list-inline-options">
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
                    <img src="assets/mdi_discord.svg" alt="GitHub" />
                </li>
                <li className="list-inline__item">
                    <img src="assets/mdi_reddit.svg" alt="GitHub" />
                </li>
                <li className="list-inline__item">
                    <img src="assets/mdi_twitter.svg" alt="GitHub" />
                </li>
            </ul>
        </div>
    </div>
);

const MainMenu = () => {
    return <>{menuContent}</>;
};

export default MainMenu;
