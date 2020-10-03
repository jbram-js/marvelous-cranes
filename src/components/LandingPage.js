import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import royMolloy from "../images/roy-molloy.jpg";
import spotify from "../icons/spotify.svg";
import twitter from "../icons/twitter.svg";
import instagram from "../icons/instagram.svg";

import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="rules">
      <img
        src={royMolloy}
        className="first-image"
        alt="Roy Molloy in front of cranes"
      />
      <p className="cranger-p">Welcome to the god damn Cranger Zone!</p>
      <p className="landing-page-p">
        Step in to the world of Sydney's own mighty Marvelous Crane - Roy
        Molloy. Only three requirements to be in the Roy Squad:
      </p>
      <ul className="roy-squad-list">
        <li>1. Respect yourself</li>
        <li>2. Respect others</li>
        <li>3. Stick up for me in conversations</li>
      </ul>
      <Link to="/login">
        <button
          style={{ outline: "none" }}
          type="submit"
          className="landing-page-button"
        >
          RESPECT
        </button>
      </Link>
      <Header />
      <ul className="social-links-landing">
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

export default LandingPage;
