import React, { useEffect, useState } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import LoadingAnimation from '../../components/loadingAnimation';
import { recipeMeta } from '../../values/types';

export default function BrowseRecipes() {
    const [searchParams] = useSearchParams();
    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);

    useEffect(() => {
        const user = searchParams.get('user');
        setRecipes(null as any);
        if (user !== null)
            fetch(`/api/users/${user}/recipes`)
                .then(res => (res.ok ? res.json() : { recipes: [] }))
                .then(data => setRecipes(data.recipes))
                .catch(e => console.log());
        else
            fetch('/api/recipes/all')
                .then(res => res.json())
                .then(data => setRecipes(data.recipes))
                .catch(e => setRecipes([]));
    }, [searchParams]);

    if (recipes === null)
        return (
            <main>
                <LoadingAnimation />
            </main>
        );
    else if (recipes.length === 0)
        return (
            <main>
                <h1>Recipes</h1>
                <b>No recipes found :(</b>
            </main>
        );
    else
        return (
            <main>
                <h1>Recipes</h1>
                {recipes.map((r: recipeMeta, index: number) => (
                    <section key={index} id={`${r.id}`}>
                        <h3>
                            <NavLink to={`/recipes/${r.id}`}>{r.name}</NavLink>{' '}
                            by{' '}
                            <NavLink
                                to={`/user/profile/${r.contributor_username}`}
                            >
                                @{r.contributor_username}
                            </NavLink>
                        </h3>
                        <b>{r.vegetarian ? 'veg' : 'non-veg'}</b> {' | '}
                        <b>{`takes ${r.prep_time} minutes`}</b> {' | '}
                        <b>{`makes ${r.quantity} ${r.unit}`}</b> {' | '}
                        <b>{`difficulty: ${'⭐'.repeat(r.difficulty)}`}</b>
                        <br />
                        <br />
                        <em>{r.description}</em>
                        {index !== recipes.length - 1 && <hr />}
                    </section>
                ))}
            </main>
        );
}

