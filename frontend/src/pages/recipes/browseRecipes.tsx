import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCards from '../../components/recipes/recipeCards';
import useFetch from '../../hooks/useFetch';

export default function BrowseRecipes() {
    const [searchParams] = useSearchParams();
    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);
    const { fetchJson } = useFetch();

    useEffect(() => {
        const fetchRecipes = async () => {
            const user = searchParams.get('only-user');
            const tag = searchParams.get('only-tag');
            const q = searchParams.get('q');
            setRecipes([]);

            let data;
            if (user !== null)
                data = await fetchJson<{ recipes: recipeMeta[] }>(
                    `/api/users/${user}/recipes`
                );
            else if (tag !== null)
                data = await fetchJson<{ recipes: recipeMeta[] }>(
                    `/api/recipes/bytag/${tag}`
                );
            else
                data = await fetchJson<{ recipes: recipeMeta[] }>(
                    '/api/recipes/all'
                );
            if (q)
                setRecipes(
                    data.recipes.filter((r: recipeMeta) =>
                        r.name.toLowerCase().includes(q.toLowerCase())
                    )
                );
            else setRecipes(data.recipes);
        };
        fetchRecipes();
    }, [searchParams]);
    return (
        <main>
            <h1>Recipes</h1>
            {<RecipeCards recipes={recipes} />}
        </main>
    );
}

