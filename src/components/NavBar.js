import React from "react";
import { Link } from "react-router-dom";
import crane from "../icons/crane.svg";
import add from "../icons/add.svg";
import map from "../icons/map.svg";
import profile from "../icons/profile.svg";
import settings from "../icons/settings.svg";

import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div>
      <ul className="navbar-links">
        <li>
          <Link to="/cranes">
            {" "}
            <img src={crane} className="navbar-icons" alt="All cranes icon" />
          </Link>
        </li>{" "}
        <li>
          <Link to="/profile">
            {" "}
            <img src={profile} className="navbar-icons" alt="Profile icon" />
          </Link>
        </li>
        <li>
          <Link to="/add-crane">
            {" "}
            <img src={add} className="navbar-icons" alt="Add crane icon" />
          </Link>
        </li>
        <li>
          <Link to="/map">
            {" "}
            <img src={map} className="navbar-icons" alt="Map view icon" />
          </Link>
        </li>
        <li>
          <Link to="/settings">
            {" "}
            <img
              src={settings}
              className="navbar-icons"
              alt="All cranes icon"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
