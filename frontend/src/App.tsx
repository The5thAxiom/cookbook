import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './layout/footer';
import NavBar from './layout/navBar';

export default function App() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}
