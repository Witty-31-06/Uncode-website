import React from "react";

const ProblemSelector = ({ problem, setProblem, problems }) => {
  return (
    <div className="form-group">
      <label>Select Problem</label>
      <select
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        required
      >
        {Object.keys(problems).map((key, index) => (
          <option key={key} value={key}>
            {problems[key]?.name || `Problem ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProblemSelector;
