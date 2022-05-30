import React from 'react';
import { NavLink } from 'react-router-dom';
import { recipeMeta } from '../values/types';
import BackwardArrowIcon from './icons/backwardArrowIcon';
import ForwardArrowIcon from './icons/forwardArrowIcon';
import LoadingAnimation from './loadingAnimation';
import './nextPreviousArrows.css';

export default function NextPreviousArrows({
    top,
    id,
    isLast,
    prevName,
    nextName
}: {
    isLast: boolean;
    id: number;
    top: boolean;
    nextName?: recipeMeta;
    prevName?: recipeMeta;
}) {
    return (
        <nav
            className={`next-previous-arrows${
                top ? ' top-arrows' : ' bottom-arrows'
            }`}
        >
            {Number(id) > 1 && (
                <NavLink
                    className='arrow left-arrow'
                    to={`/recipes/${Number(id) - 1}`}
                >
                    <BackwardArrowIcon className='arrow-icon' />
                    {prevName ? (
                        <div className='arrow-page-name arrow-prev-page-name'>
                            Prev
                            <br />
                            {prevName.name}
                        </div>
                    ) : (
                        <LoadingAnimation />
                    )}
                </NavLink>
            )}
            {/* <NavLink end to='/recipes/browse'>back</NavLink> */}
            {!isLast && (
                <NavLink
                    className='arrow right-arrow'
                    to={`/recipes/${Number(id) + 1}`}
                >
                    {nextName ? (
                        <div className='arrow-page-name arrow-next-page-name'>
                            Next
                            <br />
                            {nextName.name}
                        </div>
                    ) : (
                        <LoadingAnimation />
                    )}
                    <ForwardArrowIcon className='arrow-icon' />
                </NavLink>
            )}
        </nav>
    );
}

