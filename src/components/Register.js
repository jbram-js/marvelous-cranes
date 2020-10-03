import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import spotify from "../icons/spotify.svg";
import twitter from "../icons/twitter.svg";
import instagram from "../icons/instagram.svg";
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
    <div className="register">
      <p className="register-p">REGISTER</p>
      <form action="submit" className="register-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          name="emailAddress"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          required
          name="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone Number"
          required
          name="phoneNumber"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Repeat Password"
          required
          name="confirmPassword"
          onChange={handleChange}
        />

        <button
          style={{ outline: "none" }}
          type="submit"
          className="register-button"
        >
          REGISTER
        </button>
      </form>
      <Link className="login-link" to="/login">
        Already got an account? <strong>Login!</strong>
      </Link>
      <Header />
      <ul className="social-links-register">
        <li>
          <a href="https://twitter.com/MarvelousCrane" target="_blank">
            {" "}
            <img src={twitter} className="social-icons" alt="Twitter icon" />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/marvelouscrane/?hl=en"
            target="_blank"
          >
            {" "}
            <img
              src={instagram}
              className="social-icons"
              alt="Instagram icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://open.spotify.com/artist/6kGMx9MqwnbKR2EYvZvvrG?si=_WTI0BvMRKewu8Zwod44cg"
            target="_blank"
          >
            {" "}
            <img src={spotify} className="social-icons" alt="Spotify icon" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Register;
