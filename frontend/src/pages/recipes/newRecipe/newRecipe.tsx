import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { recipeIngredient, recipeMeta } from '../../../values/types';

import IngredientForm from './ingredientForm';
import StepForm from './stepForm';
import TagForm from './tagForm';
import BasicForm from './basicForm';

import CloseIcon from '../../../components/icons/closeIcon';

import './newRecipe.css';

export default function NewRecipe({ accessToken }: { accessToken: string }) {
    // const [existingIngredients, setExistingIngredients] = useState<
    //     ingredient[]
    // >(null as any);

    // useEffect(() => {
    //     fetch('/api/ingredients/all')
    //         .then(res => (res.ok ? res.json() : null))
    //         .then(data => setExistingIngredients(data.ingredients));
    // }, []);

    const [recipeMeta, setRecipeMeta] = useState<recipeMeta>({
        id: 0,
        description: '',
        name: '',
        prep_time: 0,
        difficulty: 0,
        quantity: 0,
        unit: '',
        vegetarian: false,
        contributor_username: ''
    });

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
        fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(recipe)
        }).then(res => {
            if (res.ok) setSubmitted(true);
        });
    };

    return submitted ? (
        <Navigate to='/user' />
    ) : (
        <main>
            <h1>Add New Recipe</h1>
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
                        Submit Recipe
                    </button>
                </div>
            </form>
        </main>
    );
}

