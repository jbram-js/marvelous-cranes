import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";

import "../styles/Settings.css";

const Settings = ({ user }) => {
  const initialState = {
    fields: {
      username: user.username,
      phoneNumber: user.phoneNumber,
      emailAddress: user.emailAddress,
    },
  };
  const [value, setValue] = useState(initialState.fields);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  
  const handleUpdateUserInfo = (e) => {
    e.preventDefault();
    if (
      value.username === "" ||
      value.phoneNumber === "" ||
      value.emailAddress === ""
    ) {
      setValue({
        ...value,
        username: user.username,
        phoneNumber: user.phoneNumber,
        emailAddress: user.emailAddress,
      });
    } else if (
      value.password === value.confirmPassword &&
      value.username.length > 6 &&
      value.username.length < 15
    ) {
      const sendData = async () => {
        await axios
          .patch(
            `https://test-crane.herokuapp.com/updateUsers/${user._id}`,
            value
          )
          .then(({ data }) => {
            console.log(data);
          });
      };
      sendData();
    } else {
      console.log("error");
    }
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  console.log(value);

  return (
    <div className="settings">
      <p className="heading">SETTINGS</p>
      <p className="settings-p">Update your user details here.</p>
      <form>
        <label
          htmlFor="username"
          className="settings-label"
          onClick={() => setShowUsernameInput(true)}
        >
          USERNAME
        </label>
        {showUsernameInput && (
          <input
            className="settings-form"
            name="username"
            id="username"
            type="text"
            value={value.username}
            onChange={handleChange}
          ></input>
        )}
        <label
          htmlFor="phoneNumber"
          className="settings-label"
          onClick={() => setShowPhoneNumberInput(true)}
        >
          PHONE NUMBER
        </label>
        {showPhoneNumberInput && (
          <input
            className="settings-form"
            name="phoneNumber"
            id="phoneNumber"
            type="tel"
            value={value.phoneNumber}
            onChange={handleChange}
          ></input>
        )}
        <label
          htmlFor="emailAddress"
          className="settings-label"
          onClick={() => setShowEmailInput(true)}
        >
          EMAIL ADDRESS
        </label>
        {showEmailInput && (
          <input
            className="settings-form"
            name="emailAddress"
            id="emailAddress"
            type="email"
            value={value.emailAddress}
            onChange={handleChange}
          ></input>
        )}
        <label
          htmlFor="password"
          className="settings-label"
          onClick={() => setShowPasswordInput(true)}
        >
          PASSWORD
        </label>
        {showPasswordInput && (
          <input
            className="settings-form"
            name="password"
            id="password"
            type="password"
            onChange={handleChange}
          ></input>
        )}
        <label htmlFor="confirmPassword" className="settings-label">
          CONFIRM PASSWORD
        </label>
        {showPasswordInput && (
          <input
            className="settings-form"
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            onChange={handleChange}
          ></input>
        )}
        <button className="settings-button" onClick={handleUpdateUserInfo}>
          UPDATE
        </button>
      </form>
      <NavBar />
      <Header />
    </div>
  );
};

export default Settings;
