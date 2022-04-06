import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../components/loadingAnimation';
import NextPreviousArrows from '../components/nextPreviousArrows';
import RecipeTag from '../components/recipeTag';
import { recipeFull, recipeIngredient } from '../values/types';
import './checkRecipe.css';

export default function CheckRecipe() {
    const [recipe, setRecipe] = useState<recipeFull>(null as any);
    const [isLast, setIsLast] = useState<boolean>(false);
    const params = useParams();

    useEffect(() => {
        fetch(`/api/recipes/${params.id}/full`)
            .then(r => r.json())
            .then((r: recipeFull) => setRecipe(r));
        fetch('/api/recipes/count')
            .then(res => res.json())
            .then(data => setIsLast(data.count === Number(params.id)));
    }, [params.id]);

    if (recipe)
        return (
            <main id='content'>
                <article id='recipe'>
                    <h1>{recipe.name}</h1>
                    <section id='about'>
                        <h2>About</h2>
                        Contributed by <em>{recipe.contributor_name}</em> <br />
                        <b>{recipe.vegetarian ? 'veg' : 'non-veg'}</b> {' | '}
                        <b>{`takes ${recipe.prep_time} minutes`}</b> {' | '}
                        <b>{`makes ${recipe.quantity} ${recipe.unit}`}</b>{' '}
                        {' | '}
                        <b>{`difficulty: ${'⭐'.repeat(recipe.difficulty)}`}</b>
                        <br />
                        <br />
                        <em>{recipe.description}</em>
                    </section>
                    <hr />
                    <section id='ingredients'>
                        <h2>Ingredients</h2>
                        <ol>
                            {recipe.recipe_ingredients.map(
                                (ing: recipeIngredient, index: number) => (
                                    <li
                                        key={index}
                                        className='recipe-ingredient'
                                    >
                                        {ing.quantity} {ing.unit} of{' '}
                                        {ing.english_name} (
                                        {ing.hindi_name_devnagari} |{' '}
                                        {ing.hindi_name_latin})
                                    </li>
                                )
                            )}
                        </ol>
                    </section>
                    <hr />
                    <section id='steps'>
                        <h2>Steps</h2>
                        <ol>
                            {recipe.recipe_steps.map(
                                (step: string, index: number) => (
                                    <li key={index} className='recipe-step'>
                                        {step}
                                    </li>
                                )
                            )}
                        </ol>
                    </section>
                </article>
                <aside id='side-bar'>
                    <NextPreviousArrows
                        id={Number(params.id)}
                        isLast={isLast}
                        top={true}
                    />
                    <section id='contributor'>
                        <h2>Recipe by {recipe.contributor_name}</h2>
                        {recipe.contributor_bio}
                    </section>
                    <section id='tags'>
                        <h2>Tags</h2>
                        {recipe.recipe_tags &&
                            recipe.recipe_tags.map(
                                (tag: string, index: number) => (
                                    <RecipeTag key={index} tag={tag} />
                                )
                            )}
                    </section>
                    <NextPreviousArrows
                        id={Number(params.id)}
                        isLast={isLast}
                        top={false}
                    />
                </aside>
            </main>
        );
    else return <LoadingAnimation />;
}
