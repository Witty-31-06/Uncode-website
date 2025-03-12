import React from "react";

const OutputSection = ({ output }) => {
  return (
    <div className="output-section">
      <label>Output</label>
      <textarea className="output-box" value={output} readOnly rows="10" />
    </div>
  );
};

export default OutputSection;
