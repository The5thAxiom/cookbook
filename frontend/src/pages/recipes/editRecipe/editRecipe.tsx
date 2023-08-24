import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import IngredientForm from '../../../components/recipeForm/ingredientForm';
import StepForm from '../../../components/recipeForm/stepForm';
import TagForm from '../../../components/recipeForm/tagForm';
import BasicForm from '../../../components/recipeForm/basicForm';

import '../newRecipe/newRecipe.css';
import useFetch from '../../../hooks/useFetch';
import LoadingAnimation from '../../../components/loadingAnimation/loadingAnimation';
import useMainAction from '../../../hooks/useMainAction';
import useCurrentUser from '../../../hooks/useCurrentUser';

export default function EditRecipe() {
    const [recipe, setRecipe] = useState<recipeFull>(null as any);
    const params = useParams();
    const { user } = useCurrentUser();

    const { fetchJson } = useFetch();

    const { startMainAction, endMainAction } = useMainAction();

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

    const [recipeMeta, setRecipeMeta] = useState<recipeMeta>({
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

    const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (user.username !== recipe.contributor_username) {
            window.alert("Please do not delete someone else's recipe.");
            return;
        }
        e.preventDefault();
        startMainAction();
        let newRecipe = {
            description: recipeMeta.description,
            name: recipeMeta.name,
            prep_time: recipeMeta.prep_time,
            difficulty: recipeMeta.difficulty,
            quantity: recipeMeta.quantity,
            unit: recipeMeta.unit,
            vegetarian: recipeMeta.vegetarian,
            contributor_username: recipeMeta.contributor_username,
            recipe_tags: tags.map(t => ({ name: t })),
            recipe_ingredients: ingredients,
            recipe_steps: steps.map((s, i) => ({
                serial_number: i + 1,
                instruction: s
            }))
        };
        await fetchAsUser(`/api/recipes/${recipe.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        }).then(res => {
            if (res.ok) setSubmitted(true);
        });
        endMainAction();
    };

    useEffect(() => {
        if (recipe) {
            if (recipeMeta.id === 0)
                setRecipeMeta({
                    id: recipe.id,
                    description: recipe.description,
                    name: recipe.name,
                    prep_time: recipe.prep_time,
                    difficulty: recipe.difficulty,
                    quantity: recipe.quantity,
                    unit: recipe.unit,
                    vegetarian: recipe.vegetarian,
                    contributor_username: recipe.contributor_username
                });
            if (ingredients.length === 0)
                setIngredients(recipe.recipe_ingredients);
            if (steps.length === 0) setSteps(recipe.recipe_steps);
            if (tags.length === 0) setTags(recipe.recipe_tags);
        }
    }, [recipe]);

    if (submitted) return <Navigate to='/user' />;
    else if (recipe)
        return (
            <main>
                <h1>Edit {recipe.name}</h1>
                <form className='cb-forms'>
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
                            Save Recipe
                        </button>
                    </div>
                </form>
            </main>
        );
    else
        return (
            <main>
                <LoadingAnimation />
            </main>
        );
}

