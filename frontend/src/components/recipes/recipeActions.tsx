import React, { useEffect, useState } from 'react';

import useCurrentUser from '../../hooks/useCurrentUser';
import HeartIcon from '../../components/icons/heartIcon';
import BrokenHeartIcon from '../../components/icons/brokenHeartIcon';

export default function RecipeActions({ recipe }: { recipe: recipeMeta }) {
    const [user, fetchAsUser] = useCurrentUser();

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

    if (user)
        return (
            <div className='util-row-flexend'>
                {userFavourites &&
                userFavourites.filter(r => r.id === recipe.id).length === 1 ? (
                    <span
                        className='util-clickable'
                        onClick={removeFromFavourites}
                    >
                        <BrokenHeartIcon />
                    </span>
                ) : (
                    <span className='util-clickable' onClick={addToFavourites}>
                        <HeartIcon />
                    </span>
                )}
            </div>
        );
    else return <></>;
}
