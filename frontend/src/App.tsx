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

import useCurrentUser from './hooks/useCurrentUser';
import useCollections from './hooks/useCollections';
import userStore from './hooks/userStore';

export default function App() {
    const { user, setUser } = userStore();
    const { fetchAsUser, logInUser, logOutUser } = useCurrentUser(setUser);
    const {
        collections,
        addNewCollection,
        removeCollection,
        addToCollection,
        removeFromCollection
    } = useCollections(user, fetchAsUser);

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
                        <Route
                            index
                            element={
                                <BrowseRecipes
                                    collections={collections}
                                    addToCollection={addToCollection}
                                    removeFromCollection={removeFromCollection}
                                />
                            }
                        />
                        <Route
                            path=':id'
                            element={
                                <CheckRecipe
                                    collections={collections}
                                    addToCollection={addToCollection}
                                    removeFromCollection={removeFromCollection}
                                />
                            }
                        />
                        <Route
                            path='filter'
                            element={
                                <BrowseRecipes
                                    collections={collections}
                                    addToCollection={addToCollection}
                                    removeFromCollection={removeFromCollection}
                                />
                            }
                        />
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
                                        collections={collections}
                                        addToCollection={addToCollection}
                                        removeFromCollection={
                                            removeFromCollection
                                        }
                                        removeCollection={removeCollection}
                                        addNewCollection={addNewCollection}
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

