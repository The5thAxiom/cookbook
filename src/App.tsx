import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './layout/footer';
import Header from './layout/header';
import NavBar from './layout/navBar';

export default function App() {
    return (
        <>
            <Header />
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}
