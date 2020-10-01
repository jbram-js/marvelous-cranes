import React, { useState } from "react";
import PropTypes from "prop-types";
import { Slider } from "@material-ui/core";

import axios from "axios";
import "../styles/AddFunction.css";

const initialState = {
  fields: {
    selectedFile: null,
  },
};

const AddFunction = ({ fields, setFields }) => {
  const [craneSlider, setCraneSlider] = useState(0);
  const [backgroundSlider, setBackgroundSlider] = useState(0);
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");
  const [value, setValue] = useState(initialState.fields);

  const handleAddCrane = async (event) => {
    event.preventDefault();
    handleUpload();
    await axios
      .post("https://test-crane.herokuapp.com/addCrane", fields)
      .then((response) => {
        console.log(response);

        alert(` ${response.data.craneCaption} successfully added`);
      })
      .catch((err) => {
        alert(` ${fields.craneCaption} could not be added - check console`);
        console.log(err);
      });
  };

  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleCRSlider = (e, value) => {
    setCraneSlider(value);
    setFields({
      ...fields,
      craneRate: craneSlider,
    });
  };

  const handleBRSlider = (e, value) => {
    setBackgroundSlider(value);
    setFields({
      ...fields,
      craneBackgroundRate: backgroundSlider,
    });
  };

  // ImageUpload logic

  const handleChange = (ev) => {
    setSuccess(false);
    setUrl("");
  };

  const singleFileChangedHandler = (event) => {
    setValue({
      selectedFile: event.target.files[0],
    });
  };

  // Perform the upload

  const handleUpload = (ev) => {
    const file = value.selectedFile;
    // Split the filename to get the name and type
    const fileParts = file.name.split(".");
    const fileName = fileParts[0];
    const fileType = fileParts[1];
    console.log(fileParts);
    axios
      .post("https://test-crane.herokuapp.com/sign_s3", {
        fileName: fileName + Date.now() + "." + fileType,
        fileType: fileType,
      })
      .then((response) => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;
        setUrl(url);
        console.log("Recieved a signed request " + signedRequest);

        // Put the fileType in the headers for the upload
        const options = {
          headers: {
            "Content-Type": fileType,
          },
        };

        axios
          .put(signedRequest, file, options)
          .then((result) => {
            console.log("Response from s3");
            setSuccess(true);
          })
          .catch((error) => {
            console.log("ERROR " + JSON.stringify(error));
          });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  return (
    <div className="add-function">
      <form id="addForm" className="add-crane-form" onSubmit={handleAddCrane}>
        <input type="file" onChange={singleFileChangedHandler} />
        <input
          id="craneCaption"
          name="craneCaption"
          placeholder="Caption"
          value={fields.craneCaption}
          onChange={handleFieldChange}
          required
          autoComplete="off"
        />
        <label htmlFor="craneRate">
          <div className="label-div">Crane Rate</div>
        </label>

        <div className="slider-add-crane">
          <Slider
            id="craneRate"
            name="craneRate"
            value={craneSlider}
            min={0}
            max={10}
            step={0.5}
            marks={false}
            valueLabelDisplay="auto"
            onChange={handleCRSlider}
          />
        </div>
        <label htmlFor="craneBackgroundRate">
          <div className="label-div">Location Rate</div>
        </label>
        <div className="slider-add-crane">
          <Slider
            id="craneBackgroundRate"
            name="craneBackgroundRate"
            value={backgroundSlider}
            min={0}
            max={10}
            step={0.5}
            marks={false}
            valueLabelDisplay="auto"
            onChange={handleBRSlider}
          />
        </div>
        <input
          id="craneDescription"
          name="craneDescription"
          placeholder="Comment"
          type="textarea"
          value={fields.craneDescription}
          onChange={handleFieldChange}
          required
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={fields.markers.length !== 1}
          className="add-crane-button"
        >
          ADD CRANE
        </button>
      </form>
    </div>
  );
};

AddFunction.propType = {
  fields: PropTypes.object.isRequired,
  setFields: PropTypes.func.isRequired,
};

export default AddFunction;
