import { useState } from 'react';

import useCollections from '../../hooks/useCollections';
import useFetch from '../../hooks/useFetch';
import useMainAction from '../../hooks/useMainAction';
import { NavLink } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import {
    MdBookmark,
    MdBookmarkAdd,
    MdBookmarkRemove,
    MdDelete,
    MdEdit,
    MdFavorite,
    MdHeartBroken
} from 'react-icons/md';

export default function RecipeActions({ recipe }: { recipe: recipeMeta }) {
    const {
        collections,
        addToCollection,
        removeFromCollection,
        addNewCollection
    } = useCollections();
    const { user } = useCurrentUser();

    const [selectedCollection, setSelectedCollection] = useState<string>(
        null as any
    );
    const [newCollection, setNewCollection] = useState<string>(null as any);

    const addRecipeToNewCollection = async (collection_name: string) => {
        await addNewCollection(collection_name);
        await addToCollection(collection_name, recipe);
    };

    const { fetchAsUser } = useFetch();
    const { startMainAction, endMainAction } = useMainAction();

    const deleteRecipe = async () => {
        if (window.confirm(`Are you sure you want to delete ${recipe.name}?`)) {
            startMainAction();
            await fetchAsUser(`/api/recipes/${recipe.id}`, {
                method: 'DELETE'
            });
            endMainAction();
        }
    };

    if (user && collections) {
        const collectionsWithCurrentRecipe = collections
            .filter(c => c.name !== 'favourites')
            .filter(c => c.recipes.filter(r => r.id === recipe.id).length > 0);
        const collectionsWithoutCurrentRecipe = collections
            .filter(c => c.name !== 'favourites')
            .filter(
                c => c.recipes.filter(r => r.id === recipe.id).length === 0
            );
        return (
            <div className='util-row-flexend'>
                <div>
                    <NavLink
                        to={`/recipes/edit/${recipe.id}`}
                        className='util-clickable'
                    >
                        <MdEdit className='util-icon' />
                    </NavLink>
                </div>

                <div>
                    <div className='util-clickable' onClick={deleteRecipe}>
                        <MdDelete className='util-icon' />
                    </div>
                </div>

                {collectionsWithCurrentRecipe.length > 0 && (
                    <>
                        <div
                            className='util-clickable'
                            onClick={() =>
                                (
                                    document.getElementById(
                                        `${recipe.id}-recipe-dialog`
                                    ) as HTMLDialogElement
                                ).showModal()
                            }
                        >
                            <MdBookmarkRemove className='util-icon' />
                        </div>
                        <dialog open={false} id={`${recipe.id}-recipe-dialog`}>
                            <div className='cb-form'>
                                <div className='cb-form-field'>
                                    Remove {recipe.name} from collection
                                    <select
                                        defaultValue='--select--'
                                        onChange={e =>
                                            setSelectedCollection(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value=''>--select--</option>
                                        {collectionsWithCurrentRecipe.map(
                                            (c, i) => (
                                                <option key={i} value={c.name}>
                                                    {c.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div className='cb-form-end'>
                                    {selectedCollection && (
                                        <button
                                            onClick={() => {
                                                removeFromCollection(
                                                    selectedCollection,
                                                    recipe
                                                );
                                                setSelectedCollection(
                                                    null as any
                                                );
                                                (
                                                    document.getElementById(
                                                        `${recipe.id}-recipe-dialog`
                                                    ) as HTMLDialogElement
                                                ).close();
                                            }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            (
                                                document.getElementById(
                                                    `${recipe.id}-recipe-dialog`
                                                ) as HTMLDialogElement
                                            ).close()
                                        }
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </>
                )}

                {collectionsWithoutCurrentRecipe.length > 0 && (
                    <>
                        <div
                            className='util-clickable'
                            onClick={() => {
                                (
                                    document.getElementById(
                                        `${recipe.id}-add-dialog`
                                    ) as HTMLDialogElement
                                ).showModal();
                            }}
                        >
                            <MdBookmarkAdd className='util-icon' />
                        </div>
                        <dialog open={false} id={`${recipe.id}-add-dialog`}>
                            <div className='cb-form'>
                                <div className='cb-form-field'>
                                    Add {recipe.name} to collection
                                    <select
                                        defaultValue='--select--'
                                        onChange={e =>
                                            setSelectedCollection(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value=''>--select--</option>
                                        {collectionsWithoutCurrentRecipe.map(
                                            (c, i) => (
                                                <option key={i} value={c.name}>
                                                    {c.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div className='cb-form-end'>
                                    {selectedCollection && (
                                        <button
                                            onClick={() => {
                                                addToCollection(
                                                    selectedCollection,
                                                    recipe
                                                );
                                                setSelectedCollection(
                                                    null as any
                                                );
                                                (
                                                    document.getElementById(
                                                        `${recipe.id}-add-dialog`
                                                    ) as HTMLDialogElement
                                                ).close();
                                            }}
                                        >
                                            Add
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            (
                                                document.getElementById(
                                                    `${recipe.id}-add-dialog`
                                                ) as HTMLDialogElement
                                            ).close()
                                        }
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </>
                )}

                <div
                    className='util-clickable'
                    onClick={() => {
                        setNewCollection(null as any);
                        (
                            document.getElementById(
                                `${recipe.id}-new-collection-dialog`
                            ) as HTMLDialogElement
                        ).showModal();
                    }}
                >
                    <MdBookmark className='util-icon' />
                </div>
                <dialog open={false} id={`${recipe.id}-new-collection-dialog`}>
                    <div className='cb-form'>
                        <div className='cb-form-field'>
                            Add {recipe.name} to new collection{' '}
                            <input
                                type='text'
                                value={newCollection ? newCollection : ''}
                                onChange={e => setNewCollection(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        addRecipeToNewCollection(newCollection);
                                        (
                                            document.getElementById(
                                                `${recipe.id}-new-collection-dialog`
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
                                        addRecipeToNewCollection(newCollection);
                                        setNewCollection(null as any);
                                        (
                                            document.getElementById(
                                                `${recipe.id}-new-collection-dialog`
                                            ) as HTMLDialogElement
                                        ).close();
                                    }}
                                >
                                    Add collection
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    (
                                        document.getElementById(
                                            `${recipe.id}-new-collection-dialog`
                                        ) as HTMLDialogElement
                                    ).close();
                                    setNewCollection(null as any);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>

                {collections
                    .filter(c => c.name === 'favourites')[0]
                    .recipes.filter(r => r.id === recipe.id).length === 1 ? (
                    <div
                        className='util-clickable'
                        onClick={() =>
                            removeFromCollection('favourites', recipe)
                        }
                    >
                        <MdHeartBroken className='util-icon' />
                    </div>
                ) : (
                    <div
                        className='util-clickable'
                        onClick={() => addToCollection('favourites', recipe)}
                    >
                        <MdFavorite className='util-icon' />
                    </div>
                )}
            </div>
        );
    } else return <></>;
}

