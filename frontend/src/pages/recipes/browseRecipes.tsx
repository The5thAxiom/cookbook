import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCards from '../../components/recipes/recipeCards';

export default function BrowseRecipes() {
    const [searchParams] = useSearchParams();
    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);
    const fetchRecipes = async () => {
        const user = searchParams.get('only-user');
        const tag = searchParams.get('only-tag');
        setRecipes(null as any);
        let res;
        if (user !== null) res = await fetch(`/api/users/${user}/recipes`);
        else if (tag !== null) res = await fetch(`/api/recipes/bytag/${tag}`);
        else res = await fetch('/api/recipes/all');
        if (res.ok) {
            const data = await res.json();
            setRecipes(data.recipes);
        } else {
            setRecipes([]);
        }
    };
    useEffect(() => {
        fetchRecipes();
    }, [searchParams]);
    return (
        <main>
            <h1>Recipes</h1>
            {<RecipeCards recipes={recipes} />}
        </main>
    );
}

