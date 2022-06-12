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

    const [userFavourites, setUserFavourites] = useState<recipeMeta[]>(
        null as any
    );

    const fetchUserFavourites = () =>
        fetchAsUser(`/api/users/${user.username}/collections/favourites`)
            .then(res => res.json())
            .then(data => setUserFavourites(data.recipes));

    useEffect(() => {
        if (user && recipe) fetchUserFavourites();
    }, [user, recipe]);

    const addToFavourites = () => {
        fetchAsUser(`/api/users/${user.username}/collections/favourites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        }).then(res => {
            if (res.ok) {
                window.alert(`${recipe.name} was added to favourites!`);
                fetchUserFavourites();
            } else window.alert('try again:(');
        });
    };

    const removeFromFavourites = () => {
        fetchAsUser(`/api/users/${user.username}/collections/favourites`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        }).then(res => {
            if (res.ok) {
                window.alert(`${recipe.name} was removed from favourites!`);
                fetchUserFavourites();
            } else window.alert('try again:(');
        });
    };

    return (
        <div className='recipe-card' id={`${recipe.id}`}>
            {user && (
                <div className=' util-row-flexend'>
                    {userFavourites &&
                    userFavourites.filter(r => r.id === recipe.id).length ===
                        1 ? (
                        <span
                            className='util-clickable'
                            onClick={removeFromFavourites}
                        >
                            X
                        </span>
                    ) : (
                        <span
                            className='util-clickable'
                            onClick={addToFavourites}
                        >
                            ❤️
                        </span>
                    )}
                </div>
            )}
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

