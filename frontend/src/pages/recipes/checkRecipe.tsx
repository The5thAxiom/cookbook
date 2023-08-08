import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import CommentForm from '../../components/comments/commentForm';
import Comments from '../../components/comments/comments';
import LoadingAnimation from '../../components/loadingAnimation/loadingAnimation';
import NextPreviousArrows from '../../components/nextPreviousArrows/nextPreviousArrows';
import RecipeTags from '../../components/recipes/recipeTags/recipeTags';
import RecipeActions from '../../components/recipes/recipeActions';

import useFetch from '../../hooks/useFetch';

export default function CheckRecipe() {
    const [recipe, setRecipe] = useState<recipeFull>(null as any);
    const [nextRecipe, setNextRecipe] = useState<recipeMeta>(null as any);
    const [prevRecipe, setPrevRecipe] = useState<recipeMeta>(null as any);
    const [comments, setComments] = useState<comment[]>([]);
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

    useEffect(() => {
        setNextRecipe(null as any);
        setPrevRecipe(null as any);

        const fetchPrevRecipe = async () => {
            if (recipe.prev_id !== 0) {
                const pr = await fetchJson<recipeMeta>(
                    `/api/recipes/${recipe.prev_id}`
                );
                setPrevRecipe(pr);
            }
        };

        const fetchNextRecipe = async () => {
            if (recipe.next_id !== 0) {
                const nr = await fetchJson<recipeMeta>(
                    `/api/recipes/${recipe.next_id}`
                );
                setNextRecipe(nr);
            }
        };

        const fetchComments = async () => {
            const { comments } = await fetchJson<{ comments: comment[] }>(
                `/api/recipes/${recipe.id}/comments`
            );
            setComments(comments);
        };

        if (recipe) {
            fetchPrevRecipe();
            fetchNextRecipe();
            fetchComments();
        }
    }, [recipe]);

    if (recipe)
        return (
            <main
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <RecipeActions recipe={recipe} />
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
                <section id='comments'>
                    <h2>Comments</h2>
                    <CommentForm recipe={recipe} />
                    <Comments comments={comments} />
                </section>
                <NextPreviousArrows
                    prevRecipe={prevRecipe}
                    nextRecipe={nextRecipe}
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

