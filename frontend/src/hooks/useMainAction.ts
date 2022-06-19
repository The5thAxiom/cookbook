import { useEffect } from 'react';

export default function useMainAction(): {
    startMainAction: () => void;
    endMainAction: () => void;
} {
    const modal = document.getElementById(
        'main-action-happening'
    ) as HTMLDialogElement;

    const startMainAction = () => {
        modal.showModal();
    };

    const endMainAction = () => {
        modal.close();
    };

    useEffect(() => {
        console.log('setting up main-action-happening');
        if (modal) modal.addEventListener('cancel', e => e.preventDefault());
    }, []);

    return { startMainAction, endMainAction };
}
