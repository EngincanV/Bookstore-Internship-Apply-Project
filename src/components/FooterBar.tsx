import React from 'react';
import { Layout} from "antd";

const { Footer } = Layout;

const FooterBar = (): JSX.Element => {
    return (
        <Footer style={{ textAlign: 'center', height: "4rem" }}>Nuevo Bookstore ©2020 Created by Engincan Veske</Footer>
    );
};

export default FooterBar;