import React, { useRef } from "react";

const ProblemStatement = ({
  inputFormat,
  outputFormat,
  exampleInput1,
  exampleOutput1,
  exampleInput2,
  exampleOutput2,
  onCopyTestCase,
}) => {
  const inputRef = useRef(null);

  const handleCopyTestCase = (testCase) => {
    onCopyTestCase(testCase);
    inputRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="problem-statement">
      <h3 id="problem-statement">Problem Statement</h3>
      <h4>Input Format</h4>
      <p>{inputFormat.replace(/\n/g, "<br />")}</p>
      <h4>Output Format</h4>
      <p>{outputFormat.replace(/\n/g, "<br />")}</p>
      <div className="input-container">
        <h4>Input 1</h4>
        <button
          className="copy-btn"
          onClick={() => handleCopyTestCase(exampleInput1)}
          title="Copy to input box"
        >
          Use test case 📋
        </button>
      </div>
      <pre>{exampleInput1}</pre>
      <h4>Output 1</h4>
      <pre>{exampleOutput1}</pre>
      <div className="input-container">
        <h4>Input 2</h4>
        <button
          className="copy-btn"
          onClick={() => handleCopyTestCase(exampleInput2)}
          title="Copy to input box"
        >
          Use test case 📋
        </button>
      </div>
      <pre>{exampleInput2}</pre>
      <h4>Output 2</h4>
      <pre>{exampleOutput2}</pre>
      <div ref={inputRef}></div>
    </div>
  );
};

export default ProblemStatement;
