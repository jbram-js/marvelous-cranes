import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import Register from "./Register";

import "../styles/LogIn.css";

const initialState = {
  fields: { username: "", password: "" },
};

const LogIn = ({ setUserLoggedIn }) => {
  const [value, setValue] = useState(initialState.fields);
  const [registerComponent, setRegisterComponent] = useState(false);

  const handleInput = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserLoggedIn(true);
  };

  const handleRenderRegister = () => {
    setRegisterComponent(true);
  };

  return (
    <div className="LogIn">
      {!registerComponent ? (
        <>
          {" "}
          <h1>Log In</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Email or Username</label>
            <input
              id="email-username"
              name="username"
              onChange={handleInput}
              value={value.username}
              required
            ></input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInput}
              value={value.password}
              required
            ></input>
            <button type="submit">Login</button>
          </form>
          <Link to="/register">
            <button className="register" onClick={handleRenderRegister}>
              Register
            </button>
          </Link>
        </>
      ) : (
        <Route exact path="/register">
          <Register setUserLoggedIn={setUserLoggedIn} />
        </Route>
      )}
    </div>
  );
};

export default LogIn;
