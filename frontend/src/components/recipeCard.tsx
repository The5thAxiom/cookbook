import React, { useEffect, useState } from 'react';
import { recipeMeta } from '../values/types';
import { NavLink } from 'react-router-dom';
import RecipeTags from './recipeTags';

export default function RecipeCard({
    recipe,
    isLast
}: {
    recipe: recipeMeta;
    isLast: boolean;
}) {
    const [tags, setTags] = useState<string[]>(null as any);

    useEffect(() => {
        fetch(`/api/recipes/${recipe.id}/tags`)
            .then(res => (res.ok ? res.json() : null))
            .then(data => setTags(data.tags));
    }, []);

    return (
        <div className='recipe-card' id={`${recipe.id}`}>
            <div className='name'>
                <NavLink to={`/recipes/${recipe.id}`}>{recipe.name}</NavLink> by{' '}
                <NavLink to={`/user/profile/${recipe.contributor_username}`}>
                    @{recipe.contributor_username}
                </NavLink>
            </div>
            <div className='info'>
                <b>{recipe.vegetarian ? 'veg' : 'non-veg'}</b>
                <b>{`takes ${recipe.prep_time} minutes`}</b>
                <b>{`makes ${recipe.quantity} ${recipe.unit}`}</b>
                <b>{`difficulty: ${'⭐'.repeat(recipe.difficulty)}`}</b>
            </div>
            <div className='description'>{recipe.description}</div>
            {tags && <RecipeTags tags={tags} />}
            {/* {isLast && <hr />} */}
        </div>
    );
}
