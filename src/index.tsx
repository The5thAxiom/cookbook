import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';

import About from './pages/about';
import BrowseRecipes from './pages/browseRecipes';
import BrowseSkilss from './pages/browseSkills';
import CheckRecipe from './pages/checkRecipe';
import CheckSkill from './pages/checkSkill';
import Home from './pages/home';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
        <HashRouter basename = "">
            <Routes>
            <Route path = "/" element = {<App/>}>
                <Route index element = {<Home/>} />
                <Route path = "recipes" >
                    <Route path = "browse" element = {<BrowseRecipes/>} />
                    <Route path = "check" element = {<CheckRecipe/>} />
                </Route>
                <Route path = "skills" element = {<Outlet/>} >
                    <Route path = "browse" element = {<BrowseSkilss/>} />
                    <Route path = "check" element = {<CheckSkill/>} />
                </Route>
                <Route path = "what-can-i-make" element = {<div>what can i make?</div>} />
                <Route path = "about" element = {<About/>} />
            </Route>
            </Routes>
        </HashRouter>
  </React.StrictMode>
);
