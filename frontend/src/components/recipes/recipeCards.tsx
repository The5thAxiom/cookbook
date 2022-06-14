import React from 'react';

import LoadingAnimation from '../loadingAnimation';
import RecipeCard from './recipeCard';
import './recipeCards.css';

export default function RecipeCards({
    recipes,
    collections,
    addToCollection,
    removeFromCollection
}: {
    recipes: recipeMeta[];
    collections: collection[];
    addToCollection: (collection_name: string, recipe: recipeMeta) => void;
    removeFromCollection: (collection_name: string, recipe: recipeMeta) => void;
}) {
    if (recipes === null) return <LoadingAnimation />;
    else if (recipes.length === 0)
        return <div className='util-centered'>No recipes found :(</div>;
    else
        return (
            <div className='recipe-cards'>
                {recipes.map(r => (
                    <RecipeCard
                        key={r.id}
                        recipe={r}
                        collections={collections}
                        addToCollection={addToCollection}
                        removeFromCollection={removeFromCollection}
                    />
                ))}
            </div>
        );
}

