import { navBarLink } from './types';
import HomeIcon from '../components/icons/homeIcon';
import BrowseIcon from '../components/icons/browseIcon';
import WhatCanIMakeIcon from '../components/icons/whatCanIMakeIcon';
import AboutIcon from '../components/icons/aboutIcon';

export const navBarLinks: navBarLink[] = [
    { to: '/', icon: HomeIcon },
    { to: '/recipes', icon: BrowseIcon },
    // {to: "/skills", name: "broswe skills"},
    { to: '/what-can-i-make', icon: WhatCanIMakeIcon },
    { to: '/user', icon: AboutIcon },
];
