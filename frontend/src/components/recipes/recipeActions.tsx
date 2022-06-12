import React, { useEffect, useState } from 'react';

import useCurrentUser from '../../hooks/useCurrentUser';
import HeartIcon from '../../components/icons/heartIcon';
import BrokenHeartIcon from '../../components/icons/brokenHeartIcon';
import BookmarkAddIcon from '../../components/icons/bookmarkAddIcon';
import BookmarkRemoveIcon from '../../components/icons/bookmarkRemoveIcon';

export default function RecipeActions({ recipe }: { recipe: recipeMeta }) {
    const [user, fetchAsUser] = useCurrentUser();

    const [userCollections, setUserCollections] = useState<
        {
            name: string;
            recipes: recipeMeta[];
        }[]
    >();
    const [collectionSelectorOpen, setCollectionSelectorOpen] = useState<
        [boolean, boolean]
    >([false, false]); // first bool for dialog open; second: true => for adding; false => for removing

    const [selectedCollection, setSelectedCollection] = useState<string>(
        null as any
    );

    useEffect(() => {
        if (user && recipe) {
            fetchUserCollections();
        }
    }, [user, recipe]);

    const fetchUserCollections = () =>
        fetchAsUser(`/api/users/${user.username}/collections`)
            .then(res => res.json())
            .then(data => setUserCollections(data.collections));

    const addToCollection = (name: string) => {
        fetchAsUser(`/api/users/${user.username}/collections/${name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        }).then(res => {
            if (res.ok) {
                window.alert(`${recipe.name} was added to ${name}!`);
                fetchUserCollections();
            } else window.alert('try again:(');
        });
    };

    const removeFromCollection = (name: string) => {
        fetchAsUser(`/api/users/${user.username}/collections/${name}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipe.id })
        }).then(res => {
            if (res.ok) {
                window.alert(`${recipe.name} was removed from ${name}!`);
                fetchUserCollections();
            } else window.alert('try again:(');
        });
    };

    if (user && userCollections)
        return (
            <div className='util-row-flexend'>
                {userCollections.filter(c => c.name !== 'favourites') && (
                    <>
                        <div>
                            <span
                                className='util-clickable'
                                onClick={() =>
                                    setCollectionSelectorOpen([true, false])
                                }
                            >
                                <BookmarkRemoveIcon />
                            </span>
                        </div>
                        <div>
                            <span
                                className='util-clickable'
                                onClick={() =>
                                    setCollectionSelectorOpen([true, true])
                                }
                            >
                                <BookmarkAddIcon />
                            </span>
                        </div>
                        <dialog open={collectionSelectorOpen[0]}>
                            <div className='cb-form'>
                                <div className='cb-form-start'>
                                    {collectionSelectorOpen[1]
                                        ? 'Add to collection'
                                        : 'Remove from collection'}
                                </div>
                                <div className='cb-form-field'>
                                    Select the collection you want:
                                    <select
                                        defaultValue='--select--'
                                        onChange={e =>
                                            setSelectedCollection(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value=''>--select--</option>
                                        {userCollections
                                            .filter(
                                                c => c.name !== 'favourites'
                                            )
                                            .map((c, i) => (
                                                <option key={i} value={c.name}>
                                                    {c.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className='cb-form-end'>
                                    {selectedCollection && (
                                        <button
                                            onClick={() => {
                                                setCollectionSelectorOpen([
                                                    false,
                                                    false
                                                ]);
                                                collectionSelectorOpen[1]
                                                    ? addToCollection(
                                                          selectedCollection
                                                      )
                                                    : removeFromCollection(
                                                          selectedCollection
                                                      );
                                            }}
                                        >
                                            {collectionSelectorOpen[1]
                                                ? 'Add'
                                                : 'Remove'}
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            setCollectionSelectorOpen([
                                                false,
                                                false
                                            ])
                                        }
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </>
                )}
                <div>
                    {userCollections
                        .filter(c => c.name === 'favourites')[0]
                        .recipes.filter(r => r.id === recipe.id).length ===
                    1 ? (
                        <span
                            className='util-clickable'
                            onClick={() => removeFromCollection('favourites')}
                        >
                            <BrokenHeartIcon />
                        </span>
                    ) : (
                        <span
                            className='util-clickable'
                            onClick={() => addToCollection('favourites')}
                        >
                            <HeartIcon />
                        </span>
                    )}
                </div>
            </div>
        );
    else return <></>;
}
