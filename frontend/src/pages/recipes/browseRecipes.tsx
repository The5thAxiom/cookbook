import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingAnimation from '../../components/loadingAnimation';
import RecipeCard from '../../components/recipeCard';
import { recipeMeta } from '../../values/types';

export default function BrowseRecipes() {
    const [searchParams] = useSearchParams();
    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);

    useEffect(() => {
        const user = searchParams.get('only-user');
        setRecipes(null as any);
        if (user !== null)
            fetch(`/api/users/${user}/recipes`)
                .then(res => (res.ok ? res.json() : { recipes: [] }))
                .then(data => setRecipes(data.recipes))
                .catch(e => console.log());
        else
            fetch('/api/recipes/all')
                .then(res => (res.ok ? res.json() : { recipes: [] }))
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
                        <RecipeCard {...r} />
                        {index !== recipes.length - 1 && <hr />}
                    </section>
                ))}
            </main>
        );
}

