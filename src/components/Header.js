import React from "react";

import Logo from "../icons/logo2.svg";

import "../styles/Header.css";

const Header = () => {
  return (
    <div className="Header">
      <ul className="HeaderItems">
        <li>
          <img src={Logo} className="HeaderIcon" alt="All cranes icon" />{" "}
        </li>
      </ul>
    </div>
  );
};

export default Header;
