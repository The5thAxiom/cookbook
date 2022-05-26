import React from 'react';
import { NavLink } from 'react-router-dom';
import './recipeTags.css';

export default function RecipeTags({ tags }: { tags: string[] }) {
    return (
        <div className='recipe-tags'>
            {tags.map((tag: string, index: number) => (
                <NavLink
                    key={index}
                    className={'recipe-tag'}
                    end
                    to={`/recipes?only-tag=${tag}`}
                >
                    {tag}
                </NavLink>
            ))}
            {/* the 'tag' will be a nav link to a sort-page with the tag filter on (get query probably) */}
        </div>
    );
}

