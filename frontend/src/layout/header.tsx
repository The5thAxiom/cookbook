import React from 'react';

import icon from '../assets/food-bar-image.png';
import { NavLink } from 'react-router-dom';

import './header.css';

export default function Header() {
    return (
        <header>
            <NavLink to='/' className='header-logo-link'>
                <img alt='' className='header-logo' src={icon} />
            </NavLink>
            <div className='header-text'>Cookbook</div>
        </header>
    );
}

