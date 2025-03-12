import React from "react";

const InputSection = ({ input, setInput }) => {
  return (
    <div className="input-section">
      <label>Input</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="10"
        placeholder="Enter input here..."
        required
      />
    </div>
  );
};

export default InputSection;
