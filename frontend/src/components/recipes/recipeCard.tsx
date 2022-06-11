import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import RecipeTags from './recipeTags';
import LoadingAnimation from './../loadingAnimation';
import useCurrentUser from '../../hooks/useCurrentUser';

export default function RecipeCard({ recipe }: { recipe: recipeMeta }) {
    const [tags, setTags] = useState<string[]>(null as any);
    const [user, fetchAsUser] = useCurrentUser();

    useEffect(() => {
        fetch(`/api/recipes/${recipe.id}/tags`)
            .then(res => (res.ok ? res.json() : null))
            .then(data => setTags(data.tags));
    }, [recipe.id]);

    const addToFavourites = () => {
        fetchAsUser(`/api/users/${user.username}/collections/favourites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        }).then(res =>
            res.ok
                ? window.alert(`${recipe.name} was added to favourites!`)
                : window.alert('try again:(')
        );
    };

    return (
        <div className='recipe-card' id={`${recipe.id}`}>
            <div>
                <span style={{ cursor: 'pointer' }} onClick={addToFavourites}>
                    ❤️
                </span>
            </div>
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

