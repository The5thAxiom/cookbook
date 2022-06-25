import React, { useRef, useState } from 'react';

import BackwardArrowIcon from '../icons/backwardArrowIcon';
import ForwardArrowIcon from '../icons/forwardArrowIcon';
import LoadingAnimation from '../loadingAnimation';
import RecipeCard from './recipeCard';
import './recipeCarousel.css';

export default function RecipeCarousel({
    recipes,
    reversed
}: {
    recipes: recipeMeta[];
    reversed?: boolean;
}) {
    const carousel = useRef<HTMLDivElement>(null);

    if (recipes === null) return <LoadingAnimation />;
    else if (recipes.length === 0)
        return <div className='util-centered'>No recipes found :(</div>;
    else {
        const goLeft = (scrollBy: number) => () => {
            if (carousel.current?.scrollLeft) {
                carousel.current.scrollLeft -= scrollBy;
            }
        };
        const goRight = (scrollBy: number) => () => {
            if (carousel.current) {
                if (!carousel.current.scrollLeft)
                    carousel.current.scrollLeft = 0;
                carousel.current.scrollLeft += scrollBy;
            }
        };
        return (
            <div className='recipe-cards-carousel-container'>
                <div className='arrow prev util-noselect' onClick={goLeft(400)}>
                    <BackwardArrowIcon />
                </div>
                <div ref={carousel} className='recipe-cards-carousel'>
                    {(reversed ? recipes.slice().reverse() : recipes).map(r => (
                        <RecipeCard key={r.id} recipe={r} />
                    ))}
                </div>
                <div
                    className='arrow next util-noselect'
                    onClick={goRight(400)}
                >
                    <ForwardArrowIcon />
                </div>
            </div>
        );
    }
}

