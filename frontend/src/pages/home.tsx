import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <main>
                <h1>Welcome!</h1>
                <p>
                    I am samridh (
                    <NavLink end to='/user/@the5thaxiom'>
                        @the5thaxiom
                    </NavLink>
                    ) and I created this site to show my own recipes and
                    hopefully to see your favourite recipes.
                </p>
                <p>
                    The website is still in development. So any user
                    accounts/recipes you save might get deleted. Check out the
                    site in a while to see if it is live (you'll know)
                </p>
            </main>
        </>
    );
}

