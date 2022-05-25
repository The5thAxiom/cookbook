import React from 'react';
import { NavLink } from 'react-router-dom';
import { arrowData } from '../values/types';
import BackwardArrowIcon from './icons/backwardArrowIcon';
import ForwardArrowIcon from './icons/forwardArrowIcon';
import './nextPreviousArrows.css';

export default function NextPreviousArrows(props: arrowData) {
    return (
        <nav
            className={`next-previous-arrows${
                props.top ? ' top-arrows' : ' bottom-arrows'
            }`}
        >
            {Number(props.id) > 1 && (
                <NavLink
                    className='arrow left-arrow'
                    to={`/recipes/${Number(props.id) - 1}`}
                >
                    <BackwardArrowIcon className='arrow-icon' />
                </NavLink>
            )}
            {/* <NavLink end to='/recipes/browse'>back</NavLink> */}
            {!props.isLast && (
                <NavLink
                    className='arrow right-arrow'
                    to={`/recipes/${Number(props.id) + 1}`}
                >
                    <ForwardArrowIcon className='arrow-icon' />
                </NavLink>
            )}
        </nav>
    );
}
