import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CloseIcon from '../../components/icons/closeIcon';
import LoadingAnimation from '../../components/loadingAnimation/loadingAnimation';
import RecipeCarousel from '../../components/recipes/recipeCarousel/recipeCarousel';
import useCollections from '../../hooks/useCollections';

import './profile.css';

export default function Profile({ user }: { user: userData }) {
    const { collections, addNewCollection, removeCollection } =
        useCollections();

    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);

    const [newCollection, setNewCollection] = useState<string>(null as any);

    useEffect(() => {
        setRecipes(null as any);
        const fetchRecipes = async () => {
            const res = await fetch(`/api/users/${user.username}/recipes`);
            const data = await res.json();
            setRecipes(data.recipes);
        };
        fetchRecipes();
    }, [user.username]);

    return (
        <main>
            <h1>@{user.username}</h1>
            <section id='info' className='util-centered'>
                <h2>Your Info</h2>
                <b>{user.name}</b>
                <p>{user.bio}</p>
            </section>
            <section id='recipes'>
                <h2>Your Recipes</h2>
                <div className='profile-action-buttons'>
                    <NavLink end to='/recipes/new'>
                        Add new recipe
                    </NavLink>
                    <NavLink end to={`/recipes?only-user=${user.username}`}>
                        All recipes
                    </NavLink>
                </div>
                <RecipeCarousel recipes={recipes} reversed />
            </section>
            <section>
                <h2>Your Favourites</h2>
                {collections && (
                    <RecipeCarousel
                        recipes={
                            collections.filter(c => c.name === 'favourites')[0]
                                .recipes
                        }
                    />
                )}
            </section>
            <section>
                <h2>Your Collections</h2>
                <div className='profile-action-buttons'>
                    <div
                        onClick={() =>
                            (
                                document.getElementById(
                                    'profile-new-collection-dialog'
                                ) as HTMLDialogElement
                            ).showModal()
                        }
                    >
                        Add new collection
                    </div>
                </div>
                <dialog open={false} id='profile-new-collection-dialog'>
                    <div className='cb-form'>
                        <div className='cb-form-field'>
                            Collection Name{' '}
                            <input
                                type='text'
                                value={newCollection ? newCollection : ''}
                                onChange={e => setNewCollection(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        addNewCollection(newCollection);
                                        (
                                            document.getElementById(
                                                'profile-new-collection-dialog'
                                            ) as HTMLDialogElement
                                        ).close();
                                        setNewCollection(null as any);
                                    }
                                }}
                            ></input>
                        </div>
                        <div className='cb-form-end'>
                            {newCollection && (
                                <button
                                    onClick={() => {
                                        addNewCollection(newCollection);
                                        setNewCollection(null as any);
                                        (
                                            document.getElementById(
                                                'profile-new-collection-dialog'
                                            ) as HTMLDialogElement
                                        ).close();
                                    }}
                                >
                                    Add collection
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setNewCollection(null as any);
                                    (
                                        document.getElementById(
                                            'profile-new-collection-dialog'
                                        ) as HTMLDialogElement
                                    ).close();
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
                {collections ? (
                    collections
                        .filter(c => c.name !== 'favourites')
                        .map((c, i) => (
                            <div className='collection' key={i}>
                                <h3>
                                    {c.name}{' '}
                                    <span
                                        className='util-icon util-clickable'
                                        onClick={() => removeCollection(c.name)}
                                    >
                                        <CloseIcon />
                                    </span>
                                </h3>
                                <RecipeCarousel recipes={c.recipes} />
                            </div>
                        ))
                ) : (
                    <LoadingAnimation />
                )}
            </section>
        </main>
    );
}

