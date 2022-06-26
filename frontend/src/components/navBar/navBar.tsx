import { NavLink, useNavigate } from 'react-router-dom';
import icon from '../../assets/food-bar-image.png';

import LogoutIcon from './logoutIcon';
import useCurrentUser from '../../hooks/useCurrentUser';
import userStore from '../../stores/userStore';

import HomeIcon from './homeIcon';
import BrowseIcon from './browseIcon';
import AboutIcon from './aboutIcon';
import SearchIcon from './searchIcon';
import { useRef, useState } from 'react';
import CloseIcon from '../icons/closeIcon';

const navBarLinks: navBarLink[] = [
    { to: '/', icon: HomeIcon },
    { to: '/recipes', icon: BrowseIcon },
    { to: '/user', icon: AboutIcon }
];

export default function NavBar() {
    const user = userStore(state => state.user);
    const { logOutUser } = useCurrentUser();

    const navigate = useNavigate();
    const searchBar = useRef<HTMLInputElement>(null);

    const [searchString, setSearchString] = useState<string>('');

    const unfocusSearchBar = () => {
        if (searchBar && searchBar.current) {
            searchBar.current.blur();
        }
    };

    const clearSearchBar = () => setSearchString('');

    const search = () => {
        navigate(`/recipes?q=${searchString}`);
        setSearchString('');
        unfocusSearchBar();
    };

    return (
        <nav id='navbar'>
            <NavLink to='/' className='navbar-logo'>
                <img src={icon} />
                <div>Cookbook</div>
            </NavLink>
            <div className='navbar-search'>
                <input
                    ref={searchBar}
                    placeholder='Search for you favourite recipes!'
                    type='text'
                    value={searchString || ''}
                    onChange={e => setSearchString(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') search();
                        else if (e.key === 'Escape') {
                            clearSearchBar();
                            unfocusSearchBar();
                        }
                    }}
                />
                {searchString.length > 0 && (
                    <div onClick={clearSearchBar}>
                        <CloseIcon />
                    </div>
                )}
                <div onClick={search}>
                    <SearchIcon />
                </div>
            </div>

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

