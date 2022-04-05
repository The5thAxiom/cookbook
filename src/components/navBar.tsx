import React from 'react';
import { NavLink } from 'react-router-dom';
import { navBarLinks } from '../values/navBarLinks';
import { navBarLink } from '../values/types';
import './navBar.css';

export default function NavBar() {
    return (
        <nav id='nav-bar'>
            {navBarLinks.map((link: navBarLink, index) => (
                <NavLink
                    className={currentNavLink =>
                        'navbar-link' +
                        (currentNavLink.isActive ? ' active' : '')
                    }
                    key={index}
                    to={link.to}
                >
                    {link.name}
                </NavLink>
            ))}
        </nav>
    );
}
