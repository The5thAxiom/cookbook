import React, { useEffect, useState } from 'react';
import { recipeMeta } from '../values/types';
import { NavLink } from 'react-router-dom';
import RecipeTags from './recipeTags';

export default function RecipeCard(recipe: recipeMeta) {
    const [tags, setTags] = useState<string[]>(null as any);

    useEffect(() => {
        fetch(`/api/recipes/${recipe.id}/tags`)
            .then(res => (res.ok ? res.json() : null))
            .then(data => setTags(data.tags));
    }, []);

    return (
        <>
            <h3>
                <NavLink to={`/recipes/${recipe.id}`}>{recipe.name}</NavLink> by{' '}
                <NavLink to={`/user/profile/${recipe.contributor_username}`}>
                    @{recipe.contributor_username}
                </NavLink>
            </h3>
            <b>{recipe.vegetarian ? 'veg' : 'non-veg'}</b> {' | '}
            <b>{`takes ${recipe.prep_time} minutes`}</b> {' | '}
            <b>{`makes ${recipe.quantity} ${recipe.unit}`}</b> {' | '}
            <b>{`difficulty: ${'⭐'.repeat(recipe.difficulty)}`}</b>
            <br />
            <br />
            <em>{recipe.description}</em>
            {tags && <RecipeTags tags={tags} />}
        </>
    );
}
