import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Test.css";
import ccjuLogo from "./ccju.png";
import srijanLogo from "./srijan.png";
import ProblemStatement from "../components/ProblemStatement";
import InputSection from "../components/InputSection";
import OutputSection from "../components/OutputSection";
import ProblemSelector from "../components/ProblemSelector";


const Test = () => {
  const [problems, setProblems] = useState({});
  const [problem, setProblem] = useState(
    localStorage.getItem("selectedProblem") || ""
  );
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [exampleInput1, setExampleInput1] = useState("");
  const [exampleOutput1, setExampleOutput1] = useState("");
  const [exampleInput2, setExampleInput2] = useState("");
  const [exampleOutput2, setExampleOutput2] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/problems");
        const problemsData = response.data;
        setProblems(problemsData);

        const firstProblemKey = Object.keys(problemsData)[0];
        if (firstProblemKey && !problem) {
          setProblem(firstProblemKey);
          setProblemDetails(problemsData[firstProblemKey]);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();

    // Disable inspect elements
    const disableInspect = (event) => {
      if (
        event.key === "F12" ||
        (event.ctrlKey && (event.key === "u" || event.key === "U")) ||
        (event.ctrlKey &&
          event.shiftKey &&
          (event.key === "i" ||
            event.key === "I" ||
            event.key === "J" ||
            event.key === "C"))
      ) {
        event.preventDefault();
      }
    };

    const disableRightClick = (event) => event.preventDefault();

    document.addEventListener("keydown", disableInspect);
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("keydown", disableInspect);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  useEffect(() => {
    if (input.trim() === "") {
      setOutput("");
    }
  }, [input]);

  useEffect(() => {
    setOutput("");
    if (problem) {
      setProblemDetails(problems[problem]);
      setInput("");
    } else {
      resetProblemDetails();
      setInput("");
    }
  }, [problem, problems]);

  const setProblemDetails = (problemData) => {
    setInputFormat(problemData?.inputFormat || "");
    setOutputFormat(problemData?.outputFormat || "");
    setExampleInput1(problemData?.exampleInput1 || "");
    setExampleOutput1(problemData?.exampleOutput1 || "");
    setExampleInput2(problemData?.exampleInput2 || "");
    setExampleOutput2(problemData?.exampleOutput2 || "");
  };

  const resetProblemDetails = () => {
    setInputFormat("");
    setOutputFormat("");
    setExampleInput1("");
    setExampleOutput1("");
    setExampleInput2("");
    setExampleOutput2("");
  };

  useEffect(() => {
    const tauntMessages = [
      "Copy kar raha tha...Soch raha hoga na ‘isko kaise pata chala?’ Beta, teri shakal se hi ‘Ctrl + C Ctrl + V coder’ vibes aa rahi hai! Uncode mein aise nahi chalega, algorithm pe kaam kar!",
      "Beta, tu toh code likhne ke naam pe hi darr gaya? Uncode mein aise nahi chalega, code likh!",
      "Beta, tu toh ‘print’ ke bina kuch nahi karta! Uncode mein aise nahi chalega, code likh!",
      "Bhagwan teri copy-paste ki atma ko shanti de! Ab toh sudhar ja!",
      "Beta, tu toh ‘Ctrl + C Ctrl + V’ ke bina kuch nahi karta! Uncode mein aise nahi chalega, code likh!",
      "Ajeeb insaan hai tu... Copy-paste ka ashirwad lene aaya hai? Beta, yeh shastra tere liye nahi likha gaya! Apni soch se kuch naya kar!",
      "Aree bhai, eta Uncode! Nijer brain lagabi na toh kikora jabe",
    ];

    const handleCopy = (event) => {
      const selection = window.getSelection();
      const selectedText = selection.toString();
      if (
        selectedText.includes("Problem Statement") ||
        selectedText.includes(inputFormat) ||
        selectedText.includes(outputFormat) ||
        selectedText.includes(exampleInput1) ||
        selectedText.includes(exampleOutput1) ||
        selectedText.includes(exampleInput2) ||
        selectedText.includes(exampleOutput2)
      ) {
        event.preventDefault();
        const randomMessage =
          tauntMessages[Math.floor(Math.random() * tauntMessages.length)];
        event.clipboardData.setData("text/plain", randomMessage);
      }
    };

    document.addEventListener("copy", handleCopy);
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, [
    inputFormat,
    outputFormat,
    exampleInput1,
    exampleOutput1,
    exampleInput2,
    exampleOutput2,
  ]);
  const handleForm = async (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRunning(true);

    // Create a promise that resolves after 1 second
    const delay = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // const response = await axios.post("/run", { problem, input });
      // setOutput(response.data.output);

       const response = await Promise.all([
         axios.post("/run", { problem, input }),
         delay,
       ]);

       // Set the output from the API response
       setOutput(response[0].data.output);
    } catch {
      setOutput("");
    } finally {
      setRunning(false);
    }
  };

  const handleCopyTestCase = (testCase) => {
    setInput(testCase);
    setOutput("");
    inputRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleProblemChange = (selectedProblem) => {
    setProblem(selectedProblem);
    localStorage.setItem("selectedProblem", selectedProblem);
    setProblemDetails(problems[selectedProblem]);
  };

  return (
    <div className="dark-mode">
      <nav className="navbar">
        <img src={ccjuLogo} alt="CCJU Logo" className="logo-left" />
        <h2 className="nav-title">Uncode</h2>
        <img src={srijanLogo} alt="Srijan Logo" className="logo-right" />
      </nav>

      <div className="test-container">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <form className="test-form" onSubmit={handleForm}>
            <ProblemSelector
              problem={problem}
              setProblem={handleProblemChange}
              problems={problems}
            />

            {problem && (
              <div className="problem-display">
                <ProblemStatement
                  inputFormat={inputFormat}
                  outputFormat={outputFormat}
                  exampleInput1={exampleInput1}
                  exampleOutput1={exampleOutput1}
                  exampleInput2={exampleInput2}
                  exampleOutput2={exampleOutput2}
                  onCopyTestCase={handleCopyTestCase}
                />
                <div className="io-container" ref={inputRef}>
                  <InputSection input={input} setInput={setInput} />
                  <OutputSection output={output} />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={!problem || running}
              onClick={handleSubmit}
            >
              {running ? "Running..." : "Run"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Test;
