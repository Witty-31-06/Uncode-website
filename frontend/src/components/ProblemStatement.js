import React from "react";

const ProblemStatement = ({
  inputFormat,
  outputFormat,
  exampleInput1,
  exampleOutput1,
  exampleInput2,
  exampleOutput2,
}) => {
  return (
    <div className="problem-statement">
      <h3 id="problem-statement">Problem Statement</h3>
      <h4>Input Format</h4>
      <p>{inputFormat.replace(/\n/g, "<br />")}</p>
      <h4>Output Format</h4>
      <p>{outputFormat.replace(/\n/g, "<br />")}</p>
      <h4>Input 1</h4>
      <pre>{exampleInput1}</pre>
      <h4>Output 1</h4>
      <pre>{exampleOutput1}</pre>
      <h4>Input 2</h4>
      <pre>{exampleInput2}</pre>
      <h4>Output 2</h4>
      <pre>{exampleOutput2}</pre>
    </div>
  );
};

export default ProblemStatement;
