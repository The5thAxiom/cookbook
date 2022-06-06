import React, { useState } from 'react';

import CloseIcon from '../../../components/icons/closeIcon';

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
    const [ingredientsModalOpen, setIgredientsModalOpen] =
        useState<boolean>(false);

    const tempIngredientIsValid = () =>
        !!tempIngredient.english_name &&
        !!tempIngredient.hindi_name_devnagari &&
        !!tempIngredient.hindi_name_latin &&
        tempIngredient.quantity > 0 &&
        !!tempIngredient.unit;

    const addNewIngredient = () => {
        if (!tempIngredientIsValid()) return;
        setIgredientsModalOpen(false);

        setIngredients([...ingredients, tempIngredient]);

        setTempIngredient({
            english_name: '',
            hindi_name_devnagari: '',
            hindi_name_latin: '',
            quantity: 0,
            unit: ''
        });
    };
    return (
        <fieldset id='ingredients' className='cb-form'>
            <legend>Ingredients</legend>
            {/* <div className='cb-form-field'>
                        <label>existing:</label>
                        <select>
                            {existingIngredients && (
                                <>
                                    <option value=''>
                                        See existing ingredients
                                    </option>
                                    {existingIngredients.map((i, index) => (
                                        <option key={index}>
                                            {i.english_name}
                                            {' | '}
                                            {i.hindi_name_latin}
                                            {' | '}
                                            {i.hindi_name_devnagari}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div> */}
            <div className='cb-form-field'>
                {ingredients.length > 0 && (
                    <ol>
                        {ingredients.map((ing, index) => (
                            <li key={index}>
                                {ing.quantity} {ing.unit} of {ing.english_name}{' '}
                                ({ing.hindi_name_latin} |{' '}
                                {ing.hindi_name_devnagari}){' '}
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        setIngredients(
                                            ingredients.filter(
                                                (s, i) => i !== index
                                            )
                                        );
                                    }}
                                >
                                    <CloseIcon
                                        style={{
                                            height: '1em',
                                            width: '1em'
                                        }}
                                    />
                                </button>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
            <div className='cb-form-end'>
                <dialog open={ingredientsModalOpen}>
                    <fieldset className='cb-form'>
                        <legend>Ingredient</legend>
                        <div className='cb-form-field'>
                            <label>Ingredient (english name)</label>
                            <input
                                onChange={e => {
                                    setTempIngredient({
                                        ...tempIngredient,
                                        english_name: e.target.value
                                            ? e.target.value
                                            : ''
                                    });
                                }}
                                value={tempIngredient.english_name}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addNewIngredient();
                                    }
                                }}
                            />
                        </div>
                        <div className='cb-form-field'>
                            <label>Ingredient (hindi name in latin)</label>
                            <input
                                onChange={e => {
                                    setTempIngredient({
                                        ...tempIngredient,
                                        hindi_name_latin: e.target.value
                                            ? e.target.value
                                            : ''
                                    });
                                }}
                                value={tempIngredient.hindi_name_latin}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addNewIngredient();
                                    }
                                }}
                            />
                        </div>
                        <div className='cb-form-field'>
                            <label>Ingredient (hindi name in devnagari)</label>
                            <input
                                onChange={e => {
                                    setTempIngredient({
                                        ...tempIngredient,
                                        hindi_name_devnagari: e.target.value
                                            ? e.target.value
                                            : ''
                                    });
                                }}
                                value={tempIngredient.hindi_name_devnagari}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addNewIngredient();
                                    }
                                }}
                            />
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
                                setIgredientsModalOpen(false);
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
                        setIgredientsModalOpen(true);
                    }}
                >
                    Add ingredient
                </button>
            </div>
        </fieldset>
    );
}
