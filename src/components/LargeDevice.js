import React from "react";
import logo from "../icons/logo2.svg";
import spotify from "../icons/spotify.svg";
import twitter from "../icons/twitter.svg";
import instagram from "../icons/instagram.svg";
import "../styles/LargeDevice.css";

const LargeDevice = () => {
  return (
    <div className="large-device">
      <img
        className="large-device-image"
        src={logo}
        alt="Marvelous Cranes logo"
      />
      <p>
        The Cranger Zone is currently only 600px wide. Please use a smaller
        device to upload cranes.
      </p>
      <ul className="social-links-large-device">
        <li>
          <a href="https://twitter.com/MarvelousCrane" target="_blank">
            {" "}
            <img
              src={twitter}
              className="social-icons-large-device"
              alt="Twitter icon"
            />
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
              className="social-icons-large-device"
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
            <img
              src={spotify}
              className="social-icons-large-device"
              alt="Spotify icon"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LargeDevice;
