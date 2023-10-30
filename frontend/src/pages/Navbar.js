
import { Link } from "react-router-dom";

function Navbar()
{
    return(
        <>
            {/* <!-- Navbar --> */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* <!-- Container wrapper --> */}
                <div className="container">
                    {/* <!-- Navbar brand --> */}
                    <a className="navbar-brand me-2" href="https://mdbgo.com/">
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
                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                    {/* <!-- Left links --> */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link" href="#" to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" href="#" to="/">Calendar</Link>
                        </li>
                    </ul>
                    {/* <!-- Left links --> */}

                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-link px-3 me-2">
                            <Link to="/login">Login</Link>
                        </button>
                        <button type="button" className="btn btn-primary me-3">
                            <Link className="text-white" to="/register">Sign up</Link>
                        </button>
                        
                    </div>
                    </div>
                    {/* <!-- Collapsible wrapper --> */}
                </div>
                {/* <!-- Container wrapper --> */}
                </nav>
                {/* <!-- Navbar --> */}
        </>
    )
}

export default Navbar;