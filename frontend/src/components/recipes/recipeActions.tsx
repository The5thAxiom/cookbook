import { useEffect, useState } from 'react';

import HeartIcon from '../icons/heartIcon';
import BrokenHeartIcon from '../icons/brokenHeartIcon';
import BookmarkAddIcon from '../icons/bookmarkAddIcon';
import BookmarkIcon from '../icons/bookmarkIcon';
import BookmarkRemoveIcon from '../icons/bookmarkRemoveIcon';

import userStore from '../../stores/userStore';
import collectionsStore from '../../stores/collectionsStore';
import useCollections from '../../hooks/useCollections';

export default function RecipeActions({ recipe }: { recipe: recipeMeta }) {
    const collections = collectionsStore(state => state.collections);
    const { addToCollection, removeFromCollection, addNewCollection } =
        useCollections();
    const user = userStore(state => state.user);

    const [selectedCollection, setSelectedCollection] = useState<string>(
        null as any
    );
    const [newCollection, setNewCollection] = useState<string>(null as any);

    const addRecipeToNewCollection = async (collection_name: string) => {
        await addNewCollection(collection_name);
        await addToCollection(collection_name, recipe);
    };

    const [collectionsWithCurrentRecipe, setCollectionsWithCurrentRecipe] =
        useState<collection[]>([]);
    const [
        collectionsWithoutCurrentRecipe,
        setCollectionsWithoutCurrentRecipe
    ] = useState<collection[]>([]);

    useEffect(() => {
        setCollectionsWithCurrentRecipe(
            collections
                .filter(c => c.name !== 'favourites')
                .filter(
                    c => c.recipes.filter(r => r.id === recipe.id).length > 0
                )
        );
        setCollectionsWithoutCurrentRecipe(
            collections
                .filter(c => c.name !== 'favourites')
                .filter(
                    c => c.recipes.filter(r => r.id === recipe.id).length === 0
                )
        );
    }, [collections]);

    if (user && collections) {
        return (
            <div className='util-row-flexend'>
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
                            <BookmarkRemoveIcon />
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
                            <BookmarkAddIcon />
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
                    <BookmarkIcon />
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
                        <BrokenHeartIcon />
                    </div>
                ) : (
                    <div
                        className='util-clickable'
                        onClick={() => addToCollection('favourites', recipe)}
                    >
                        <HeartIcon />
                    </div>
                )}
            </div>
        );
    } else return <></>;
}

