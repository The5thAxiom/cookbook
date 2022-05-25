import React from 'react';
import { NavLink } from 'react-router-dom';
import { navBarLinks } from '../values/navBarLinks';
import { navBarLink } from '../values/types';
import './layout.css';
import '../index.css';
import LogoutIcon from '../components/icons/logoutIcon';

export default function NavBar({accessToken, removeAccessToken}: {
        accessToken: string,
        removeAccessToken: any
    }) {
    const logout = () => {
        fetch('/api/users/logout', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            removeAccessToken();
        });
    };

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
            {accessToken !== "" && 
                <NavLink
                    end
                    className='navbar-link'
                    onClick={logout}
                    to='/user'
                >
                    <LogoutIcon/>
                </NavLink>
            }
        </nav>
    );
}
