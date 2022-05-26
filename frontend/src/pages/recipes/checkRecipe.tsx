import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import LoadingAnimation from '../../components/loadingAnimation';
import NextPreviousArrows from '../../components/nextPreviousArrows';
import RecipeTags from '../../components/recipeTags';
import { recipeFull, recipeIngredient } from '../../values/types';
import './../pages.css';

export default function CheckRecipe() {
    const [recipe, setRecipe] = useState<recipeFull>(null as any);
    const [isLast, setIsLast] = useState<boolean>(false);
    const params = useParams();

    useEffect(() => {
        setRecipe(null as any);
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
                    <h1 id='recipe-name'>{recipe.name}</h1>
                    <div id='recipe-byline'>
                        by{' '}
                        <NavLink to={`/user/@${recipe.contributor_username}`}>
                            @{recipe.contributor_username}
                        </NavLink>
                    </div>
                    <NextPreviousArrows
                        id={Number(params.id)}
                        isLast={isLast}
                        top={true}
                    />
                    <section id='about'>
                        <br />
                        <b>{recipe.vegetarian ? 'veg' : 'non-veg'}</b> {' | '}
                        <b>{`takes ${recipe.prep_time} minutes`}</b> {' | '}
                        <b>{`makes ${recipe.quantity} ${recipe.unit}`}</b>{' '}
                        {' | '}
                        <b>{`difficulty: ${'★'.repeat(recipe.difficulty)}`}</b>
                        <br />
                        <br />
                        {recipe.recipe_tags && (
                            <RecipeTags tags={recipe.recipe_tags} />
                        )}
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
                    <NextPreviousArrows
                        id={Number(params.id)}
                        isLast={isLast}
                        top={false}
                    />
                </article>
            </main>
        );
    else return <LoadingAnimation />;
}

