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

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("/problems");
        const problemsData = response.data;

        setProblems(problemsData);

        const firstProblemKey = Object.keys(problemsData)[0];
        if (firstProblemKey && !problem) {
          setProblem(firstProblemKey);
          setInputFormat(problemsData[firstProblemKey]?.inputFormat || "");
          setOutputFormat(problemsData[firstProblemKey]?.outputFormat || "");
          setExampleInput1(problemsData[firstProblemKey]?.exampleInput1 || "");
          setExampleOutput1(
            problemsData[firstProblemKey]?.exampleOutput1 || ""
          );
          setExampleInput2(problemsData[firstProblemKey]?.exampleInput2 || "");
          setExampleOutput2(
            problemsData[firstProblemKey]?.exampleOutput2 || ""
          );
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
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
  }, [problem]);

  useEffect(() => {
    if (input.trim() === "") {
      setOutput("");
    }
  }, [input]);

  useEffect(() => {
    setOutput("");
    if (problem) {
      setInputFormat(problems[problem]?.inputFormat || "");
      setOutputFormat(problems[problem]?.outputFormat || "");
      setExampleInput1(problems[problem]?.exampleInput1 || "");
      setExampleOutput1(problems[problem]?.exampleOutput1 || "");
      setExampleInput2(problems[problem]?.exampleInput2 || "");
      setExampleOutput2(problems[problem]?.exampleOutput2 || "");
      setInput("");
    } else {
      setInputFormat("");
      setOutputFormat("");
      setExampleInput1("");
      setExampleOutput1("");
      setExampleInput2("");
      setExampleOutput2("");
      setInput("");
    }
  }, [problem, problems]);

  useEffect(() => {
    const tauntMessages = [
      "Copy kar raha tha...Soch raha hoga na ‘isko kaise pata chala?’ Beta, teri shakal se hi ‘Ctrl + C Ctrl + V coder’ vibes aa rahi hai! Uncode mein aise nahi chalega, algorithm pe kaam kar!",
      "Beta, tu toh code likhne ke naam pe hi darr gaya? Uncode mein aise nahi chalega, code likh!",
      "Ajeeb banda hai tu, problem ka logic samajhne ka natak bhi karega ya seedha ‘print(expected_output)’ dalke chal padega? Genius bano, hardcoded coder nahi!",
      "Beta, tu toh ‘print’ ke bina kuch nahi karta! Uncode mein aise nahi chalega, code likh!",
      "Bhagwan teri copy-paste ki atma ko shanti de! Ab toh sudhar ja!",
      "Beta, tu toh ‘Ctrl + C Ctrl + V’ ke bina kuch nahi karta! Uncode mein aise nahi chalega, code likh!",
      "Ajeeb insaan hai tu... Copy-paste ka ashirwad lene aaya hai? Beta, yeh shastra tere liye nahi likha gaya! Apni soch se kuch naya kar!",
      "Bro, Uncode jite jaabi mone korechis copy-paste diye? Bhalo bhalo! Pattern bojha nei, toh leaderboard er last e thakbi!",
      "Aree bhai, eta Uncode! Nijer brain lagabi na toh kikora jabe"
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
    try {
      const response = await axios.post("/run", { problem, input });
      setOutput(response.data.output);
    } catch {
      setOutput("");
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
  };

  return (
    <div className="dark-mode">
      <nav className="navbar">
        <img src={ccjuLogo} alt="CCJU Logo" className="logo-left" />
        <h2 className="nav-title">Uncode</h2>
        <img src={srijanLogo} alt="Srijan Logo" className="logo-right" />
      </nav>

      <div className="test-container">
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
            disabled={!problem}
            onClick={handleSubmit}
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
};

export default Test;
