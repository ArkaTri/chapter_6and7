import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Login from '../pages/Login';
import Register from '../pages/Register'


const Routing = () => {
    return (
        <Routes>
            <Route
                path='/:category/search/:keyword'
                component = {Catalog}
            />
            <Route
                path='/:category/:id'
                component = {Detail}
            />
            <Route
                path='/:category'
                component = {Catalog}
            />
            <Route
                path='/'
                exact
                component = {Home}
            />
            <Route
                path='/:login'
                component = {Login}
            />
            <Route
                path='/:register'
                component = {Register}
            />
        </Routes>
    );
}

export default Routing;