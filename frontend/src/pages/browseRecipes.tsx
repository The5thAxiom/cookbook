import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingAnimation from '../components/loadingAnimation';
import { recipeMeta } from '../values/types';

export default function BrowseRecipes() {
    const [recipes, setRecipes] = useState<{ recipes: recipeMeta[] }>(
        null as any
    );
    useEffect(() => {
        fetch('/api/recipes/all')
            .then(res => res.json())
            .then(data => setRecipes(data));
    }, []);
    if (recipes)
        return (
            <main>
                {recipes.recipes.map((r: recipeMeta, index: number) => (
                    <section key={index} id={`${r.id}`}>
                        <h3>
                            <NavLink to={`/recipes/${r.id}`}>{r.name}</NavLink>
                        </h3>
                        <b>{r.vegetarian ? 'veg' : 'non-veg'}</b> {' | '}
                        <b>{`takes ${r.prep_time} minutes`}</b> {' | '}
                        <b>{`makes ${r.quantity} ${r.unit}`}</b> {' | '}
                        <b>{`difficulty: ${'⭐'.repeat(r.difficulty)}`}</b>
                        <br />
                        <br />
                        <em>{r.description}</em>
                        {index !== recipes.recipes.length - 1 && <hr />}
                    </section>
                ))}
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi interdum, nisl vitae porta ultrices, elit purus
                    pharetra erat, et cursus velit sapien ut augue. Phasellus
                    elit magna, viverra quis justo eget, ultrices aliquet
                    libero. Integer sollicitudin convallis tempus. Phasellus
                    tincidunt nunc massa, vitae luctus justo aliquet vitae.
                    Vestibulum ac scelerisque nibh, sed iaculis lorem. Aenean et
                    lobortis dolor. Duis ac pretium lacus. Morbi molestie
                    molestie lectus, vel aliquet dui dignissim sed. Sed dolor
                    elit, semper eu ultrices lacinia, consectetur in justo.
                    Phasellus pellentesque vestibulum nisl, vel ultricies nisl
                    porta ac. Pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas. Curabitur
                    sollicitudin ante quis convallis cursus. Pellentesque vitae
                    placerat mauris.
                </p>
            </main>
        );
    else
        return (
            <main>
                <LoadingAnimation />
            </main>
        );
}
