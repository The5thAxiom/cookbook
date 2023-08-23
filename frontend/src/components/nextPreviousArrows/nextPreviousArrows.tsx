import { NavLink } from 'react-router-dom';

import './nextPreviousArrows.css';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

export default function NextPreviousArrows({
    nextRecipe,
    prevRecipe
}: {
    nextRecipe: recipeMeta;
    prevRecipe: recipeMeta;
}) {
    return (
        <nav className='next-previous-arrows'>
            {prevRecipe && (
                <NavLink
                    className='arrow left-arrow'
                    to={`/recipes/${prevRecipe.id}`}
                >
                    <MdArrowBack className='arrow-icon' />
                    <div className='arrow-page-name arrow-prev-page-name'>
                        Prev
                        <br />
                        {prevRecipe.name}
                    </div>
                </NavLink>
            )}
            {/* <NavLink end to='/recipes/browse'>back</NavLink> */}
            {nextRecipe && (
                <NavLink
                    className='arrow right-arrow'
                    to={`/recipes/${nextRecipe.id}`}
                >
                    <div className='arrow-page-name arrow-next-page-name'>
                        Next
                        <br />
                        {nextRecipe.name}
                    </div>
                    <MdArrowForward className='arrow-icon' />
                </NavLink>
            )}
        </nav>
    );
}

