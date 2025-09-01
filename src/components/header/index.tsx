

import React from "react";
import '@/styles/menu/index.scss';
import MainMenu from "./main_menu/menu";


const HeaderContent = (
    <div>
        <MainMenu />
    </div>
);

const HeaderLayout = () => {
    return <>{HeaderContent}</>;
};

export default HeaderLayout;
