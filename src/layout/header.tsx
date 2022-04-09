import React from 'react';
import './layout.css';

import icon from '../assets/food-bar-image.png';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <NavLink
                style={{ display: 'inline' }}
                to='/'
                className={({ isActive }) => 'header-logo-link'}
            >
                <img className='header-logo' src={icon} />
            </NavLink>
            <h1>Cookbook</h1>
        </header>
    );
}
