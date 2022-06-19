import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import RecipeTags from './recipeTags';
import LoadingAnimation from './../loadingAnimation';
import RecipeActions from '../../components/recipes/recipeActions';
import useFetch from '../../hooks/useFetch';

export default function RecipeCard({ recipe }: { recipe: recipeMeta }) {
    const [tags, setTags] = useState<string[]>(null as any);
    const { fetchJson } = useFetch();

    const fetchRecipeTags = async () => {
        const data = await fetchJson<{ tags: string[] }>(
            `/api/recipes/${recipe.id}/tags`
        );
        setTags(data.tags);
    };

    useEffect(() => {
        fetchRecipeTags();
    }, [recipe.id]);

    return (
        <div className='recipe-card' id={`${recipe.id}`}>
            <RecipeActions recipe={recipe} />
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

