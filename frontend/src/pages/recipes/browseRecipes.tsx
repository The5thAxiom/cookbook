import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCards from '../../components/recipes/recipeCards';

export default function BrowseRecipes({
    collections,
    addToCollection,
    removeFromCollection
}: {
    collections: collection[];
    addToCollection: (collection_name: string, recipe: recipeMeta) => void;
    removeFromCollection: (collection_name: string, recipe: recipeMeta) => void;
}) {
    const [searchParams] = useSearchParams();
    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);

    useEffect(() => {
        const user = searchParams.get('only-user');
        const tag = searchParams.get('only-tag');
        setRecipes(null as any);
        if (user !== null)
            fetch(`/api/users/${user}/recipes`)
                .then(res => (res.ok ? res.json() : { recipes: [] }))
                .then(data => setRecipes(data.recipes));
        else if (tag !== null)
            fetch(`/api/recipes/bytag/${tag}`)
                .then(res => (res.ok ? res.json() : { recipes: [] }))
                .then(data => setRecipes(data.recipes));
        else
            fetch('/api/recipes/all')
                .then(res => (res.ok ? res.json() : { recipes: [] }))
                .then(data => setRecipes(data.recipes))
                .catch(e => setRecipes([]));
    }, [searchParams]);
    return (
        <main>
            <h1>Recipes</h1>
            {
                <RecipeCards
                    recipes={recipes}
                    collections={collections}
                    addToCollection={addToCollection}
                    removeFromCollection={removeFromCollection}
                />
            }
        </main>
    );
}

