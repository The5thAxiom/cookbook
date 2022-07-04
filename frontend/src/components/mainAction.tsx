import { useEffect, useRef } from 'react';
import LoadingAnimation from './loadingAnimation/loadingAnimation';

export default function MainAction() {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // console.log('setting up main-action-happening');
        const modal = ref.current;
        if (ref && modal) {
            modal.addEventListener('cancel', e => e.preventDefault());
            return () => {
                modal.removeEventListener('cancel', e => e.preventDefault());
            };
        }
    }, []);
    return (
        <dialog
            ref={ref}
            style={{
                backgroundColor: 'transparent',
                border: 'none'
            }}
            open={false}
            id='main-action-happening'
        >
            <LoadingAnimation />
        </dialog>
    );
}

