import React from "react";

import Logo from "../icons/logo2.svg";

import "../styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <ul className="header-items">
        <li>
          <img src={Logo} className="header-icon" alt="All cranes icon" />{" "}
        </li>
      </ul>
    </div>
  );
};

export default Header;
