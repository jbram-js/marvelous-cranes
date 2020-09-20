import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "../styles/LogIn.css";

const LogIn = ({ setUser, handleSubmit, handleInput, value }) => {
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
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Sign up!</Link>
    </div>
  );
};

export default LogIn;
