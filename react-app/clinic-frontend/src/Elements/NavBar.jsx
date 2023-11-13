import React from "react";
import "../Elements/NavBar.css"; // Link to the CSS file for styles
import logopng from '../Images/logooo.png';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logopng} alt="Logo" />
        </div>
        <div className="navbar-links">
          <a href="#home" className="navbar-link">
            Home
          </a>
          <a href="#notifications" className="navbar-link">
            Notifications
          </a>
        </div>
        <div className="navbar-right">
          <a href="#settings" className="navbar-link">
            Settings
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
