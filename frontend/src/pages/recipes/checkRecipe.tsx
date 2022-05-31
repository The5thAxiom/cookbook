import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import LoadingAnimation from '../../components/loadingAnimation';
import NextPreviousArrows from '../../components/nextPreviousArrows';
import RecipeTags from '../../components/recipes/recipeTags';
import { recipeFull, recipeIngredient, recipeMeta } from '../../values/types';

export default function CheckRecipe() {
    const [recipe, setRecipe] = useState<recipeFull>(null as any);
    const [nextRecipe, setNextRecipe] = useState<recipeMeta>(null as any);
    const [prevRecipe, setPrevRecipe] = useState<recipeMeta>(null as any);
    const [isLast, setIsLast] = useState<boolean>(null as any);
    const params = useParams();

    useEffect(() => {
        setRecipe(null as any);
        setNextRecipe(null as any);
        setPrevRecipe(null as any);
        const currentId = Number(params.id);
        fetch(`/api/recipes/${currentId}/full`)
            .then(r => r.json())
            .then((r: recipeFull) => setRecipe(r));
        fetch('/api/recipes/count')
            .then(res => res.json())
            .then(data => setIsLast(data.count === currentId));
        if (Number(params.id) > 1) {
            fetch(`/api/recipes/${currentId - 1}`)
                .then(res => res.json())
                .then(data => setPrevRecipe(data));
        }
        if (isLast === false) {
            fetch(`/api/recipes/${currentId + 1}`)
                .then(res => res.json())
                .then(data => setNextRecipe(data));
        }
    }, [params.id, isLast]);

    if (recipe)
        return (
            <main>
                <section className='util-centered'>
                    <h1 style={{ marginBottom: '0.5rem' }}>{recipe.name}</h1>
                    <div>
                        by{' '}
                        <NavLink to={`/user/@${recipe.contributor_username}`}>
                            @{recipe.contributor_username}
                        </NavLink>
                    </div>
                </section>
                <section id='about' className='util-centered'>
                    <br />
                    <b>{recipe.vegetarian ? 'veg' : 'non-veg'}</b> {' | '}
                    <b>{`takes ${recipe.prep_time} minutes`}</b> {' | '}
                    <b>{`makes ${recipe.quantity} ${recipe.unit}`}</b> {' | '}
                    <b>{`difficulty: ${'★'.repeat(recipe.difficulty)}`}</b>
                    <br />
                    <br />
                    <em>{recipe.description}</em>
                    <br />
                    <br />
                    {recipe.recipe_tags && (
                        <RecipeTags tags={recipe.recipe_tags} />
                    )}
                </section>
                <hr />
                <section id='ingredients'>
                    <h2>Ingredients</h2>
                    <ol>
                        {recipe.recipe_ingredients.map(
                            (ing: recipeIngredient, index: number) => (
                                <li key={index} className='recipe-ingredient'>
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
                    prevName={prevRecipe}
                    nextName={nextRecipe}
                />
            </main>
        );
    else
        return (
            <main>
                <LoadingAnimation />
            </main>
        );
}

