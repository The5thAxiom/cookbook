import React from 'react';
import './modal.css';

export default function Modal({
    open,
    onClose,
    children,
    buttonText
}: React.PropsWithChildren<{
    open: boolean;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    buttonText?: string | JSX.Element;
}>) {
    return (
        <dialog className='modal' open={open}>
            <div className='modal-contents'>{children}</div>
            <div className='modal-button'>
                <button onClick={onClose}>
                    {buttonText ? buttonText : 'Close'}
                </button>
            </div>
        </dialog>
    );
}
