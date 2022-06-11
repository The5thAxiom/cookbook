import React from 'react';
import { NavLink } from 'react-router-dom';
import { navBarLinks } from '../values/navBarLinks';

import LogoutIcon from '../components/icons/logoutIcon';

export default function NavBar({
    user,
    logOutUser
}: {
    user: userData;
    logOutUser: () => void;
}) {
    return (
        <nav id='nav-bar'>
            {/* <NavLink className='navbar-link' to={'/'}>
                <span>Cookbook</span>
            </NavLink> */}
            {navBarLinks.map((link: navBarLink, index) => (
                <NavLink
                    end
                    className={({ isActive }) =>
                        'navbar-link' + (isActive ? ' navbar-link-active' : '')
                    }
                    children={isActive => link.icon(isActive)}
                    key={index}
                    to={link.to}
                />
            ))}
            {user && (
                <NavLink
                    end
                    className='navbar-link'
                    onClick={logOutUser}
                    to='/user'
                >
                    <LogoutIcon />
                </NavLink>
            )}
        </nav>
    );
}

