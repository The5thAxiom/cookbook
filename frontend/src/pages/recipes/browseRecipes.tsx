import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCards from '../../components/recipes/recipeCards/recipeCards';
import useFetch from '../../hooks/useFetch';

export default function BrowseRecipes() {
    const [searchParams] = useSearchParams();
    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);
    const { fetchJson } = useFetch();
    const [heading, setHeading] = useState<string>('Recipes');

    useEffect(() => {
        const fetchRecipes = async () => {
            const user = searchParams.get('only-user');
            const tag = searchParams.get('only-tag');
            const q = searchParams.get('q');
            setRecipes(null as any);
            setHeading('Recipes');

            let data;
            if (user !== null) {
                data = await fetchJson<{ recipes: recipeMeta[] }>(
                    `/api/users/${user}/recipes`
                );
                setHeading(`Recipes by @${user}`);
            } else if (tag !== null) {
                data = await fetchJson<{ recipes: recipeMeta[] }>(
                    `/api/recipes/bytag/${tag}`
                );
                setHeading(`Recipes with #${tag}`);
            } else {
                data = await fetchJson<{ recipes: recipeMeta[] }>(
                    '/api/recipes/all'
                );
            }
            if (q) {
                setRecipes(
                    data.recipes.filter((r: recipeMeta) =>
                        r.name.toLowerCase().includes(q.toLowerCase())
                    )
                );
                setHeading(`Search results for ${q}`);
            } else setRecipes(data.recipes);
        };
        fetchRecipes();
    }, [searchParams, fetchJson]);
    return (
        <main>
            <h1>{heading}</h1>
            {<RecipeCards recipes={recipes} />}
        </main>
    );
}

