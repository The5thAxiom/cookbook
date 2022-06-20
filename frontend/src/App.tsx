import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';

import './values/colors.css';
import './styles/App.css';
import './styles/forms.css';
import './styles/utility.css';

import Footer from './components/footer';
import NavBar from './components/navBar';
import MainAction from './components/mainAction';

import Home from './pages/home';

import CheckRecipe from './pages/recipes/checkRecipe';
import NewRecipe from './pages/recipes/newRecipe/newRecipe';
import BrowseRecipes from './pages/recipes/browseRecipes';

import User from './pages/users/user';
import Profile from './pages/users/profile';
import Login from './pages/users/login';
import Signup from './pages/users/signup';

import useCurrentUser from './hooks/useCurrentUser';
import useCollections from './hooks/useCollections';

import userStore from './stores/userStore';
import accessTokenStore from './stores/accessTokenStore';
import collectionStore from './stores/collectionsStore';
import useMainAction from './hooks/useMainAction';

export default function App() {
    const accessToken = accessTokenStore(state => state.accessToken);

    const user = userStore(state => state.user);
    const { logInUser, fetchUser } = useCurrentUser();

    const { fetchCollections } = useCollections();
    const collections = collectionStore(state => state.collections);

    useEffect(() => {
        if (accessToken !== '' && !user) fetchUser();
    }, [accessToken, user, fetchUser]);

    useEffect(() => {
        if (user && !collections) fetchCollections();
    }, [user, fetchCollections, collections]);

    useEffect(() => {
        // console.log('setting up main-action-happening');
        (
            document.getElementById(
                'main-action-happening'
            ) as HTMLDialogElement
        ).addEventListener('cancel', e => e.preventDefault());
        return () => {
            (
                document.getElementById(
                    'main-action-happening'
                ) as HTMLDialogElement
            ).removeEventListener('cancel', e => e.preventDefault());
        };
    }, []);

    return (
        <HashRouter basename=''>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <NavBar />
                            <Outlet />
                            <MainAction />
                            <Footer />
                        </>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path='home' element={<Home />} />
                    <Route path='recipes' element={<Outlet />}>
                        <Route index element={<BrowseRecipes />} />
                        <Route path=':id' element={<CheckRecipe />} />
                        <Route path='filter' element={<BrowseRecipes />} />
                        {user && <Route path='new' element={<NewRecipe />} />}
                    </Route>
                    <Route path='user' element={<Outlet />}>
                        {/* if the doesn't exist, /user is the login page, if it does, /user is the profile page */}
                        {user ? (
                            <Route index element={<Profile user={user} />} />
                        ) : (
                            <>
                                <Route
                                    index
                                    element={<Login logInUser={logInUser} />}
                                />
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

