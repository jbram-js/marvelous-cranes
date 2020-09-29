import React from "react";

import axios from "axios";

import "../styles/Settings.css";

const Settings = ({ user }) => {
  return (
    <div className="Settings">
      <h1>Settings</h1>
      <form>
        <label htmlFor="username">USERNAME</label>
        <input
          name="username"
          id="username"
          type="text"
          placeholder={user.username}
        ></input>
        <label htmlFor="phone-number">PHONE NUMBER</label>
        <input
          name="phone-number"
          id="phone-number"
          type="tel"
          placeholder={user.phoneNumber}
        ></input>
        <label htmlFor="email">EMAIL ADDRESS</label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder={user.emailAddress}
        ></input>
        <button>UPDATE</button>
      </form>
    </div>
  );
};

export default Settings;
