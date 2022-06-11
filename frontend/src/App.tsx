import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';

import './values/colors.css';
import './App.css';
import './forms.css';
import './utility.css';

import Footer from './components/footer';
import NavBar from './components/navBar';

import Home from './pages/home';

import CheckRecipe from './pages/recipes/checkRecipe';
import NewRecipe from './pages/recipes/newRecipe/newRecipe';
import BrowseRecipes from './pages/recipes/browseRecipes';

// import BrowseSkills from './pages/browsseSkills';
// import CheckSkill from './pages/checkSkill';
// import NewSkill from './pages/newSkill';

import User from './pages/users/user';
import Profile from './pages/users/profile';
import Login from './pages/users/login';
import Signup from './pages/users/signup';

import useAccessToken from './useAccessToken';

export default function App() {
    const { accessToken, setAccessToken, removeAccessToken } = useAccessToken();
    const [user, setUser] = useState<userData>(null as any);

    const fetchAsUser = (
        input: RequestInfo,
        init?: RequestInit
    ): Promise<Response> => {
        return fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${accessToken}`
            }
        });
    };

    const logInUser = (data: userLoginData) => {
        fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    window.alert('wrong login attempt');
                    throw new Error();
                }
            })
            .then(data => setAccessToken(data.access_token));
    };

    const logOutUser = () => {
        setUser(null as any);
        fetchAsUser('/api/users/logout').then(res => {
            removeAccessToken();
        });
    };

    const fetchUser = () => {
        fetchAsUser('/api/users/profile')
            .then(res => {
                if (res.ok) return res.json();
                else {
                    removeAccessToken();
                    throw new Error();
                }
            })
            .then(data => {
                data.access_token && setAccessToken(data.access_token);
                setUser(data);
            })
            .catch(e => {});
    };

    useEffect(() => {
        if (accessToken !== '') fetchUser();
    }, [accessToken]);

    return (
        <HashRouter basename=''>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <NavBar user={user} logOutUser={logOutUser} />
                            <Outlet />
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
                        {user && (
                            <Route
                                path='new'
                                element={
                                    <NewRecipe fetchAsUser={fetchAsUser} />
                                }
                            />
                        )}
                    </Route>
                    {/* <Route path='skills' element={<Outlet />}>
                    <Route index element={<BrowseSkills />} />
                    <Route path=':id' element={<CheckSkill />} />
                    <Route path='filter' element={<FilterSkills />} />
                    <Route path='new' element={<NewSkill />} />
                </Route> */}
                    <Route path='user' element={<Outlet />}>
                        {/* if the doesn't exist, /user is the login page, if it does, /user is the profile page */}
                        {user ? (
                            <Route
                                index
                                element={
                                    <Profile
                                        user={user}
                                        fetchAsUser={fetchAsUser}
                                    />
                                }
                            />
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

