import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detail from './pages/detail/Detail';
import Login from './pages/Login';
import Register from './pages/Register';
import RedirectIfProtected from './components/protected/RedirectIfProtected';

import store from './redux/store';

const App = () => {
  const Layout = () => {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <>
            <Header />
            <Routes>
              <Route
                path="/register"
                element={
                  <RedirectIfProtected>
                    <Register />
                  </RedirectIfProtected>
                }
              />
              <Route
                path="/login"
                element={
                  <RedirectIfProtected>
                    <Login />
                  </RedirectIfProtected>
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/movie" element={<Catalog />} />
              <Route path="/:category/search/:keyword" element={<Catalog />} />
              <Route path="/:category/:id" element={<Detail />} />
            </Routes>
            <Footer />
          </>
        </Provider>
      </GoogleOAuthProvider>
    );
  };

  return (
    <div>
      <Router>
        <Layout />
      </Router>
    </div>
  );
};

export default App;
