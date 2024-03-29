import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import RecipeTags from '../recipeTags/recipeTags';
import LoadingAnimation from '../../loadingAnimation/loadingAnimation';
import RecipeActions from '../recipeActions';
import useFetch from '../../../hooks/useFetch';

const fitToLength = (text: string, length: number): string =>
    text.length > length ? text.slice(0, length - 3) + '...' : text.padEnd(30);

export default function RecipeCard({ recipe }: { recipe: recipeMeta }) {
    const [tags, setTags] = useState<string[]>(null as any);
    const { fetchJson } = useFetch();

    useEffect(() => {
        const fetchRecipeTags = async (id: number) => {
            const data = await fetchJson<{ tags: string[] }>(
                `/api/recipes/${id}/tags`
            );
            setTags(data.tags);
        };
        fetchRecipeTags(recipe.id);
    }, [recipe.id, fetchJson]);

    return (
        <div className='recipe-card' id={`${recipe.id}`}>
            <RecipeActions recipe={recipe} />
            <div className='recipe-card-name'>
                <NavLink to={`/recipes/${recipe.id}`}>
                    {fitToLength(recipe.name, 40)}
                </NavLink>
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
            <div className='recipe-card-description'>
                {fitToLength(recipe.description, 100)}
            </div>
            {tags ? <RecipeTags tags={tags} /> : <LoadingAnimation />}
        </div>
    );
}

