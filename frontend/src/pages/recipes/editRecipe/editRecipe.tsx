import { useEffect, useState } from 'react';
import { useParams /* Navigate */ } from 'react-router-dom';

// import IngredientForm from '../newRecipe/ingredientForm';
// import StepForm from '../newRecipe/stepForm';
// import TagForm from '../newRecipe/tagForm';
// import BasicForm from '../newRecipe/basicForm';

import '../newRecipe/newRecipe.css';
import useFetch from '../../../hooks/useFetch';
import LoadingAnimation from '../../../components/loadingAnimation';

export default function EditRecipe() {
    const [recipe, setRecipe] = useState<recipeFull>(null as any);
    const params = useParams();

    const { fetchJson } = useFetch();

    useEffect(() => {
        setRecipe(null as any);
        const fetchFullRecipe = async (id: number) => {
            const data = await fetchJson<recipeFull>(`/api/recipes/${id}/full`);
            setRecipe(data);
        };
        const currentId = Number(params.id);
        if (currentId) {
            fetchFullRecipe(currentId);
        }
    }, [params.id]);

    /* const [recipeMeta, setRecipeMeta] = useState<recipeMeta>({
        id: 0,
        description: '',
        name: '',
        prep_time: 0,
        difficulty: 3,
        quantity: 0,
        unit: '',
        vegetarian: false,
        contributor_username: ''
    });

    const { fetchAsUser } = useFetch();

    const [ingredients, setIngredients] = useState<recipeIngredient[]>([]);
    const [tempIngredient, setTempIngredient] = useState<recipeIngredient>({
        english_name: '',
        hindi_name_devnagari: '',
        hindi_name_latin: '',
        quantity: 0,
        unit: ''
    });

    const [steps, setSteps] = useState<string[]>([]);
    const [tempStep, setTempStep] = useState<string>('');

    const [tags, setTags] = useState<string[]>([]);
    const [tempTag, setTempTag] = useState<string>('');

    const [submitted, setSubmitted] = useState<boolean>(false);

    const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let recipe = {
            description: recipeMeta.description,
            name: recipeMeta.name,
            prep_time: recipeMeta.prep_time,
            difficulty: recipeMeta.difficulty,
            quantity: recipeMeta.quantity,
            unit: recipeMeta.unit,
            vegetarian: recipeMeta.vegetarian,
            contributor_username: recipeMeta.contributor_username,
            recipe_tags: tags.map(t => {
                return {
                    name: t
                };
            }),
            recipe_ingredients: ingredients,
            recipe_steps: steps.map((s, i) => {
                return { serial_number: i + 1, instruction: s };
            })
        };
        console.log(recipe);
        fetchAsUser('/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        }).then(res => {
            if (res.ok) setSubmitted(true);
        });
    };

    const saveRecipe = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.setItem('saved_recipe_info', JSON.stringify(recipeMeta));
        localStorage.setItem(
            'saved_recipe_ingredients',
            JSON.stringify(ingredients)
        );
        localStorage.setItem('saved_recipe_steps', JSON.stringify(steps));
        localStorage.setItem('saved_recipe_tags', JSON.stringify(tags));
        if (recipeMeta.name)
            window.alert(`${recipeMeta.name} was saved locally!`);
    };

    const loadRecipe = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let info = localStorage.getItem('saved_recipe_info');
        let ings = localStorage.getItem('saved_recipe_ingredients');
        let steps = localStorage.getItem('saved_recipe_steps');
        let tags = localStorage.getItem('saved_recipe_tags');

        if (info) setRecipeMeta(JSON.parse(info));
        if (ings) setIngredients(JSON.parse(ings));
        if (steps) setSteps(JSON.parse(steps));
        if (tags) setTags(JSON.parse(tags));
    };

    const clearSavedRecipe = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.removeItem('saved_recipe_info');
        localStorage.removeItem('saved_recipe_ingredients');
        localStorage.removeItem('saved_recipe_steps');
        localStorage.removeItem('saved_recipe_tags');
    };

    const clearRecipe = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setRecipeMeta({
            id: 0,
            description: '',
            name: '',
            prep_time: 0,
            difficulty: 3,
            quantity: 0,
            unit: '',
            vegetarian: false,
            contributor_username: ''
        });
        setIngredients([]);
        setTempIngredient({
            english_name: '',
            hindi_name_devnagari: '',
            hindi_name_latin: '',
            quantity: 0,
            unit: ''
        });
        setSteps([]);
        setTempStep('');
        setTags([]);
        setTempTag('');
    }; */

    // if (submitted) return <Navigate to='/user' />; else
    if (recipe)
        return (
            <main>
                <h1>Edit {recipe.name}</h1>
                {/* <form className='cb-forms'>
                <div className='cb-form-end'>
                    <button onClick={saveRecipe} className='cb-form-button'>
                        Save Recipe
                    </button>
                    <button onClick={loadRecipe} className='cb-form-button'>
                        Load Saved Recipe
                    </button>
                    <button
                        onClick={clearSavedRecipe}
                        className='cb-form-button'
                    >
                        Clear Saved Recipe
                    </button>
                </div>
                <BasicForm recipe={recipeMeta} setRecipe={setRecipeMeta} />
                <IngredientForm
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    tempIngredient={tempIngredient}
                    setTempIngredient={setTempIngredient}
                />
                <StepForm
                    steps={steps}
                    setSteps={setSteps}
                    tempStep={tempStep}
                    setTempStep={setTempStep}
                />
                <TagForm
                    tags={tags}
                    setTags={setTags}
                    tempTag={tempTag}
                    setTempTag={setTempTag}
                />
                <div className='cb-form-end'>
                    <button onClick={submitForm} className='cb-form-button'>
                        Submit Recipe
                    </button>
                    <button onClick={clearRecipe} className='cb-form-button'>
                        Clear Recipe
                    </button>
                </div>
            </form> */}
            </main>
        );
    else
        return (
            <main>
                <LoadingAnimation />
            </main>
        );
}

