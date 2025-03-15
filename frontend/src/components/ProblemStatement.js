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

  // Function to format math expressions
  const formatMathExpression = (text) => {
    return (
      text
        // Exponents: "a^b" -> "a<sup>b</sup>"
        .replace(/(\S+)\^(\S+)/g, (_, base, exp) => `${base}<sup>${exp}</sup>`)
        // Subscripts: "a_i" or "x_123" -> "a<sub>i</sub>", "x<sub>123</sub>"
        .replace(
          /(\w+)_([a-zA-Z0-9]+)/g,
          (_, base, sub) => `${base}<sub>${sub}</sub>`
        )
        // Square root: "sqrt(x)" -> "√x"
        .replace(/sqrt\(([^)]+)\)/g, (_, value) => `√${value}`)
        // Replace newlines with <br> for formatting
        .replace(/\n/g, "<br />")
    );
  };

  return (
    <div className="problem-statement">
      <h3 id="problem-statement">Problem Statement</h3>

      <h4>Input Format</h4>
      <p
        dangerouslySetInnerHTML={{ __html: formatMathExpression(inputFormat) }}
      ></p>

      <h4>Output Format</h4>
      <p
        dangerouslySetInnerHTML={{ __html: formatMathExpression(outputFormat) }}
      ></p>

      <div className="input-container">
        <h4>Input 1</h4>
        <button
          className="copy-btn"
          onClick={() => onCopyTestCase(exampleInput1)}
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
          onClick={() => onCopyTestCase(exampleInput2)}
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
