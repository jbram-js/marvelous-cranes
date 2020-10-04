import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import spotify from "../icons/spotify.svg";
import twitter from "../icons/twitter.svg";
import instagram from "../icons/instagram.svg";

import Header from "./Header";

import "../styles/LogIn.css";

const LogIn = ({ handleSubmit, value, setValue }) => {
  const handleInput = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  return (
    <div className="login">
      <p className="login-p">LOGIN</p>
      <form action="submit" className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          name="username"
          onChange={handleInput}
          value={value.username}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          onChange={handleInput}
          value={value.password}
        />
        <button
          style={{ outline: "none" }}
          type="submit"
          className="login-button"
        >
          LOGIN
        </button>
      </form>
      <Link className="register-link" to="/register">
        Don't have an account? <strong>Sign up!</strong>
      </Link>
      <ul className="social-links-login">
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
      <Header />
    </div>
  );
};

LogIn.propTypes = {
  handleSubmit: PropTypes.func,
  handleInput: PropTypes.func,
  value: PropTypes.object.isRequired,
};

export default LogIn;
