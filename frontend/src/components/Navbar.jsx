

import { Link, useNavigate } from "react-router-dom";


function Navbar() {
const navigate = useNavigate();
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  navigate("/login");
};


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          AI Complaint System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/Status">
                Status
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

           {/* ✅ SHOW DASHBOARD ONLY AFTER LOGIN */}
  {token && role === "user" && (
    <li className="nav-item">
      <Link className="nav-link" to="/user-dashboard">
        Dashboard
      </Link>
    </li>
  )}

  {token && role === "admin" && (
    <li className="nav-item">
      <Link className="nav-link text-warning fw-bold" to="/admin-dashboard">
        Admin Panel
      </Link>
    </li>
  )}

  {/* ✅ LOGIN BUTTON (only if NOT logged in) */}
  {!token && (
    <li className="nav-item">
      <Link className="btn btn-light ms-2" to="/login">
        Login
      </Link>
    </li>
  )}

  {/* ✅ LOGOUT BUTTON (only if logged in) */}
  {token && (
    <li className="nav-item">
      <button className="btn btn-danger ms-2" onClick={handleLogout}>
        Logout
      </button>
    </li>
  )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
