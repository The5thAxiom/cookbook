import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CloseIcon from '../../components/icons/closeIcon';
import LoadingAnimation from '../../components/loadingAnimation';
import RecipeCarousel from '../../components/recipes/recipeCarousel';
import useCollections from '../../hooks/useCollections';

import collectionsStore from '../../stores/collectionsStore';
import './profile.css';

export default function Profile({ user }: { user: userData }) {
    const collections = collectionsStore(state => state.collections);
    const { addNewCollection, removeCollection } = useCollections();

    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);

    const [collectionDialogOpen, setCollectionDialogOpen] =
        useState<boolean>(false);
    const [newCollection, setNewCollection] = useState<string>(null as any);

    useEffect(() => {
        setRecipes(null as any);
        fetch(`/api/users/${user.username}/recipes`)
            .then(res => res.json())
            .then(data => setRecipes(data.recipes));
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
                <RecipeCarousel recipes={recipes} columns={2} />
            </section>
            <section id='skills'>
                {/* <li><NavLink end to='/skills/new'>add skill</NavLink></li>
                <li><NavLink end to='/skills'>see your skills</NavLink></li> */}
            </section>
            <section>
                <h2>Your Favourites</h2>
                {collections && (
                    <RecipeCarousel
                        recipes={
                            collections.filter(c => c.name === 'favourites')[0]
                                .recipes
                        }
                        columns={2}
                    />
                )}
            </section>
            <section>
                <h2>Your Collections</h2>
                <div className='profile-action-buttons'>
                    <div onClick={() => setCollectionDialogOpen(true)}>
                        Add new collection
                    </div>
                </div>
                <dialog open={collectionDialogOpen}>
                    <div className='cb-form'>
                        <div className='cb-form-field'>
                            Collection Name{' '}
                            <input
                                type='text'
                                value={newCollection ? newCollection : ''}
                                onChange={e => setNewCollection(e.target.value)}
                            ></input>
                        </div>
                        <div className='cb-form-end'>
                            {newCollection && (
                                <button
                                    onClick={() => {
                                        addNewCollection(newCollection);
                                        setCollectionDialogOpen(false);
                                        setNewCollection(null as any);
                                    }}
                                >
                                    Add collection
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setCollectionDialogOpen(false);
                                    setNewCollection(null as any);
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
                                <RecipeCarousel
                                    recipes={c.recipes}
                                    columns={2}
                                />
                            </div>
                        ))
                ) : (
                    <LoadingAnimation />
                )}
            </section>
        </main>
    );
}

