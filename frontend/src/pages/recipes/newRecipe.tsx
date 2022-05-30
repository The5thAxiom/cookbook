import React from 'react';

export default function NewRecipe() {
    return (
        <main>
            <h1>Add New Recipe</h1>
            <form className='cb-form'>
                <div className='cb-form-start'></div>
                <div className='cb-form-field'>
                    <label htmlFor='name'>Recipe name</label>
                    <input type='text' name='name' required />
                </div>
                <div className='cb-form-field'>
                    <label htmlFor='prep_time'>
                        Preparation time (in minutes)
                    </label>
                    <input type='number' name='prep_time' required />
                </div>
                <div className='cb-form-field'>
                    <label htmlFor='description'>Description</label>
                    <textarea name='description' required />
                </div>
                <div className='cb-form-field'>
                    <label htmlFor='vegetarian'>
                        This recipe is vegetarian
                    </label>
                </div>
                <div className='cb-form-field'>
                    <label htmlFor='quantity'>Quantity</label>
                    <input type='text' name='quantity' required />
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
            </form>
        </main>
    );
}

