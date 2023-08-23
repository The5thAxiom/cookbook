import { useEffect, useState } from 'react';
import { MdArrowUpward } from 'react-icons/md';
import './goToTopButton.css';

export default function GoToTopButton() {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => setShow(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return show ? (
        <div className='to-top' onClick={() => window.scrollTo(0, 0)}>
            <MdArrowUpward className='util-icon' />
        </div>
    ) : (
        <></>
    );
}

