import React, { useEffect, useState } from 'react';

type recipeMeta = {
    id: number;
    description: string;
    name: string;
    prep_time: number;
    difficulty: number;
    quantity: number;
    unit: string;
    vegetarian: boolean;
}

export default function BrowseRecipes() {
    const [recipes, setRecipes] = useState({recipes: []});
    useEffect(() => {
        fetch('/api/recipes/all')
            .then((res => res.json()))
            .then(data => setRecipes(data));
    }, []);
    return (
        <>
        {recipes && recipes.recipes.map((r: recipeMeta) =>
            <section key = {r.id} id = {`${r.id}`}>
                <h1>{r.name}</h1>
                <b>{r.vegetarian ? "veg" : "non-veg"}</b> {" | "}
                <b>{`takes ${r.prep_time} minutes`}</b> {" | "}
                <b>{`makes ${r.quantity} ${r.unit}`}</b> {" | "}
                <b>{`difficulty: ${r.difficulty}`}</b>
                <br/>
                <em>{r.description}</em>
            </section>
        )}
        </>
    );
}