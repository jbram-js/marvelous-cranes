import React from "react";
import NavBar from "./NavBar";
import axios from "axios";

const AddFunction = ({ fields, setFields }) => {
  const handleAddCrane = (event) => {
    event.preventDefault();
    console.log(fields);
    axios
      .post("https://test-crane.herokuapp.com/addCrane", fields)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  return (
    <div className="AddFunction">
      Joe's Add
      <form onSubmit={handleAddCrane}>
        <label htmlFor="craneCaption">
          Caption:
          <input
            id="craneCaption"
            name="craneCaption"
            value={fields.craneCaption}
            onChange={handleFieldChange}
            required
          />
        </label>
        <label htmlFor="craneRate">
          Crane rate:
          <input
            id="craneRate"
            name="craneRate"
            type="Number"
            min={0}
            max={10}
            step={0.1}
            value={fields.craneRate}
            onChange={handleFieldChange}
            required
          />
        </label>
        <label htmlFor="craneBackgroundRate">
          Crane background rate:
          <input
            id="craneBackgroundRate"
            name="craneBackgroundRate"
            type="Number"
            min={0}
            max={10}
            step={0.1}
            value={fields.craneBackgroundRate}
            onChange={handleFieldChange}
            required
          />
        </label>
        <label htmlFor="craneUser">
          Username:
          <input
            id="craneUser"
            name="craneUser"
            value={fields.craneUser}
            onChange={handleFieldChange}
            required
            disabled
          />
        </label>
        <label htmlFor="craneDescription">
          Comment:
          <input
            id="craneDescription"
            name="craneDescription"
            value={fields.craneDescription}
            onChange={handleFieldChange}
            required
          />
        </label>
        <input type="submit" value="Add" />
      </form>
      <NavBar />
    </div>
  );
};

export default AddFunction;
