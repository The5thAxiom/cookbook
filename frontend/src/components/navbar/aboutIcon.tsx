import { MdOutlineAccountCircle, MdAccountCircle } from 'react-icons/md';

export default function AboutIcon({ isActive }: navbarIcon) {
    if (isActive) return <MdAccountCircle className='navbar-icon' />;
    else return <MdOutlineAccountCircle className='navbar-icon' />;
}

