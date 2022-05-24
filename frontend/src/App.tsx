import React from 'react';

import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';

import Footer from './layout/footer';
import NavBar from './layout/navBar';
import User from './pages/user';
import BrowseRecipes from './pages/browseRecipes';
import BrowseSkills from './pages/browseSkills';
import CheckRecipe from './pages/checkRecipe';
import CheckSkill from './pages/checkSkill';
import Home from './pages/home';
import NewRecipe from './pages/newRecipe';
import NewSkill from './pages/newSkill';


import './index.css';
import WhatCanIMake from './pages/whatCanIMake';
import Profile from './pages/profile';
import Login from './pages/login';
import Signup from './pages/signup';
import useAccessToken from './useAccessToken';

export default function App() {
    const {accessToken, setAccessToken, removeAccessToken} = useAccessToken();
    return (
        <HashRouter basename=''>
        <Routes>
            <Route path='/' element={<>
                <NavBar accessToken={accessToken} removeAccessToken={removeAccessToken} />
                <Outlet />
                <Footer />
            </>}>
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='recipes' element={<Outlet />}>
                    <Route index element={<BrowseRecipes />} />
                    <Route path=':id' element={<CheckRecipe />} />
                    <Route path='new' element={<NewRecipe/>} />
                </Route>
                <Route path='skills' element={<Outlet />}>
                    <Route index element={<BrowseSkills />} />
                    <Route path=':id' element={<CheckSkill />} />
                    <Route path='new' element={<NewSkill />} />
                </Route>
                <Route path='what-can-i-make' element={<WhatCanIMake />} />
                <Route path='user' element={<Outlet />}>
                    {/* if the doesn't exist, /user is the login page, if it does, /user is the profile page */}
                    {accessToken !== ""
                        ? <Route
                            index
                            element={
                                <Profile
                                    accessToken={accessToken}
                                    setAccessToken={setAccessToken}
                                    removeAccessToken={removeAccessToken}
                                />
                            } 
                        />
                        : <>
                            <Route
                                index
                                element={<Login 
                                    accessToken={accessToken}
                                    setAccessToken={setAccessToken}
                                />}
                            />
                            <Route
                                path='new'
                                element={<Signup />}
                            />
                        </>
                    }
                    <Route path="profile/:username" element={<User />} />
                </Route>
            </Route>
        </Routes>
    </HashRouter>
        
    );
}
