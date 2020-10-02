import React, { useState } from "react";

import axios from "axios";

const ImageUpload = ({ sendImage, setSendImage }) => {
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");
  const [fields, setFields] = useState(initialState.fields);

  const handleChange = (ev) => {
    setSuccess(false);
    setUrl("");
  };

  const singleFileChangedHandler = (event) => {
    setFields({
      selectedFile: event.target.files[0],
    });
  };

  // Perform the upload

  const handleUpload = (ev) => {
    const file = fields.selectedFile;
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

  if (sendImage) {
    setSendImage(false);
    handleUpload();
  }

  return (
    <div className="image-upload">
      <input type="file" onChange={singleFileChangedHandler} /> <br />
    </div>
  );
};

export default ImageUpload;
