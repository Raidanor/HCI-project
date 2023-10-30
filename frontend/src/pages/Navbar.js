import React from 'react';
import icon from "../assets/2B_icon.png";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

function LoggedIn() {
    const handleLogout = () => {
        Cookies.remove('jwt'); 
        window.location.href = '/'; 
    };

    return (
        <>
            <button type="button" className="btn btn-link px-3 me-2" onClick={handleLogout}>
                Log Out
            </button>
        </>
    );
}

function LoggedOut() {
    return (
        <>
            <button type="button" className="btn btn-link px-3 me-2">
                <Link to="/login">Login</Link>
            </button>
            <button type="button" className="btn btn-primary me-3">
                <Link className="text-white" to="/register">Sign up</Link>
            </button>
        </>
    );
}

function Navbar() {
    const isLoggedIn = !!Cookies.get('jwt'); 

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand me-2" href="https://mdbgo.com/">
                    <img src={icon} alt="icon" style={{width:"40px"}}/>
                    HCI
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarButtonsExample"
                    aria-controls="navbarButtonsExample"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* Rest of your navbar items */}
                </ul>

                <div className="d-flex align-items-center">
                    {isLoggedIn ? <LoggedIn /> : <LoggedOut />}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
