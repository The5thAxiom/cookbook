import React from 'react';

export default function NewRecipe() {
    return (
        <main>
            <h1>Add New Recipe</h1>
            <form>
                <label htmlFor="name">Recipe Name</label>
                {" "}
                <input
                    type='text'
                    placeholder='Enter the name of the recipe'
                    name="name"
                    required
                />
            </form>
        </main>
    )
}