import React from 'react';
import './headerFooter.css';

import icon from '../assets/food-bar-image.png';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <NavLink to='/' className={({ isActive }) => 'header-logo-link'}>
                <img className='header-logo' src={icon} />
            </NavLink>
        </header>
    );
}
