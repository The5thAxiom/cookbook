import React from 'react';
import { tagData } from '../values/types';

export default function RecipeTag(props: tagData) {
    return (
        <div className='recipe-tag'>
            {/* the 'tag' will be a nav link to a sort-page with the tag filter on (get query probably) */}
            {props.tag}
        </div>
    );
}
