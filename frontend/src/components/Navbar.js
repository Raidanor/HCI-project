import logo from "../assets/2B_icon.png";

function Navbar()
{
    return(
        <>
            {/* <!-- Navbar --> */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* <!-- Container wrapper --> */}
                <div className="container">
                    {/* <!-- Navbar brand --> */}
                    <img src={logo} alt="logo" style={{ width: '40px', }} />
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
                        <button className="nav-link">Dashboard</button>
                        </li>
                    </ul>
                    {/* <!-- Left links --> */}

                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-link px-3 me-2">
                        Login
                        </button>
                        <button type="button" className="btn btn-primary me-3">
                        Sign up for free
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