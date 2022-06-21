export default function useMainAction(): {
    startMainAction: () => void;
    endMainAction: () => void;
} {
    const startMainAction = () => {
        (
            document.getElementById(
                'main-action-happening'
            ) as HTMLDialogElement
        ).showModal();
    };

    const endMainAction = () => {
        (
            document.getElementById(
                'main-action-happening'
            ) as HTMLDialogElement
        ).close();
    };

    return { startMainAction, endMainAction };
}

