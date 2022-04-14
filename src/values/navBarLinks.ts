import { navBarLink } from './types';
import React from 'react';
import HomeIcon from '../components/icons/homeIcon';
import BrowseIcon from '../components/icons/browseIcon';
import WhatCanIMakeIcon from '../components/icons/whatCanIMakeIcon';
import AboutIcon from '../components/icons/aboutIcon';

export const navBarLinks: navBarLink[] = [
    { to: '/', name: HomeIcon },
    { to: '/recipes/browse', name: BrowseIcon },
    // {to: "/skills/browse", name: "broswe skills"},
    { to: '/what-can-i-make', name: WhatCanIMakeIcon },
    { to: '/about', name: AboutIcon },
];
