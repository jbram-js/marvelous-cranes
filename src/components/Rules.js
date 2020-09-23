import React, { useState } from "react";
import Header from "./Header";
import rulesImage from "../images/rules-image.jpg";

import "../styles/Rules.css";

const Rules = ({ setFirstVisit }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isChecked ? setFirstVisit(false) : setFirstVisit(true);
  };
  return (
    <div className="rules">
      <img
        src={rulesImage}
        className="rules-image"
        alt="Roy Molloy in front of cranes"
      />
      <p className="cranger-p">Welcome to the god damn Cranger Zone!</p>
      <p className="rules-p">
        Welcome to the world of Sydney's own mighty Marvelous Crane - Roy
        Molloy. Only three requirements to be in the Roy Squad:
      </p>
      <ul className="roy-squad-list">
        <li>1) Respect yourself</li>
        <li>2) respect others</li>
        <li>3) Stick up for me in conversations</li>
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="checkbox">Agree to the Rules</label>
        <input
          type="checkbox"
          id="checkbox"
          name="checkbox"
          className="checkbox"
          onChange={handleChange}
        ></input>
        <button type="submit" className="rules-button">
          RESPECT
        </button>
      </form>
      <Header />
    </div>
  );
};

export default Rules;
