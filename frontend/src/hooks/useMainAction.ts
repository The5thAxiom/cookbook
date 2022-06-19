export default function useMainAction(): {
    modal: HTMLDialogElement;
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

    return { modal, startMainAction, endMainAction };
}

