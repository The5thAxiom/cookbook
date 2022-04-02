import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav>
            <NavLink to = "/">
                home
            </NavLink>
            {" | "}
            <NavLink to = "/recipes/browse">
                browse recipes
            </NavLink>
            {" | "}
            <NavLink to = "/recipes/check">
                check recipe
            </NavLink>
            {" | "}
            <NavLink to = "/skills/browse">
                browse skills
            </NavLink>
            {" | "}
            <NavLink to = "/skills/check">
                check skill
            </NavLink>
            {" | "}
            <NavLink to = "/what-can-i-make">
                que puedo hacer
            </NavLink>
            {" | "}
            <NavLink to = "/about">
                about
            </NavLink>
        </nav>
    );
}