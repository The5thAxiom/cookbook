import React from 'react';
import { NavLink } from 'react-router-dom';
import { navBarLinks } from '../values/navBarLinks';
import { navBarLink } from '../values/types';
import './layout.css';
import '../index.css';

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
            console.log(accessToken);
        });
        
    }
    return (
        <nav id='nav-bar'>
            {/* <NavLink className='navbar-link' to={'/'}>
                <span>Cookbook</span>
            </NavLink> */}
            {navBarLinks.map((link: navBarLink, index) => (
                <NavLink
                    className={({ isActive }) =>
                        'navbar-link' + (isActive ? ' navbar-link-active' : '')
                    }
                    children={isActive => link.icon(isActive)}
                    key={index}
                    to={link.to}
                />
            ))}
            {accessToken !== "" && 
                <button onClick={logout} >Logout</button>
            }
        </nav>
    );
}
