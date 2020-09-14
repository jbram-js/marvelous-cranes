import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

const initialState = {
  fields: {
    emailAddress: "",
    username: "",
    password: "",
  },
};

const Register = ({ setUserLoggedIn }) => {
  const [value, setValue] = useState(initialState.fields);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.password === value.confirmPassword) {
      console.log("success");
      axios.post("http://localhost:5000", {
        username: value.username,
        emailAddress: value.emailAddress,
        password: value.password,
      }).then((response) => {
        console.log(response);
        //setUserLoggedIn(true);
      }).catch((err) => {
        console.log(err);
      });
    } else {
      console.log("Check passwords match");
    }

  };


    return (
      <div className="App">
        <h1>Register</h1>
        <form action="submit" onSubmit={handleSubmit}>
          <input 
            type="email"
            placeholder="Email..."
            required
            name="emailAddress" 
            onChange={handleChange} 
          />
          <input 
            type="text"
            placeholder="Username..."
            required
            name="username"
            onChange={handleChange} 
          />
          <input 
            type="password"
            placeholder="Password..."
            required
            name="password"
            onChange={handleChange} 
          />
          <input
            type="password"
            placeholder="Repeat Password..."
            required
            name="confirmPassword"
            onChange={handleChange} 
          />
          
          <button type="submit">Register</button>
        </form>
        <Link to="/">Already got an account?</Link>
      </div>
    )
  };

export default Register;
