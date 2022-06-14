import React, { useEffect, useState } from 'react';

import useCurrentUser from '../../hooks/useCurrentUser';
import useCollections from '../../hooks/useCollections';

import HeartIcon from '../../components/icons/heartIcon';
import BrokenHeartIcon from '../../components/icons/brokenHeartIcon';
import BookmarkAddIcon from '../../components/icons/bookmarkAddIcon';
import BookmarkRemoveIcon from '../../components/icons/bookmarkRemoveIcon';

export default function RecipeActions({
    recipe,
    collections,
    addToCollection,
    removeFromCollection
}: {
    recipe: recipeMeta;
    collections: collection[];
    addToCollection: (collection_name: string, recipe: recipeMeta) => void;
    removeFromCollection: (collection_name: string, recipe: recipeMeta) => void;
}) {
    const { user, fetchAsUser } = useCurrentUser();

    const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState<boolean>(false);

    const [selectedCollection, setSelectedCollection] = useState<string>(
        null as any
    );

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
                {collections.filter(c => c.name !== 'favourites') && (
                    <>
                        {collectionsWithCurrentRecipe.length > 0 && (
                            <div>
                                <span
                                    className='util-clickable'
                                    onClick={() => setRemoveDialogOpen(true)}
                                >
                                    <BookmarkRemoveIcon />
                                </span>
                                <dialog open={removeDialogOpen}>
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
                                                <option value=''>
                                                    --select--
                                                </option>
                                                {collectionsWithCurrentRecipe.map(
                                                    (c, i) => (
                                                        <option
                                                            key={i}
                                                            value={c.name}
                                                        >
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
                                                        setRemoveDialogOpen(
                                                            false
                                                        );
                                                        removeFromCollection(
                                                            selectedCollection,
                                                            recipe
                                                        );
                                                        setSelectedCollection(
                                                            null as any
                                                        );
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    setRemoveDialogOpen(false)
                                                }
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        )}
                        {collectionsWithoutCurrentRecipe.length > 0 && (
                            <div>
                                <span
                                    className='util-clickable'
                                    onClick={() => setAddDialogOpen(true)}
                                >
                                    <BookmarkAddIcon />
                                </span>
                                <dialog open={addDialogOpen}>
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
                                                <option value=''>
                                                    --select--
                                                </option>
                                                {collectionsWithoutCurrentRecipe.map(
                                                    (c, i) => (
                                                        <option
                                                            key={i}
                                                            value={c.name}
                                                        >
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
                                                        setAddDialogOpen(false);
                                                        addToCollection(
                                                            selectedCollection,
                                                            recipe
                                                        );
                                                        setSelectedCollection(
                                                            null as any
                                                        );
                                                    }}
                                                >
                                                    Add
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    setAddDialogOpen(false)
                                                }
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        )}
                    </>
                )}
                <div>
                    {collections
                        .filter(c => c.name === 'favourites')[0]
                        .recipes.filter(r => r.id === recipe.id).length ===
                    1 ? (
                        <span
                            className='util-clickable'
                            onClick={() =>
                                removeFromCollection('favourites', recipe)
                            }
                        >
                            <BrokenHeartIcon />
                        </span>
                    ) : (
                        <span
                            className='util-clickable'
                            onClick={() =>
                                addToCollection('favourites', recipe)
                            }
                        >
                            <HeartIcon />
                        </span>
                    )}
                </div>
            </div>
        );
    } else return <></>;
}

