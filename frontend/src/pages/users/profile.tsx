import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingAnimation from '../../components/loadingAnimation';
import RecipeCarousel from '../../components/recipes/recipeCarousel';

import './profile.css';

export default function Profile({
    accessToken,
    setAccessToken,
    removeAccessToken
}: {
    accessToken: string;
    setAccessToken?: any;
    removeAccessToken?: any;
}) {
    const [user, setUser] = useState<userData>(null as any);
    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);

    useEffect(() => {
        fetch('/api/users/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                if (res.ok) return res.json();
                else {
                    removeAccessToken();
                    throw new Error();
                }
            })
            .then(data => {
                data.access_token && setAccessToken(data.access_token);
                setUser(data);
            })
            .catch(e => {});
    }, [accessToken, setAccessToken, removeAccessToken]);

    useEffect(() => {
        setRecipes(null as any);
        if (user)
            fetch(`/api/users/${user.username}/recipes`)
                // .then(res => (res.ok ? res.json() : { recipes: [] }))
                .then(res => res.json())
                .then(data => setRecipes(data.recipes));
    }, [user]);

    if (user)
        return (
            <main>
                <h1>@{user.username}</h1>
                <section id='info' className='util-centered'>
                    <h2>Your Info</h2>
                    <b>{user.name}</b>
                    <p>{user.bio}</p>
                </section>
                <section id='recipes'>
                    <h2>Your Recipes</h2>
                    <div className='profile-action-buttons'>
                        <NavLink end to='/recipes/new'>
                            Add new recipe
                        </NavLink>
                        <NavLink end to={`/recipes?only-user=${user.username}`}>
                            All recipes
                        </NavLink>
                    </div>
                    <RecipeCarousel recipes={recipes} carousel columns={2} />
                </section>
                <section id='skills'>
                    {/* <li><NavLink end to='/skills/new'>add skill</NavLink></li>
                <li><NavLink end to='/skills'>see your skills</NavLink></li> */}
                </section>
            </main>
        );
    else
        return (
            <main>
                <LoadingAnimation />
            </main>
        );
}

