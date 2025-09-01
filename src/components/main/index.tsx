
import React from "react";
import '@/styles/menu/index.scss';
import MainTextHead from "./text_head/main";

const MainContent = (
    <div>
        <MainTextHead />
    </div>
);

const MainLayout = () => {
    return <>{MainContent}</>;
};

export default MainLayout;
