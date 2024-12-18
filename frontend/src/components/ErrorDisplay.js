import React from "react";
import PropTypes from "prop-types";
import "./ErrorDisplay.css"; // Optional: Add styling if needed

export const ErrorDisplay = ({ error }) => {
  if (!error) {
    return null; // If there's no error, don't render anything
  }

  return (
    <div className="error-display">
      <h4>Error</h4>
      <p>{error}</p>
    </div>
  );
};

// Define the prop types for error
ErrorDisplay.propTypes = {
  error: PropTypes.string, // Error should be a string
};
