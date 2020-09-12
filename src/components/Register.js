import React, { useState } from "react";

import "../styles/Register.css";

const initialState = {
  fields: {
    email: "",
    username: "",
    password: "",
  },
};

const Register = ({ setUserLoggedIn }) => {
  const [value, setValue] = useState(initialState.fields);

  const handleInput = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setUserLoggedIn(true);
  };

  return (
    <div className="Register">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleInput}
          value={value.email}
          required
        ></input>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={handleInput}
          value={value.username}
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleInput}
          value={value.password}
          required
        ></input>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          onChange={handleInput}
          required
        ></input>
        <button type="submit">Register and Login</button>
      </form>
    </div>
  );
};

export default Register;
