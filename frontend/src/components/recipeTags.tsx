import React from 'react';
import './recipeTags.css';

export default function RecipeTags({ tags }: { tags: string[] }) {
    return (
        <div className='recipe-tags'>
            {tags.map((tag: string, index: number) => (
                <div key={index} className='recipe-tag'>
                    {tag}
                </div>
            ))}
            {/* the 'tag' will be a nav link to a sort-page with the tag filter on (get query probably) */}
        </div>
    );
}

