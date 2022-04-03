import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';

import About from './pages/about';
import BrowseRecipes from './pages/browseRecipes';
import BrowseSkills from './pages/browseSkills';
import CheckRecipe from './pages/checkRecipe';
import CheckSkill from './pages/checkSkill';
import Home from './pages/home';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// strict mode will run [some](https://stackoverflow.com/questions/60305074/react-strictmode-setstate-function-in-useeffect-is-run-multiple-times-when-effe) stuff
// twice!, for debugging (checking the idempotency of some stuff, idk)
// that is why the recipes are fetched twice
root.render(
//   <React.StrictMode>
        <HashRouter basename = "">
            <Routes>
            <Route path = "/" element = {<App/>}>
                <Route index element = {<Home/>} />
                <Route path = "recipes" >
                    <Route path = "browse" element = {<BrowseRecipes/>} />
                    <Route path = ":id" element = {<CheckRecipe/>} />
                </Route>
                <Route path = "skills" element = {<Outlet/>} >
                    <Route path = "browse" element = {<BrowseSkills/>} />
                    <Route path = ":id" element = {<CheckSkill/>} />
                </Route>
                <Route path = "what-can-i-make" element = {<div>what can i make?</div>} />
                <Route path = "about" element = {<About/>} />
            </Route>
            </Routes>
        </HashRouter>
//   </React.StrictMode>
);
