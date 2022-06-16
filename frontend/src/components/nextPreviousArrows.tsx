import React from 'react';
import { NavLink } from 'react-router-dom';

import BackwardArrowIcon from './icons/backwardArrowIcon';
import ForwardArrowIcon from './icons/forwardArrowIcon';
import LoadingAnimation from './loadingAnimation';
import './nextPreviousArrows.css';

export default function NextPreviousArrows({
    nextRecipe,
    prevRecipe
}: {
    nextRecipe: recipeMeta;
    prevRecipe: recipeMeta;
}) {
    return (
        <nav className='next-previous-arrows'>
            {prevRecipe && (
                <NavLink
                    className='arrow left-arrow'
                    to={`/recipes/${prevRecipe.id}`}
                >
                    <BackwardArrowIcon className='arrow-icon' />
                    {prevRecipe ? (
                        <div className='arrow-page-name arrow-prev-page-name'>
                            Prev
                            <br />
                            {prevRecipe.name}
                        </div>
                    ) : (
                        <LoadingAnimation />
                    )}
                </NavLink>
            )}
            {/* <NavLink end to='/recipes/browse'>back</NavLink> */}
            {nextRecipe && (
                <NavLink
                    className='arrow right-arrow'
                    to={`/recipes/${nextRecipe.id}`}
                >
                    {nextRecipe ? (
                        <div className='arrow-page-name arrow-next-page-name'>
                            Next
                            <br />
                            {nextRecipe.name}
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

