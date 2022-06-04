import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ingredient } from '../../values/types';
import Modal from '../../components/modal';

export default function NewRecipe() {
    // const [existingIngredients, setExistingIngredients] = useState<
    //     ingredient[]
    // >(null as any);

    // useEffect(() => {
    //     fetch('/api/ingredients/all')
    //         .then(res => (res.ok ? res.json() : null))
    //         .then(data => setExistingIngredients(data.ingredients));
    // }, []);

    const [ingredientsModalOpen, setIgredientsModalOpen] =
        useState<boolean>(false);

    // const [ingredients, setIngredients] = useState<ingredient[]>([]);
    const [steps, setSteps] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    const [tempStep, setTempStep] = useState<string>('');
    const [tempTag, setTempTag] = useState<string>('');

    const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('submit');
    };

    return (
        <main>
            <h1>Add New Recipe</h1>
            <form className='cb-forms'>
                <fieldset className='cb-form'>
                    <legend>Basic Information</legend>
                    <div className='cb-form-field'>
                        <label htmlFor='name'>Recipe name</label>
                        <input type='text' name='name' required />
                    </div>
                    <div className='cb-form-field'>
                        <label htmlFor='prep_time'>
                            Preparation time (in minutes)
                        </label>
                        <input
                            type='number'
                            min='0'
                            name='prep_time'
                            required
                        />
                    </div>
                    <div className='cb-form-field'>
                        <label htmlFor='description'>Description</label>
                        <textarea name='description' required />
                    </div>
                    <div className='cb-form-field checkbox'>
                        <input
                            type='checkbox'
                            value='vegetarian'
                            name='vegetarian'
                        />
                        <label htmlFor='vegetarian'>
                            This recipe is vegetarian
                        </label>
                    </div>
                    <div className='cb-form-field'>
                        <label htmlFor='quantity'>Quantity</label>
                        <input
                            type='number'
                            name='quantity'
                            min='0'
                            step='0.25'
                            required
                        />
                    </div>
                    <div className='cb-form-field'>
                        <label htmlFor='unit'>Unit</label>
                        <input type='text' name='unit' required />
                    </div>
                    <div className='cb-form-field'>
                        <label htmlFor='name'>
                            How difficult is this recipe (from 1 to 5)
                        </label>
                        <input
                            type='range'
                            min='1'
                            max='5'
                            step='1'
                            name='name'
                            required
                        />
                    </div>
                    <div className='cb-form-end'></div>
                </fieldset>
                <fieldset className='cb-form'>
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
                    <div className='cb-form-end'>
                        <button
                            onClick={e => {
                                e.preventDefault();
                                setIgredientsModalOpen(true);
                            }}
                        >
                            Add ingredient
                        </button>
                    </div>
                    <Modal
                        open={ingredientsModalOpen}
                        onClose={() => setIgredientsModalOpen(false)}
                    >
                        add ingredient
                    </Modal>
                </fieldset>
                <fieldset className='cb-form'>
                    <legend>Steps</legend>
                    {steps.length > 0 && (
                        <div className='cb-form-field'>
                            <ol>
                                {steps.map((step, index) => (
                                    <li key={index}>
                                        {step}{' '}
                                        <button
                                            onClick={e => {
                                                e.preventDefault();
                                                setSteps(
                                                    steps.filter(
                                                        (s, i) => i !== index
                                                    )
                                                );
                                            }}
                                        >
                                            X
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                    <div className='cb-form-field'>
                        <textarea
                            onChange={e =>
                                setTempStep(
                                    e.target.value ? e.target.value : ''
                                )
                            }
                            value={tempStep}
                        />
                        <button
                            onClick={e => {
                                e.preventDefault();
                                if (tempStep) setSteps([...steps, tempStep]);
                                setTempStep('');
                            }}
                        >
                            add
                        </button>
                    </div>
                </fieldset>
                <fieldset className='cb-form'>
                    <legend>Tags</legend>
                    {tags.length > 0 && (
                        <div className='recipe-tags'>
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className='nrf-tag'
                                    style={{
                                        backgroundColor: 'var(--orange-light)',
                                        padding: '5px',
                                        borderRadius: '10px'
                                    }}
                                >
                                    {tag}{' '}
                                    <span
                                        className='nrf-tag-x'
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            setTags(
                                                tags.filter(
                                                    (t, i) => i !== index
                                                )
                                            )
                                        }
                                    >
                                        X
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className='cb-form-field'>
                        <input
                            onChange={e =>
                                setTempTag(e.target.value ? e.target.value : '')
                            }
                            value={tempTag}
                        />
                        <button
                            onClick={e => {
                                e.preventDefault();
                                if (tempTag) setTags([...tags, tempTag]);
                                setTempTag('');
                            }}
                        >
                            add
                        </button>
                    </div>
                </fieldset>
                <div className='cb-form-end'>
                    <button onClick={submitForm} className='cb-form-button'>
                        Submit Recipe
                    </button>
                </div>
            </form>
        </main>
    );
}

