import { MdHome, MdOutlineHome } from 'react-icons/md';

export default function HomeIcon({ isActive }: navbarIcon) {
    if (isActive) return <MdHome className='navbar-icon' />;
    else return <MdOutlineHome className='navbar-icon' />;
}

