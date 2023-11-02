import icon from "../assets/2B_icon.png";
import { Link } from "react-router-dom";

import {useState} from "react";

import "./pages.css";



function LoggedIn()
{
    return(
        <>
            {/* <button type="button" className="btn btn-link px-3 me-2">
            <Link to="/login">Login</Link>
            </button> */}
            {/* <button type="button" className="button4"> */}
            
            
            
            {/* <Link to="/login"><button type="button" className="button4">Login</button></Link> */}
            {/* </button> */}
            {/* <button type="button" className="btn btn-primary me-3">
                <Link className="text-white" to="/register">Sign up</Link>
            </button> */}
            {/* <button type="button" className="button4"> */}
                {/* <Link to="/register"><button type="button" className="button4 child">Sign up</button></Link> */}
            {/* </button> */}
            {/* <Link to="/Profile/Calendar"><button type="button" className="button4 child">Calendar</button></Link>

            <Link to="/Profile"><button type="button" className="button4 child">Profile</button></Link>
            <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="sr-only"></span>
            </button>

            <div className="dropdown-menu">
                <Link to="/Profile"><a className="dropdown-item">Your Profile</a></Link>
                <Link to="/Profile/BadgePage"><a className="dropdown-item">Your Badges</a></Link>
                <Link to="/Profile/AllBadges"><a className="dropdown-item">All Badges</a></Link>
            </div>

            </div>    */}

            <div className="center">
            <nav id="menu">
                
                <div className="menu-item">
                    <div className="menu-text">
                    <Link to="/login"><a herf="#">Login</a></Link>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                    <Link to="/register"><a herf="#">Register</a></Link>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                    <Link to="/Profile/Calendar"><a herf="#">Calendar</a></Link>
                    </div>
                </div>

                <div className="menu-item">
                    <div className="menu-text">
                        <div class="dropdown">
                            <Link to="/Profile"><a herf="#" className="dropbtn">Profile</a></Link>
                            <div className="dropdown-content">
                                <Link to="/Profile"><a herf="#">Your Profile</a></Link>
                                <Link to="/Profile/BadgePage"><a herf="#">Your Badges</a></Link>
                                <Link to="/Profile/AllBadges"><a herf="#">All Badges</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
                    {/* <div className="sub-menu"> */}
                    
                    {/* <div className="text">
                        <div className="title">
                        
                            <Link to="/Profile"><a herf="#">Your Profile</a></Link>
                        </div>

                        
                    </div> */}
                    
                {/* </div> */}

                <div className="menu-item">
                    <div className="menu-text">
                    <Link to="/"><a herf="#">Logout</a></Link>
                    </div>
                </div>


        </nav>
        </div>

        </>
    )
    
}

function LoggedOut()
{
    return(
        <>
            {/* <button type="button" className="btn btn-link px-3 me-2">
            <Link to="/">Log Out</Link>
            </button> */}

            <Link to="/"><button type="button" className="button4">Log Out</button></Link>

        </>
    )
    
}

function Navbar(props)
{
    // const [toggle, setToggle] = useState(true);
    const toggleChecked = () => props.setToggle(toggle => !toggle);

    return(
        <>
            {/* <!-- Navbar --> */}
                {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
                {/* <!-- Container wrapper --> */}
                {/* <div className="container"> */}
                    {/* <!-- Navbar brand --> */}
                    {/* <a className="navbar-brand me-2" href="https://mdbgo.com/">
                        <img src={icon} alt="icon" style={{width:"40px"}}/>
                        HCI
                    </a> */}

                    {/* <!-- Toggle button --> */}
                    {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarButtonsExample"
                    aria-controls="navbarButtonsExample"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <i className="fas fa-bars">heelo</i>
                    </button> */}

                    {/* <!-- Collapsible wrapper --> */}
                    {/* <!-- Left links --> */}
                    {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0"> */}
                    {/* <ul className="list2">       */}
                    {/* <ul> */}
                        {/* <li className="nav-item"> */}
                        {/* <li className="list"> */}
                        {/* <li> */}
                        {/* <!-- Example split danger button --> */}
                            {/* <div className="btn-group"> */}
                                {/* <Link to="/Profile"><button type="button" className="btn">Profile</button></Link> */}
                                {/* <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="sr-only"></span>
                                </button> */}

                                
                                {/* <Link to="/Profile"><button type="button" className="button4">Profile</button></Link>
                                <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="sr-only"></span>
                                </button>

                                <div className="dropdown-menu">
                                    <Link to="/Profile"><a className="dropdown-item">Your Profile</a></Link>
                                    <Link to="/Profile/BadgePage"><a className="dropdown-item">Your Badges</a></Link>
                                    <Link to="/Profile/AllBadges"><a className="dropdown-item">All Badges</a></Link>
                            </div> */}
                                {/* </div> */}
                            
                        {/* </li> */}
                        {/* <li className="nav-item"> */}
                            {/* <Link to="/Profile/Calendar"><button type="button" className="button4 child">Calendar</button></Link> */}
                        {/* </li>
                    </ul> */}
                    {/* <!-- Left links --> */}

                    <div className="d-flex align-items-center">
                        {props.toggle ? <LoggedIn /> : <LoggedOut />}

                    </div>

                    {/* <button onClick={toggleChecked} className="button4">Toggle</button> */}

                    {/* <!-- Collapsible wrapper --> */}
                {/* </div> */}
                {/* <!-- Container wrapper --> */}
                {/* </nav> */}
                {/* <!-- Navbar --> */}
        </>
    )
}


export default Navbar;