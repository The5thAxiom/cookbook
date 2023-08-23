import { MdExplore, MdOutlineExplore } from 'react-icons/md';

export default function BrowseIcon({ isActive }: navbarIcon) {
    if (isActive) return <MdExplore className='navbar-icon' />;
    else return <MdOutlineExplore className='navbar-icon' />;
}

