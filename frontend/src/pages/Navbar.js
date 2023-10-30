import icon from "../assets/2B_icon.png";
import { Link } from "react-router-dom";

import {useState} from "react";


function LoggedIn()
{
    return(
        <>
            <button type="button" className="btn btn-link px-3 me-2">
            <Link to="/login">Login</Link>
            </button>
            <button type="button" className="btn btn-primary me-3">
                <Link className="text-white" to="/register">Sign up</Link>
            </button>
        </>
    )
    
}

function LoggedOut()
{
    return(
        <>
            <button type="button" className="btn btn-link px-3 me-2">
            <Link to="/">Log Out</Link>
            </button>
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
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* <!-- Container wrapper --> */}
                <div className="container">
                    {/* <!-- Navbar brand --> */}
                    <a className="navbar-brand me-2" href="https://mdbgo.com/">
                        <img src={icon} alt="icon" style={{width:"40px"}}/>
                        HCI
                    </a>

                    {/* <!-- Toggle button --> */}
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

                    {/* <!-- Collapsible wrapper --> */}
                    {/* <!-- Left links --> */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                        <li className="nav-item">
                        {/* <!-- Example split danger button --> */}
                            <div className="btn-group">
                                <Link to="/Profile"><button type="button" className="btn">Profile</button></Link>
                                <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="sr-only"></span>
                                </button>
                                <div className="dropdown-menu">
                                    <Link to="/Profile"><a className="dropdown-item">Your Profile</a></Link>
                                    <Link to="/Profile/BadgePage"><a className="dropdown-item">Your Badges</a></Link>
                                    <Link to="/Profile/AllBadges"><a className="dropdown-item">All Badges</a></Link>
                                    
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to="/Profile/Calendar"><button type="button" className="btn">Calendar</button></Link>
                        </li>
                    </ul>
                    {/* <!-- Left links --> */}

                    <div className="d-flex align-items-center">
                        {props.toggle ? <LoggedIn /> : <LoggedOut />}

                    </div>

                    <button onClick={toggleChecked}>Toggle</button>

                    {/* <!-- Collapsible wrapper --> */}
                </div>
                {/* <!-- Container wrapper --> */}
                </nav>
                {/* <!-- Navbar --> */}
        </>
    )
}


export default Navbar;