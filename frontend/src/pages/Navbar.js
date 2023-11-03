import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";
import { useCookies } from 'react-cookie';


function Navbar() {
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']) 
  // learned we need to speify the cookie we want to look at!
  
  const logOut = (e) => {
    e.preventDefault();
    removeCookie("jwt");
    nav("/login");
  }

  return (
    <div className="navbar container-fluid">
      <nav id="menu">

        <div className="menu-item">
          <div className="menu-text">
            <Link to="/login">Login</Link>
          </div>
        </div>

        <div className="menu-item">
          <div className="menu-text">
            <Link to="/register">Register</Link>
          </div>
        </div>

        <div className="menu-item">
          <div className="menu-text">
            <Link to="/Profile/Calendar">Calendar</Link>
          </div>
        </div>

        <div className="menu-item">
          <div className="menu-text">
            <div className="dropdown">
              <Link to="/Profile" className="dropbtn">Profile</Link>
              <div className="dropdown-content">
                <Link to="/Profile">Your Profile</Link>
                <Link to="/Profile/BadgePage">Your Badges</Link>
                <Link to="/Profile/AllBadges">All Badges</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-item">
          <div className="menu-text">
          <a href="/logout" onClick={logOut}>Logout</a>
          </div>
        </div>

      </nav>
    </div>
  );
}

export default Navbar;
