import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';

import './styles/App.css';
import './styles/forms.css';
import './styles/utility.css';

import Footer from './components/footer';
import Navbar from './components/navbar/navbar';
import MainAction from './components/mainAction';
import GoToTopButton from './components/gotToTopButton/goToTopButton';

import Home from './pages/home';

import CheckRecipe from './pages/recipes/checkRecipe';
import NewRecipe from './pages/recipes/newRecipe/newRecipe';
import EditRecipe from './pages/recipes/editRecipe/editRecipe';
import BrowseRecipes from './pages/recipes/browseRecipes';

import User from './pages/users/user';
import Profile from './pages/users/profile/profile';
import Login from './pages/users/login';
import Signup from './pages/users/signup';

import useCurrentUser from './hooks/useCurrentUser';
import useCollections from './hooks/useCollections';

import accessTokenStore from './stores/accessTokenStore';

export default function App() {
    const accessToken = accessTokenStore(state => state.accessToken);

    const { user, fetchUser, logOutUser } = useCurrentUser();

    const { setCollections, fetchCollections } = useCollections();

    useEffect(() => {
        if (accessToken !== '') fetchUser();
        else logOutUser();
    }, [accessToken, fetchUser, logOutUser]);

    useEffect(() => {
        if (user) fetchCollections();
        else setCollections(null as any);
    }, [user, fetchCollections, setCollections]);

    return (
        <HashRouter basename=''>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <Navbar />
                            <Outlet />
                            <MainAction />
                            <GoToTopButton />
                            <Footer />
                        </>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path='recipes' element={<Outlet />}>
                        <Route index element={<BrowseRecipes />} />
                        <Route path=':id' element={<CheckRecipe />} />
                        {user && (
                            <>
                                <Route path='new' element={<NewRecipe />} />
                                <Route path='edit' element={<Outlet />}>
                                    <Route
                                        path=':id'
                                        element={<EditRecipe />}
                                    />
                                </Route>
                            </>
                        )}
                    </Route>
                    <Route path='user' element={<Outlet />}>
                        {/* if the doesn't exist, /user is the login page, if it does, /user is the profile page */}
                        {user ? (
                            <Route index element={<Profile user={user} />} />
                        ) : (
                            <>
                                <Route index element={<Login />} />
                                <Route path='new' element={<Signup />} />
                            </>
                        )}
                        <Route path='@:username' element={<User />} />
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    );
}

