import React from "react";
import { Link, Route } from "react-router-dom";
import Logo from "../icons/logo2.svg";
import Settings from "./Settings";

import "../styles/Header.css";

const Header = ({ user }) => {
  return (
    <div className="Header">
      <ul className="HeaderItems">
        <li>
          <img src={Logo} className="HeaderIcon" alt="All cranes icon" />
        </li>
        <li>
          <button>
            <Link to="/settings">SETTINGS</Link>
          </button>
        </li>
      </ul>

      <Route exact path="/settings">
        <Settings user={user} />
      </Route>
    </div>
  );
};

export default Header;
