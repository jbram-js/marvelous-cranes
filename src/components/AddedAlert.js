import React from "react";
import PropTypes from "prop-types";

import "../styles/AddedAlert.css";

const AddedAlert = ({ message, success }) => {
  if (!message) return null;
  return (
    <div className={`Alert alert-${success ? "success" : "error"}`}>
      {message}
    </div>
  );
};

AddedAlert.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool,
};

AddedAlert.defaultProps = {
  success: false,
};

export default AddedAlert;
