import React from "react";
import { Link } from "react-router-dom";
import Crane from "../icons/crane.svg";
import Add from "../icons/add.svg";
import Map from "../icons/map.svg";
import Profile from "../icons/profile.svg";

import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div>
      <ul className="NavBarLinks">
        <li>
          <Link to="/cranes">
            {" "}
            <img src={Crane} className="NavBarIcons" alt="All cranes icon" />
          </Link>
        </li>
        <li>
          <Link to="/add-crane">
            {" "}
            <img src={Add} className="NavBarIcons" alt="Add crane icon" />
          </Link>
        </li>
        <li>
          <Link to="/map">
            {" "}
            <img src={Map} className="NavBarIcons" alt="Map view icon" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            {" "}
            <img src={Profile} className="NavBarIcons" alt="Profile icon" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
