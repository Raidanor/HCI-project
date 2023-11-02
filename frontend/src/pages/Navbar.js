import { Link } from "react-router-dom";
import {useState} from "react";
import "./pages.css";



function LoggedIn()
{
    return(
        <>
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
            <Link to="/"><button type="button" className="button4">Log Out</button></Link>
        </>
    )
    
}

function Navbar(props)
{
    const toggleChecked = () => props.setToggle(toggle => !toggle);

    return(
        <>
           <div className="d-flex align-items-center">
            {props.toggle ? <LoggedIn /> : <LoggedOut />}
              </div>
        </>
    )
}


export default Navbar;
