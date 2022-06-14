import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import RecipeTags from './recipeTags';
import LoadingAnimation from './../loadingAnimation';
import RecipeActions from '../../components/recipes/recipeActions';

export default function RecipeCard({
    recipe,
    collections,
    addToCollection,
    removeFromCollection
}: {
    recipe: recipeMeta;
    collections: collection[];
    addToCollection: (collection_name: string, recipe: recipeMeta) => void;
    removeFromCollection: (collection_name: string, recipe: recipeMeta) => void;
}) {
    const [tags, setTags] = useState<string[]>(null as any);

    useEffect(() => {
        fetch(`/api/recipes/${recipe.id}/tags`)
            .then(res => (res.ok ? res.json() : null))
            .then(data => setTags(data.tags));
    }, [recipe.id]);

    return (
        <div className='recipe-card' id={`${recipe.id}`}>
            <RecipeActions
                recipe={recipe}
                collections={collections}
                addToCollection={addToCollection}
                removeFromCollection={removeFromCollection}
            />
            <div className='recipe-card-name'>
                <NavLink to={`/recipes/${recipe.id}`}>{recipe.name}</NavLink>
            </div>
            <div className='recipe-card-byline'>
                by{' '}
                <NavLink to={`/user/@${recipe.contributor_username}`}>
                    @{recipe.contributor_username}
                </NavLink>
            </div>
            <div className='recipe-card-stats'>
                <div>{recipe.vegetarian ? 'veg' : 'non-veg'}</div>
                <div>{recipe.prep_time} min.</div>
                <div>
                    {recipe.quantity} {recipe.unit}
                </div>
                <div>difficulty:{'★'.repeat(recipe.difficulty)}</div>
            </div>
            <div className='recipe-card-description'>{recipe.description}</div>
            {tags ? <RecipeTags tags={tags} /> : <LoadingAnimation />}
        </div>
    );
}

