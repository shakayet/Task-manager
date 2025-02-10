import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
