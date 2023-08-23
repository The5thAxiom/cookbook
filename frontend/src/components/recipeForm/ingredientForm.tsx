import React, { useEffect, useState } from 'react';

import { MdDelete } from 'react-icons/md';

export default function IngredientForm({
    ingredients,
    setIngredients,
    tempIngredient,
    setTempIngredient
}: {
    ingredients: recipeIngredient[];
    setIngredients: React.Dispatch<React.SetStateAction<recipeIngredient[]>>;
    tempIngredient: recipeIngredient;
    setTempIngredient: React.Dispatch<React.SetStateAction<recipeIngredient>>;
}) {
    const [existingIngredients, setExistingIngredients] = useState<
        ingredient[]
    >([]);

    useEffect(() => {
        fetch('/api/ingredients/all')
            .then(res => (res.ok ? res.json() : null))
            .then(data => setExistingIngredients(data.ingredients));
    }, []);

    const checkIfExists = (i: ingredient): recipeIngredient => {
        const existing = existingIngredients.filter(
            e =>
                e.english_name === i.english_name ||
                e.hindi_name_devnagari === i.hindi_name_devnagari ||
                e.hindi_name_latin === i.hindi_name_latin
        )[0];
        if (existing) return { ...tempIngredient, ...existing };
        else return { ...tempIngredient, ...i };
    };

    const tempIngredientIsValid = () =>
        !!tempIngredient.english_name &&
        !!tempIngredient.hindi_name_devnagari &&
        !!tempIngredient.hindi_name_latin &&
        tempIngredient.quantity > 0 &&
        !!tempIngredient.unit;

    const addNewIngredient = () => {
        if (!tempIngredientIsValid()) return;
        // setIgredientsModalOpen(false);

        setIngredients([...ingredients, tempIngredient]);

        setTempIngredient({
            english_name: '',
            hindi_name_devnagari: '',
            hindi_name_latin: '',
            quantity: 0,
            unit: ''
        });
        (
            document.getElementById(
                'new-ingredient-dialog'
            ) as HTMLDialogElement
        ).close();
    };

    return (
        <fieldset id='ingredients' className='cb-form'>
            <legend>Ingredients</legend>
            <div className='cb-form-field'>
                {ingredients.length > 0 && (
                    <ol>
                        {ingredients.map((ing, index) => (
                            <li key={index}>
                                {ing.quantity} {ing.unit} of {ing.english_name}{' '}
                                ({ing.hindi_name_latin} |{' '}
                                {ing.hindi_name_devnagari}){' '}
                                {/* <button
                                    onClick={e => {
                                        e.preventDefault();
                                    }}
                                    className='inline-button'
                                >
                                    <MdEdit className='util-icon' />
                                </button> */}
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        setIngredients(
                                            ingredients.filter(
                                                (s, i) => i !== index
                                            )
                                        );
                                    }}
                                    className='inline-button'
                                >
                                    <MdDelete className='util-icon' />
                                </button>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
            <div className='cb-form-end'>
                <dialog open={false} id='new-ingredient-dialog'>
                    <fieldset className='cb-form'>
                        <legend>Ingredient</legend>
                        <div className='cb-form-field'>
                            <label>Ingredient (english name)</label>
                            <input
                                onChange={e => {
                                    setTempIngredient(
                                        checkIfExists({
                                            ...tempIngredient,
                                            english_name: e.target.value
                                                ? e.target.value
                                                : ''
                                        })
                                    );
                                }}
                                value={tempIngredient.english_name}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addNewIngredient();
                                    }
                                }}
                                list='existing-eng'
                            />
                            <datalist id='existing-eng'>
                                {existingIngredients &&
                                    existingIngredients
                                        .filter(
                                            ing =>
                                                !ingredients
                                                    .map(i => i.english_name)
                                                    .includes(ing.english_name)
                                        )
                                        .map((ing, i) => (
                                            <option
                                                key={i}
                                                value={ing.english_name}
                                            />
                                        ))}
                            </datalist>
                        </div>
                        <div className='cb-form-field'>
                            <label>Ingredient (hindi name in latin)</label>
                            <input
                                onChange={e => {
                                    setTempIngredient(
                                        checkIfExists({
                                            ...tempIngredient,
                                            hindi_name_latin: e.target.value
                                                ? e.target.value
                                                : ''
                                        })
                                    );
                                }}
                                value={tempIngredient.hindi_name_latin}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addNewIngredient();
                                    }
                                }}
                                list='existing-hin-lat'
                            />
                            <datalist id='existing-hin-lat'>
                                {existingIngredients &&
                                    existingIngredients
                                        .filter(
                                            ing =>
                                                !ingredients
                                                    .map(
                                                        i => i.hindi_name_latin
                                                    )
                                                    .includes(
                                                        ing.hindi_name_latin
                                                    )
                                        )
                                        .map((ing, i) => (
                                            <option
                                                key={i}
                                                value={ing.hindi_name_latin}
                                            />
                                        ))}
                            </datalist>
                        </div>
                        <div className='cb-form-field'>
                            <label>Ingredient (hindi name in devnagari)</label>
                            <input
                                onChange={e => {
                                    setTempIngredient(
                                        checkIfExists({
                                            ...tempIngredient,
                                            hindi_name_devnagari: e.target.value
                                                ? e.target.value
                                                : ''
                                        })
                                    );
                                }}
                                value={tempIngredient.hindi_name_devnagari}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addNewIngredient();
                                    }
                                }}
                                list='existing-hin-dev'
                            />
                            <datalist id='existing-hin-dev'>
                                {existingIngredients &&
                                    existingIngredients
                                        .filter(
                                            ing =>
                                                !ingredients
                                                    .map(
                                                        i =>
                                                            i.hindi_name_devnagari
                                                    )
                                                    .includes(
                                                        ing.hindi_name_devnagari
                                                    )
                                        )
                                        .map((ing, i) => (
                                            <option
                                                key={i}
                                                value={ing.hindi_name_devnagari}
                                            />
                                        ))}
                            </datalist>
                        </div>
                    </fieldset>
                    <fieldset className='cb-forms'>
                        <legend>Quantity</legend>
                        <div className='cb-form-field'>
                            <label>Quantity</label>
                            <input
                                type='number'
                                onChange={e => {
                                    setTempIngredient({
                                        ...tempIngredient,
                                        quantity: e.target.value
                                            ? parseInt(e.target.value)
                                            : 0
                                    });
                                }}
                                value={
                                    tempIngredient.quantity === 0
                                        ? ''
                                        : tempIngredient.quantity
                                }
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addNewIngredient();
                                    }
                                }}
                            />
                        </div>
                        <div className='cb-form-field'>
                            <label>Unit</label>
                            <input
                                onChange={e => {
                                    setTempIngredient({
                                        ...tempIngredient,
                                        unit: e.target.value
                                            ? e.target.value
                                            : ''
                                    });
                                }}
                                value={tempIngredient.unit}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addNewIngredient();
                                    }
                                }}
                            />
                        </div>
                    </fieldset>
                    <div className='cb-form-end'>
                        {tempIngredientIsValid() && (
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    addNewIngredient();
                                }}
                            >
                                Add ingredient
                            </button>
                        )}
                        <button
                            onClick={e => {
                                e.preventDefault();
                                (
                                    document.getElementById(
                                        'new-ingredient-dialog'
                                    ) as HTMLDialogElement
                                ).close();
                                setTempIngredient({
                                    english_name: '',
                                    hindi_name_devnagari: '',
                                    hindi_name_latin: '',
                                    quantity: 0,
                                    unit: ''
                                });
                            }}
                        >
                            Close
                        </button>
                    </div>
                </dialog>
                <button
                    onClick={e => {
                        e.preventDefault();
                        (
                            document.getElementById(
                                'new-ingredient-dialog'
                            ) as HTMLDialogElement
                        ).showModal();
                    }}
                >
                    Add ingredient
                </button>
            </div>
        </fieldset>
    );
}

