import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';

import './values/colors.css';
import './App.css';
import './forms.css';
import './utility.css';

import Footer from './components/footer';
import NavBar from './components/navBar';

import Home from './pages/home';

import CheckRecipe from './pages/recipes/checkRecipe';
import NewRecipe from './pages/recipes/newRecipe';
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
    return (
        <HashRouter basename=''>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <NavBar
                                accessToken={accessToken}
                                removeAccessToken={removeAccessToken}
                            />
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
                        <Route path='new' element={<NewRecipe />} />
                    </Route>
                    {/* <Route path='skills' element={<Outlet />}>
                    <Route index element={<BrowseSkills />} />
                    <Route path=':id' element={<CheckSkill />} />
                    <Route path='filter' element={<FilterSkills />} />
                    <Route path='new' element={<NewSkill />} />
                </Route> */}
                    <Route path='user' element={<Outlet />}>
                        {/* if the doesn't exist, /user is the login page, if it does, /user is the profile page */}
                        {accessToken !== '' ? (
                            <Route
                                index
                                element={
                                    <Profile
                                        accessToken={accessToken}
                                        setAccessToken={setAccessToken}
                                        removeAccessToken={removeAccessToken}
                                    />
                                }
                            />
                        ) : (
                            <>
                                <Route
                                    index
                                    element={
                                        <Login
                                            accessToken={accessToken}
                                            setAccessToken={setAccessToken}
                                        />
                                    }
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

