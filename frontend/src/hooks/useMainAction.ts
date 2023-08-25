import { useCallback } from 'react';

export default function useMainAction(): {
    startMainAction: () => void;
    endMainAction: () => void;
} {
    const startMainAction = useCallback(() => {
        (
            document.getElementById(
                'main-action-happening'
            ) as HTMLDialogElement
        ).showModal();
    }, []);

    const endMainAction = useCallback(() => {
        (
            document.getElementById(
                'main-action-happening'
            ) as HTMLDialogElement
        ).close();
    }, []);

    return { startMainAction, endMainAction };
}

