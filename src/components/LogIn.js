import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/LogIn.css";

const initialState = {
  fields: { username: "", password: "" },
};

const LogIn = ({ setUser }) => {
  const [value, setValue] = useState(initialState.fields);
  const history = useHistory();
  
  const handleInput = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
      axios.post("https://test-crane.herokuapp.com/login", {
        username: value.username,
        password: value.password,
      }).then((response) => {
        setUser(response);
        history.push("/cranes")
      }).catch((err) => {
        console.log(err);
        alert("Error Logging in!")
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
