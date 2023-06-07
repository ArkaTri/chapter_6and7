import React, { useRef, useEffect, useState, useCallback } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.scss";


import { category } from "../../api/tmdbApi";

import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout } from "../../redux/actions/auth";

// Konfigurasi navigasi header
const headerNav = [
  { 
    display: "Home",
    path: "/",
  },
  {
    display: "Movie List",
    path: "/movie",
  },
];


// Komponen form pencarian film
const MovieSearch = (props) => {
  const navigate = useNavigate();

  // State untuk menyimpan keyword pencarian
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  // Fungsi untuk melakukan navigasi ke halaman hasil pencarian film
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category.movie}/search/${keyword}`);
    }
  }, [keyword, navigate]);

  useEffect(() => {
    // Fungsi untuk mengecek apakah user menekan tombol enter pada form pencarian film
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  // Komponen form pencarian film yang akan dirender pada DOM
  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

// Komponen header
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex((e) => e.path === pathname);

  const { isLoggedIn, token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(getProfile());
    }
  }, [dispatch, isLoggedIn, token]);
  
  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);


  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/">Movie List</Link>
        </div>
        <MovieSearch />
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
        <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to={"/user/dashboard"}>
                  Dashboard ({user?.name})
                </Nav.Link>
                <Nav.Link onClick={() => dispatch(logout(navigate))}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="header__login" as={Link} to={"/login"}>
                  Login
                </Nav.Link>
                <Nav.Link className="header__register" as={Link} to={"/register"}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
      </div>
    </div>
  );
};

export default Header;
