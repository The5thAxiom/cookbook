import React from 'react';
import './modal.css';

export default function Modal({
    open,
    onClose,
    children,
    buttonText
}: React.PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    buttonText?: JSX.Element;
}>) {
    return (
        <dialog open={open}>
            <div>{children}</div>
            <button onClick={onClose}>
                {buttonText ? buttonText : 'Close'}
            </button>
        </dialog>
    );
}
