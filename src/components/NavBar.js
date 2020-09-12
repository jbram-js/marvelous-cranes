import React from "react";
import { Link } from "react-router-dom";

import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div className="NavBar">
      <ul className="navbar-links">
        <li className="navbar-links-item">
          <Link to="/cranes">All</Link>
        </li>
        <li className="navbar-links-item">
          <Link to="/add-crane">Add</Link>
        </li>
        <li className="navbar-links-item">
          <Link to="/map">Map</Link>
        </li>
        <li className="navbar-links-item">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
