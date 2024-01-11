import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import {BrowserRouter, useLocation} from "react-router-dom";



const Layout = () => {
    const location = useLocation();

    return (
        <>
            {!location.pathname.startsWith('/api/v1/shared-diaries/' ) && <Header />}
            <App />
            {!location.pathname.startsWith('/api/v1/shared-diaries/') && <Footer />}
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
);