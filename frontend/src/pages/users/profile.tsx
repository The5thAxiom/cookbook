import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingAnimation from '../../components/loadingAnimation';
import RecipeCarousel from '../../components/recipes/recipeCarousel';

import './profile.css';

export default function Profile({
    user,
    accessToken
}: {
    user: userData;
    accessToken: string;
}) {
    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);
    const [collections, setCollections] = useState<
        {
            name: string;
            recipes: recipeMeta[];
        }[]
    >(null as any);

    useEffect(() => {
        setRecipes(null as any);
        fetch(`/api/users/${user.username}/recipes`)
            // .then(res => (res.ok ? res.json() : { recipes: [] }))
            .then(res => res.json())
            .then(data => setRecipes(data.recipes));
    }, []);

    useEffect(() => {
        setCollections(null as any);
        fetch(`/api/users/${user.username}/collections`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setCollections(
                    data.collections.map((c: any) => {
                        return {
                            name: c.name,
                            recipes: c.recipes
                        };
                    })
                );
            })
            .catch(e => {});
    }, []);

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
            <section>
                <h2>Your Collections</h2>
                {collections ? (
                    collections.map((c, i) => (
                        <div className='collection' key={i}>
                            <h3>{c.name}</h3>
                            <RecipeCarousel
                                recipes={c.recipes}
                                carousel
                                columns={2}
                            />
                        </div>
                    ))
                ) : (
                    <LoadingAnimation />
                )}
            </section>
        </main>
    );
}

