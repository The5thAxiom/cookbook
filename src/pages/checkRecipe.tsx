import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../components/loadingAnimation';
import { recipeFull, recipeIngredient } from '../values/types';

export default function CheckRecipe() {
    const [recipe, setRecipe] = useState<recipeFull>(null as any);
    const params = useParams();
    useEffect(() => {
        fetch(`/api/recipes/${params.id}/full`)
            .then(r => r.json())
            .then((r: recipeFull) => setRecipe(r));
    }, [])
    if (recipe) return (
        <>
        {/* <LoadingAnimation/> */}
        <section id = "tags">
            {recipe.recipe_tags && recipe.recipe_tags.map((tag: string, index: number) =>
                <div key = {index} className = "recipe-tag">
                    {tag}
                </div>
            )}
        </section>
        <section id = "recipe">
            <h1>{recipe.name}</h1>
            <h2 id = "about">About</h2>
            <b>{recipe.vegetarian ? "veg" : "non-veg"}</b> {" | "}
            <b>{`takes ${recipe.prep_time} minutes`}</b> {" | "}
            <b>{`makes ${recipe.quantity} ${recipe.unit}`}</b> {" | "}
            <b>{`difficulty: ${'⭐'.repeat(recipe.difficulty)}`}</b>
            <br/><br/>
            <em>{recipe.description}</em>
            <hr/>

            <h2 id = "ingredients">Ingredients</h2>
            <ol>
                {recipe.recipe_ingredients && recipe.recipe_ingredients.map((ing: recipeIngredient, index: number) =>
                    <li key = {index} className = "recipe-ingredient">
                        {ing.quantity} {ing.unit} of {ing.english_name} ({ing.hindi_name_devnagari} | {ing.hindi_name_latin})
                    </li>
                )}
            </ol>
            <hr/>

            <h2 id = "steps">Steps</h2>
            <ol>
                {recipe.recipe_steps && recipe.recipe_steps.map((step: string, index: number) =>
                    <li key = {index} className = "recipe-step">{step}</li>
                )}
            </ol>
        </section>
        <section>
            next | previous
        </section>
        </>
    );
    else return (<LoadingAnimation/>);
}