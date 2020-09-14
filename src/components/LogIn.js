import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
      axios.post("http://localhost:5000/login", {
        username: value.username,
        password: value.password,
      }).then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
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
