import React from "react";

const InputSection = ({ input, setInput }) => {
  return (
    <div className="input-section">
      <div className="input-label-container">
        <label>Input</label>
        <button className="clear-btn" onClick={() => setInput("")}>
          Clear
        </button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="10"
        placeholder="Enter input here..."
      />
    </div>
  );
};

export default InputSection;
