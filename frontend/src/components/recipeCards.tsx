import React from 'react';
import { recipeMeta } from '../values/types';
import RecipeCard from './recipeCard';
import './recipeCards.css';

export default function RecipeCards({ recipes }: { recipes: recipeMeta[] }) {
    return (
        <div className='recipe-cards'>
            {recipes.map((r: recipeMeta, index: number) => (
                <RecipeCard
                    key={index}
                    recipe={r}
                    isLast={index !== recipes.length - 1}
                />
            ))}
        </div>
    );
}
