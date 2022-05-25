import React from 'react';
import { recipeMeta } from '../values/types';
import RecipeCard from './recipeCard';
import './recipeCards.css';

export default function RecipeCards({ recipes }: { recipes: recipeMeta[] }) {
    return (
        <div className='recipe-cards'>
            {recipes.map((r: recipeMeta) => (
                <RecipeCard key={r.id} recipe={r} />
            ))}
        </div>
    );
}
