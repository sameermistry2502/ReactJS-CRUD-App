import React from 'react';
import { slide as Menu } from 'react-burger-menu';
export default props => {
    return (
        <Menu>
            <a className="menu-item" href="/projects">
                Home
            </a>

            <a className="menu-item" href="/in_house">
                In-house
             </a>

            <a className="menu-item" href="/client">
                Client
            </a>
        </Menu>
    );
};