import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    const params = useParams();
    const navigate = useNavigate();

    const { user } = useCurrentUser();
    const { fetchJson, fetchAsUser } = useFetch();
    const { startMainAction, endMainAction } = useMainAction();

    const [recipe, setRecipe] = useState<recipeFull>(null as any);
    const [recipeMetaToSave, setRecipeMetaToSave] = useState<recipeMeta>({
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

    const [ingredientsToSave, setIngredientsToSave] = useState<
        recipeIngredient[]
    >([]);
    const [tempIngredient, setTempIngredient] = useState<recipeIngredient>({
        english_name: '',
        hindi_name_devnagari: '',
        hindi_name_latin: '',
        quantity: 0,
        unit: ''
    });

    const [stepsToSave, setStepsToSave] = useState<string[]>([]);
    const [tempStep, setTempStep] = useState<string>('');

    const [tagsToSave, setTagsToSave] = useState<string[]>([]);
    const [tempTag, setTempTag] = useState<string>('');

    useEffect(() => {
        setRecipe(null as any);
        const fetchFullRecipe = async (id: number) => {
            const recipe = await fetchJson<recipeFull>(
                `/api/recipes/${id}/full`
            );
            setRecipe(recipe);
            setRecipeMetaToSave({
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
            setIngredientsToSave(recipe.recipe_ingredients);
            setStepsToSave(recipe.recipe_steps);
            setTagsToSave(recipe.recipe_tags);
        };
        const currentId = Number(params.id);
        if (currentId) {
            fetchFullRecipe(currentId);
        }
    }, [params.id, fetchJson]);

    const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (user.username !== recipe.contributor_username) {
            window.alert("Please do not delete someone else's recipe.");
            return;
        }
        e.preventDefault();
        startMainAction();
        let newRecipe = {
            description: recipeMetaToSave.description,
            name: recipeMetaToSave.name,
            prep_time: recipeMetaToSave.prep_time,
            difficulty: recipeMetaToSave.difficulty,
            quantity: recipeMetaToSave.quantity,
            unit: recipeMetaToSave.unit,
            vegetarian: recipeMetaToSave.vegetarian,
            contributor_username: recipeMetaToSave.contributor_username,
            recipe_tags: tagsToSave.map(t => ({ name: t })),
            recipe_ingredients: ingredientsToSave,
            recipe_steps: stepsToSave.map((s, i) => ({
                serial_number: i + 1,
                instruction: s
            }))
        };
        const res = await fetchAsUser(`/api/recipes/${recipe.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        });
        if (res.ok) {
            window.alert('Recipe saved successfully');
            navigate(`/recipes/${recipe.id}`);
        }
        endMainAction();
    };

    return (
        <main>
            {recipe ? (
                <>
                    <h1>Edit {recipe.name}</h1>
                    <form className='cb-forms'>
                        <BasicForm
                            recipe={recipeMetaToSave}
                            setRecipe={setRecipeMetaToSave}
                        />
                        <IngredientForm
                            ingredients={ingredientsToSave}
                            setIngredients={setIngredientsToSave}
                            tempIngredient={tempIngredient}
                            setTempIngredient={setTempIngredient}
                        />
                        <StepForm
                            steps={stepsToSave}
                            setSteps={setStepsToSave}
                            tempStep={tempStep}
                            setTempStep={setTempStep}
                        />
                        <TagForm
                            tags={tagsToSave}
                            setTags={setTagsToSave}
                            tempTag={tempTag}
                            setTempTag={setTempTag}
                        />
                        <div className='cb-form-end'>
                            <button
                                onClick={submitForm}
                                className='cb-form-button'
                            >
                                Save Recipe
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <LoadingAnimation />
            )}
        </main>
    );
}

