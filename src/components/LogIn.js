import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LogIn.css";

const initialState = {
  fields: { username: "", password: "" },
};

const LogIn = ({ setUserLoggedIn }) => {
  const [value, setValue] = useState(initialState.fields);
  
  const handleInput = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("logged in")
    setUserLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>User Login</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username..."
          required
          name="username"
          onChange={handleInput}
          value={value.username}
        />
        <input
          type="password"
          placeholder="Password..."
          required
          name="password"
          onChange={handleInput}
          value={value.password}
        />
        <div>Remember Me?<input type="checkbox" className="remember"/></div>
        
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Sign up!</Link>
    </div>
  )
};

export default LogIn;
