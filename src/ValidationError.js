import React from "react";
import PropTypes from "prop-types";

//what is this doing?
const ValidationError = (props) => {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  }
  return <></>;
};

ValidationError.defaultProps = {
  message: ""
};

ValidationError.propTypes = {
  message: PropTypes.string
};

export default ValidationError;
