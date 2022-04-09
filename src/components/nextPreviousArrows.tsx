import React from 'react';
import { NavLink } from 'react-router-dom';
import { arrowData } from '../values/types';
import arrowForward from '../assets/arrow_forward_google.svg';
import arrowBackward from '../assets/arrow_backward_google.svg';
import './nextPreviousArrows.css';

export default function NextPreviousArrows(props: arrowData) {
    return (
        <nav
            className={`next-previous-arrows${
                props.top ? ' top-arrows' : ' botttom-arrows'
            }`}
        >
            {Number(props.id) > 1 && (
                <NavLink
                    className='arrow left-arrow'
                    to={`/recipes/${Number(props.id) - 1}`}
                >
                    <svg
                        // icon from https://fonts.google.com/icons
                        className='arrow-icon'
                        xmlns='http://www.w3.org/2000/svg'
                        height='24px'
                        viewBox='0 0 24 24'
                        width='24px'
                        fill='#000000'
                    >
                        <path d='M0 0h24v24H0V0z' fill='none' opacity='.87' />
                        <path d='M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z' />
                    </svg>
                </NavLink>
            )}
            {/* <NavLink to='/recipes/browse'>back</NavLink> */}
            {!props.isLast && (
                <NavLink
                    className='arrow right-arrow'
                    to={`/recipes/${Number(props.id) + 1}`}
                >
                    <svg
                        className='arrow-icon'
                        xmlns='http://www.w3.org/2000/svg'
                        enable-background='new 0 0 24 24'
                        height='24px'
                        viewBox='0 0 24 24'
                        width='24px'
                        fill='#000000'
                    >
                        <g>
                            <path d='M0,0h24v24H0V0z' fill='none' />
                        </g>
                        <g>
                            <polygon points='6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12' />
                        </g>
                    </svg>
                </NavLink>
            )}
        </nav>
    );
}
