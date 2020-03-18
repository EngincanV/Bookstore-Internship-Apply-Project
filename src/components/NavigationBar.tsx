import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const NavigationBar = (): JSX.Element => {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu
                theme="dark"
                mode="horizontal"
            >
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/create">Create Book</Link></Menu.Item>
            </Menu>
        </Header>
    );
}

export default NavigationBar;