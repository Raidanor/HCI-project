
import { Link } from "react-router-dom";

function Navbar()
{
    return(
        <>
            {/* <!-- Navbar --> */}
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                {/* <!-- Container wrapper --> */}
                <div class="container">
                    {/* <!-- Navbar brand --> */}
                    <a class="navbar-brand me-2" href="https://mdbgo.com/">
                    HCI
                    </a>

                    {/* <!-- Toggle button --> */}
                    <button
                    class="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarButtonsExample"
                    aria-controls="navbarButtonsExample"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <i class="fas fa-bars"></i>
                    </button>

                    {/* <!-- Collapsible wrapper --> */}
                    <div class="collapse navbar-collapse" id="navbarButtonsExample">
                    {/* <!-- Left links --> */}
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <Link class="nav-link" href="#" to="/">Dashboard</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link" href="#" to="/">Calendar</Link>
                        </li>
                    </ul>
                    {/* <!-- Left links --> */}

                    <div class="d-flex align-items-center">
                        <button type="button" class="btn btn-link px-3 me-2">
                            <Link to="/login">Login</Link>
                        </button>
                        <button type="button" class="btn btn-primary me-3">
                            <Link class="text-white" to="/register">Sign up</Link>
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