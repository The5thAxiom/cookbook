import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import NavBar from './components/navBar';

export default function App() {
    return (
        <>
            <Header/>
            <main>
                <NavBar/>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}
