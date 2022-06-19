import React from 'react';
import useMainAction from '../hooks/useMainAction';
import LoadingAnimation from './loadingAnimation';

export default function MainAction() {
    return (
        <dialog open={false} id='main-action-happening'>
            <LoadingAnimation />
        </dialog>
    );
}
