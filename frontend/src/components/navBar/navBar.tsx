import { NavLink } from 'react-router-dom';
import icon from '../../assets/food-bar-image.png';

import LogoutIcon from './logoutIcon';
import useCurrentUser from '../../hooks/useCurrentUser';
import userStore from '../../stores/userStore';

import HomeIcon from '../navBar/homeIcon';
import BrowseIcon from '../navBar/browseIcon';
import AboutIcon from '../navBar/aboutIcon';

const navBarLinks: navBarLink[] = [
    { to: '/', icon: HomeIcon },
    { to: '/recipes', icon: BrowseIcon },
    { to: '/user', icon: AboutIcon }
];

export default function NavBar() {
    const user = userStore(state => state.user);
    const { logOutUser } = useCurrentUser();

    return (
        <nav id='navbar'>
            <NavLink to='/' className='navbar-logo'>
                <img src={icon} />
                Cookbook
            </NavLink>

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

