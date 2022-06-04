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
    buttonText?: JSX.Element;
}>) {
    return (
        <dialog className='modal' open={open}>
            <div className='modal-contents'>{children}</div>
            <button className='modal-contents cb-form-end' onClick={onClose}>
                {buttonText ? buttonText : 'Close'}
            </button>
        </dialog>
    );
}
