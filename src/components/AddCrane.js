import React, { useState } from "react";

import "../styles/AddCrane.css";

const initialState = {
  fields: {
    image: {},
    caption: "",
    craneRate: "",
    backdropRate: "",
    comment: "",
  },
};

const AddCrane = () => {
  const [value, setValue] = useState(initialState.fields);

  const handleFieldChange = (event) => {
    setValue({ ...value, image: event.target.files[0] });
  };

  const handleAddCrane = (event) => {
    event.preventDefault();
  };

  console.log(value.image);

  return (
    <div className="AddCrane">
      <h1>Add crane</h1>
      <form className="add-crane-form" onSubmit={handleAddCrane}>
        <label htmlFor="image-upload">Camera roll</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFieldChange}
        ></input>
        <label htmlFor="caption">CAPTION</label>
        <input id="caption" name="caption" onChange={handleFieldChange}></input>
        <label htmlFor="crane-rate">CRANE RATE</label>
        <select id="crane-rate" name="crane-rate" onChange={handleFieldChange}>
          <option>0</option>
          <option>0.5</option>
          <option>1</option>
          <option>1.5</option>
          <option>2</option>
          <option>2.5</option>
          <option>3</option>
          <option>3.5</option>
          <option>4</option>
          <option>4</option>
          <option>4.5</option>
          <option>5</option>
          <option>5.5</option>
          <option>6</option>
          <option>6.5</option>
          <option>7</option>
          <option>7.5</option>
          <option>8</option>
          <option>8.5</option>
          <option>9</option>
          <option>9.5</option>
          <option>10</option>
        </select>
        <label htmlFor="backdrop-rate">BACKDROP RATE</label>
        <select
          id="backdrop-rate"
          name="backdrop-rate"
          onChange={handleFieldChange}
        >
          <option>0</option>
          <option>0.5</option>
          <option>1</option>
          <option>1.5</option>
          <option>2</option>
          <option>2.5</option>
          <option>3</option>
          <option>3.5</option>
          <option>4</option>
          <option>4</option>
          <option>4.5</option>
          <option>5</option>
          <option>5.5</option>
          <option>6</option>
          <option>6.5</option>
          <option>7</option>
          <option>7.5</option>
          <option>8</option>
          <option>8.5</option>
          <option>9</option>
          <option>9.5</option>
          <option>10</option>
        </select>
        <label htmlFor="comment">COMMENT</label>
        <input id="comment" name="comment" onChange={handleFieldChange}></input>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default AddCrane;
