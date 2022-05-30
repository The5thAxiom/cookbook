import React from 'react';

export default function NewRecipe() {
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
                    <div className='cb-form-field'></div>
                    <div className='cb-form-end'>
                        <button>Add ingredient</button>
                    </div>
                </fieldset>
                <fieldset className='cb-form'>
                    <legend>Steps</legend>
                    <div className='cb-form-field'></div>
                    <div className='cb-form-end'>
                        <button>Add step</button>
                    </div>
                </fieldset>
                <fieldset className='cb-form'>
                    <legend>Tags</legend>
                    <div className='cb-form-field'></div>
                    <div className='cb-form-end'>
                        <button>Add tag</button>
                    </div>
                </fieldset>
                <div className='cb-form-end'>
                    <button className='cb-form-button'>Submit Recipe</button>
                </div>
            </form>
        </main>
    );
}

