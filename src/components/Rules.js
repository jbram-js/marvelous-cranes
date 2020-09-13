import React, { useState } from "react";

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
    <div className="Rules">
      <h1>Rules</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
        sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="checkbox">Agree to the Rules</label>
        <input
          type="checkbox"
          id="checkbox"
          name="checkbox"
          onChange={handleChange}
        ></input>
        <button type="submit">Close</button>
      </form>
    </div>
  );
};

export default Rules;
