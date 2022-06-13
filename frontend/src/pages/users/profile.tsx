import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CloseIcon from '../../components/icons/closeIcon';
import LoadingAnimation from '../../components/loadingAnimation';
import RecipeCarousel from '../../components/recipes/recipeCarousel';

import './profile.css';

export default function Profile({
    user,
    fetchAsUser
}: {
    user: userData;
    fetchAsUser: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}) {
    const [recipes, setRecipes] = useState<recipeMeta[]>(null as any);
    const [collections, setCollections] = useState<collection[]>(null as any);
    const [collectionDialogOpen, setCollectionDialogOpen] =
        useState<boolean>(false);
    const [newCollection, setNewCollection] = useState<string>(null as any);

    useEffect(() => {
        setRecipes(null as any);
        fetch(`/api/users/${user.username}/recipes`)
            .then(res => res.json())
            .then(data => setRecipes(data.recipes));
    }, []);

    const fetchCollections = () =>
        fetchAsUser(`/api/users/${user.username}/collections`)
            .then(res => res.json())
            .then(data => {
                setCollections(
                    data.collections.map((c: any) => {
                        return {
                            name: c.name,
                            recipes: c.recipes
                        };
                    })
                );
            })
            .catch(e => {});

    useEffect(() => {
        setCollections(null as any);
        fetchCollections();
    }, []);

    const addNewCollection = (collection_name: string) => {
        fetchAsUser(`api/users/${user.username}/collections`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collection_name: collection_name })
        }).then(res => {
            if (res.ok) {
                window.alert(`${collection_name} was added`);
                fetchCollections();
            } else window.alert(`try again`);
        });
    };

    const removeCollection = (collection_name: string) => {
        fetchAsUser(`api/users/${user.username}/collections`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collection_name: collection_name })
        }).then(res => {
            if (res.ok) {
                window.alert(`${collection_name} was deleted`);
                fetchCollections();
            } else window.alert(`try again`);
        });
    };

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
                <RecipeCarousel recipes={recipes} carousel columns={2} />
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
                        carousel
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
                                    carousel
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

