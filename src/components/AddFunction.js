import React, { useState } from "react";
import PropTypes from "prop-types";
import { Slider } from "@material-ui/core";
import AddedAlert from "./AddedAlert";

import axios from "axios";
import "../styles/AddFunction.css";

const initialState = {
  fields: {
    selectedFile: null,
  },
  alert: {
    message: "",
    success: false,
  },
};

const AddFunction = ({ fields, setFields }) => {
  const [craneSlider, setCraneSlider] = useState(5);
  const [backgroundSlider, setBackgroundSlider] = useState(5);
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");
  const [value, setValue] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);

  /*const handleAddCrane = async (event) => {
    event.preventDefault();
    handleUpload();
  };*/

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

  const handleUpload = async (ev) => {
    ev.preventDefault();
    const file = value.selectedFile;
    // Split the filename to get the name and type
    const fileParts = file.name.split(".");
    const fileType = fileParts[1];
    const fileName = fileParts[0] + Date.now() + "." + fileType;
    const url = `https://cranebucket.s3.eu-west-2.amazonaws.com/${fileName}`;

    await axios
      .post("https://test-crane.herokuapp.com/sign_s3", {
        fileName: fileName,
        fileType: fileType,
      })
      .then((response) => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;
        setUrl(url);
        console.log("Recieved a signed request " + signedRequest);

        axios
          .post("https://test-crane.herokuapp.com/addCrane", {
            ...fields,
            image: url,
          })
          .then(() => {
            setAlert({ message: "Crane Added!", success: true });
            setFields({
              craneCaption: "",
              craneRate: "",
              craneBackgroundRate: "",
              craneDescription: "",
              markers: [{ lat: "", lng: "" }],
              dateCreated: new Date(),
            });
            setValue({ selectedFile: null });
            setCraneSlider(0);
            setBackgroundSlider(0);
          })
          .catch((err) => {
            setAlert({
              message: "Server error. Please try again later.",
              success: false,
            });
          });

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
      <AddedAlert message={alert.message} success={alert.success} />
      <form id="addForm" className="add-crane-form" onSubmit={handleUpload}>
        <input
          type="file"
          className="form-input"
          onChange={singleFileChangedHandler}
        />
        <input
          className="form-input"
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
          className="form-input"
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
          style={{ outline: "none" }}
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
