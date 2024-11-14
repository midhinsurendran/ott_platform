import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import './Navbar.css';
import { Link,NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/home">
          OTT Platform
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/subscribe">
                Plans
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/subscriptionplan">
                Subscribed
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/changepassword">
                Change Password
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/watchlist">
                Watch List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/watchhistory">
                Watch History
              </NavLink>
            </li>
          </ul>
          <button className="btn btn-outline-dark" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
