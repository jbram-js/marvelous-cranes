import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Rules from "./Rules";
import "../styles/Register.css";

const initialState = {
  fields: {
    emailAddress: "",
    username: "",
    phoneNumber: 0,
    password: "",
  },
};

const Register = ({ setUserLoggedIn }) => {
  const [value, setValue] = useState(initialState.fields);
  const history = useHistory();
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.password === value.confirmPassword) {
      console.log("success");
      axios
        .post("https://test-crane.herokuapp.com/Users", {
          username: value.username,
          emailAddress: value.emailAddress,
          phoneNumber: value.phoneNumber,
          password: value.password,
        })
        .then((response) => {
          console.log(response);
          //setUserLoggedIn(true);
          alert("Successful registration, redirecting you to log in!");
          history.push("/");
        })
        .catch((err) => {
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
          type="text"
          placeholder="Phone Number..."
          required
          name="phoneNumber"
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
  );
};

export default Register;
