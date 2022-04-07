import React from 'react';
import './headerFooter.css';

import icon from '../assets/food-bar-image.png';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <NavLink to='/home'>
                <img src={icon} style={{ width: '70px', height: '70px' }} />
            </NavLink>
        </header>
    );
}
