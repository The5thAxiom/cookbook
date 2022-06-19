import React from 'react';
import LoadingAnimation from './loadingAnimation';

export default function MainAction() {
    return (
        <dialog
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

