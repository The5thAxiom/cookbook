import React, { useState } from 'react';

import BackwardArrowIcon from '../icons/backwardArrowIcon';
import ForwardArrowIcon from '../icons/forwardArrowIcon';
import LoadingAnimation from '../loadingAnimation';
import RecipeCard from './recipeCard';
import './recipeCarousel.css';

export default function RecipeCarousel({
    recipes,
    carousel,
    columns
}: {
    recipes: recipeMeta[];
    carousel: boolean;
    columns: number;
}) {
    const [step, setStep] = useState<number>(0);

    if (recipes === null) return <LoadingAnimation />;
    else if (recipes.length === 0)
        return <div className='util-centered'>No recipes found :(</div>;
    else {
        const carouselNext = () => {
            setStep(step + columns);
        };
        const carouselPrev = () => {
            setStep(step - columns);
        };
        return (
            <div className='recipe-cards-carousel-container'>
                {step !== 0 && (
                    <div className='arrow prev' onClick={carouselPrev}>
                        <BackwardArrowIcon />
                    </div>
                )}
                <div
                    className='recipe-cards-carousel'
                    // style={{
                    //     gridTemplateColumns: '1fr '.repeat(columns)
                    // }}
                >
                    {recipes.slice(step, step + columns).map(r => (
                        <RecipeCard key={r.id} recipe={r} />
                    ))}
                </div>
                {step + columns <= recipes.length && (
                    <div className='arrow next' onClick={carouselNext}>
                        <ForwardArrowIcon />
                    </div>
                )}
            </div>
        );
    }
}

