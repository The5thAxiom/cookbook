import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../layout/header';

export default function Home() {
    return (
        <>
            <Header />
            <main className='below-header'>
                <h1>Welcome!</h1>
                <p>I am samridh (<NavLink end to='/user/profile/the5thaxiom'>@the5thaxiom</NavLink>) and I created this site to show my own recipes and hopefully to see your favourite recipes.</p>
                <p>The website is still in development. So any user accounts/recipes you save might get deleted. Check out the site in a while to see if it is live (you'll know)</p>
            </main>
        </>
    );
}
