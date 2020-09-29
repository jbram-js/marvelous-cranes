import React, { useState } from "react";

import axios from "axios";

import "../styles/Settings.css";

const Settings = ({ user }) => {
  const initialState = {
    fields: {},
  };
  const [value, setValue] = useState(initialState.fields);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleUpdateUserInfo = (e) => {
    e.preventDefault();
    if (value.password === value.confirmPassword) {
      const sendData = async () => {
        await axios
          .patch(
            `https://test-crane.herokuapp.com/updateUsers/${user._id}`,
            value
          )
          .then((response) => {
            console.log(response);
          });
      };
      sendData();
    }
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  console.log(value);

  return (
    <div className="Settings">
      <h1>Settings</h1>
      <form onSubmit={handleUpdateUserInfo}>
        <label htmlFor="username" onClick={() => setShowUsernameInput(true)}>
          USERNAME
        </label>
        {showUsernameInput && (
          <input
            name="username"
            id="username"
            type="text"
            placeholder={user.username}
            onChange={(e) => setValue({ ...value, username: e.target.value })}
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
            placeholder={user.phoneNumber}
            onChange={(e) =>
              setValue({ ...value, phoneNumber: e.target.value })
            }
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
            placeholder={user.emailAddress}
            onChange={(e) =>
              setValue({ ...value, emailAddress: e.target.value })
            }
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
            onChange={(e) => setValue({ ...value, password: e.target.value })}
          ></input>
        )}
        <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
        {showPasswordInput && (
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            onChange={(e) =>
              setValue({ ...value, confirmPassword: e.target.value })
            }
          ></input>
        )}
        <button type="submit">UPDATE</button>
      </form>
    </div>
  );
};

export default Settings;
