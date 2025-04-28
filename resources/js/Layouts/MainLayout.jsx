import React from "react";
import Header from "../Components/Header";

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
};

export default MainLayout;
