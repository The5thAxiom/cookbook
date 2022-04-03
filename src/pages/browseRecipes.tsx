import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { recipeMeta } from '../values/types';

export default function BrowseRecipes() {
    const [recipes, setRecipes] = useState<{recipes: recipeMeta[]}>({recipes: [{} as recipeMeta]});
    useEffect(() => {
        fetch('/api/recipes/all')
            .then(res => res.json())
            .then(data => setRecipes(data));
    }, []);
    return (
        <>
        {recipes.recipes.length > 0 && recipes.recipes.map((r: recipeMeta, index: number) =>
            <section key = {index} id = {`${r.id}`}>
                <NavLink to = {`/recipes/${r.id}`}>
                    <h3>{r.name}</h3>
                </NavLink>
                <b>{r.vegetarian ? "veg" : "non-veg"}</b> {" | "}
                <b>{`takes ${r.prep_time} minutes`}</b> {" | "}
                <b>{`makes ${r.quantity} ${r.unit}`}</b> {" | "}
                <b>{`difficulty: ${'⭐'.repeat(r.difficulty)}`}</b>
                <br/><br/>
                <em>{r.description}</em>
                {index != recipes.recipes.length - 1 && <hr/>}
            </section>
        )}
        </>
    );
}