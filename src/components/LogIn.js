import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../images/login-image-final.png";

import spotify from "../icons/spotify.svg";
import twitter from "../icons/twitter.svg";
import instagram from "../icons/instagram.svg";

import "../styles/LogIn.css";

const LogIn = ({ setUser, handleSubmit, handleInput, value }) => {
  return (
    <div className="login">
      <img src={loginImage} className="login-image" alt="Cranes over river" />

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
        <button type="submit" className="login-button">
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
    </div>
  );
};

export default LogIn;
