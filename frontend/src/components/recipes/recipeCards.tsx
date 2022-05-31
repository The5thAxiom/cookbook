import React from 'react';
import { recipeMeta } from '../../values/types';
import LoadingAnimation from '../loadingAnimation';
import RecipeCard from './recipeCard';
import './recipeCards.css';

export default function RecipeCards({
    recipes,
    rows
}: {
    recipes: recipeMeta[];
    rows?: number;
}) {
    if (recipes === null)
        return (
            <main>
                <LoadingAnimation />
            </main>
        );
    else if (recipes.length === 0)
        return <div className='util-centered'>No recipes found :(</div>;
    // else if (rows)
    //     return (
    //         <div className='recipe-cards-carousel'>
    //             {recipes.map(r => (
    //                 <RecipeCard key={r.id} recipe={r} />
    //             ))}
    //         </div>
    //     );
    else
        return (
            <div className='recipe-cards'>
                {recipes.map(r => (
                    <RecipeCard key={r.id} recipe={r} />
                ))}
            </div>
        );
}

