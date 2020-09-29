import React, { useState } from "react";
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
    <div className="Settings">
      <h1>Settings</h1>
      <form>
        <label htmlFor="username" onClick={() => setShowUsernameInput(true)}>
          USERNAME
        </label>
        {showUsernameInput && (
          <input
            name="username"
            id="username"
            type="text"
            value={value.username}
            onChange={handleChange}
          ></input>
        )}
        <label
          htmlFor="phoneNumber"
          onClick={() => setShowPhoneNumberInput(true)}
        >
          PHONE NUMBER
        </label>
        {showPhoneNumberInput && (
          <input
            name="phoneNumber"
            id="phoneNumber"
            type="tel"
            value={value.phoneNumber}
            onChange={handleChange}
          ></input>
        )}
        <label htmlFor="emailAddress" onClick={() => setShowEmailInput(true)}>
          EMAIL ADDRESS
        </label>
        {showEmailInput && (
          <input
            name="emailAddress"
            id="emailAddress"
            type="email"
            value={value.emailAddress}
            onChange={handleChange}
          ></input>
        )}
        <label htmlFor="password" onClick={() => setShowPasswordInput(true)}>
          PASSWORD
        </label>
        {showPasswordInput && (
          <input
            name="password"
            id="password"
            type="password"
            onChange={handleChange}
          ></input>
        )}
        <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
        {showPasswordInput && (
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            onChange={handleChange}
          ></input>
        )}
        <button onClick={handleUpdateUserInfo}>UPDATE</button>
      </form>
      <NavBar />
      <Header />
    </div>
  );
};

export default Settings;
