import React from 'react';

import { recipeMeta } from '../../../values/types';

export default function BasicForm({
    recipe,
    setRecipe
}: {
    recipe: recipeMeta;
    setRecipe: React.Dispatch<React.SetStateAction<recipeMeta>>;
}) {
    return (
        <fieldset id='basic-information' className='cb-form'>
            <legend>Basic Information</legend>
            <div className='cb-form-field'>
                <label htmlFor='name'>Recipe name</label>
                <input
                    type='text'
                    name='name'
                    required
                    onChange={e => {
                        setRecipe({
                            ...recipe,
                            name: e.target.value ? e.target.value : ''
                        });
                    }}
                    value={recipe.name}
                />
            </div>
            <div className='cb-form-field'>
                <label htmlFor='prep_time'>Preparation time (in minutes)</label>
                <input
                    type='number'
                    min='0'
                    name='prep_time'
                    required
                    onChange={e => {
                        setRecipe({
                            ...recipe,
                            prep_time: parseInt(
                                e.target.value ? e.target.value : '0'
                            )
                        });
                    }}
                    value={recipe.prep_time !== 0 ? recipe.prep_time : ''}
                />
            </div>
            <div className='cb-form-field'>
                <label htmlFor='description'>Description</label>
                <textarea
                    name='description'
                    required
                    onChange={e => {
                        setRecipe({
                            ...recipe,
                            description: e.target.value ? e.target.value : ''
                        });
                    }}
                    value={recipe.description}
                />
            </div>
            <div className='cb-form-field checkbox'>
                <input
                    type='checkbox'
                    value='vegetarian'
                    name='vegetarian'
                    onChange={e => {
                        setRecipe({
                            ...recipe,
                            vegetarian: e.target.checked
                        });
                    }}
                    checked={recipe.vegetarian}
                />
                <label htmlFor='vegetarian'>This recipe is vegetarian</label>
            </div>
            <div className='cb-form-field'>
                <label htmlFor='quantity'>Quantity</label>
                <input
                    type='number'
                    name='quantity'
                    min='0'
                    required
                    onChange={e => {
                        e.target.value &&
                            setRecipe({
                                ...recipe,
                                quantity: parseInt(
                                    e.target.value ? e.target.value : '0'
                                )
                            });
                    }}
                    value={recipe.quantity !== 0 ? recipe.quantity : ''}
                />
            </div>
            <div className='cb-form-field'>
                <label htmlFor='unit'>Unit</label>
                <input
                    type='text'
                    name='unit'
                    required
                    onChange={e => {
                        setRecipe({
                            ...recipe,
                            unit: e.target.value ? e.target.value : ''
                        });
                    }}
                    value={recipe.unit}
                />
            </div>
            <div className='cb-form-field'>
                <label htmlFor='difficulty'>
                    How difficult is this recipe (from 1 to 5)
                </label>
                <input
                    type='range'
                    min='1'
                    max='5'
                    step='1'
                    name='difficulty'
                    required
                    onChange={e => {
                        setRecipe({
                            ...recipe,
                            difficulty: parseInt(
                                e.target.value ? e.target.value : '1'
                            )
                        });
                    }}
                    value={
                        recipe.difficulty > 1 && recipe.difficulty < 5
                            ? recipe.difficulty
                            : 3
                    }
                />
            </div>
            <div className='cb-form-end'></div>
        </fieldset>
    );
}
