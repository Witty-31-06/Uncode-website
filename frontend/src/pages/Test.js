import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Test.css";
import ccjuLogo from "./ccju.png";
import srijanLogo from "./srijan.png";

const Test = () => {
  const [problems, setProblems] = useState({});
  const [problem, setProblem] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("/problems");
        const problemsData = response.data;

        setProblems(problemsData);

        const firstProblemKey = Object.keys(problemsData)[0];
        if (firstProblemKey) {
          setProblem(firstProblemKey);
          setProblemStatement(problemsData[firstProblemKey]?.statement || "");
          setInput(problemsData[firstProblemKey]?.["sample-input"] || "");
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
  }, []);

  useEffect(() => {
    if (input.trim() === "") {
      setOutput("");
    }
  }, [input]);

  useEffect(() => {
    setOutput("");
    if (problem) {
      setProblemStatement(problems[problem]?.statement || "");
      setInput(problems[problem]?.["sample-input"] || "");
    } else {
      setProblemStatement("");
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
      "Aree bhai, eta Uncode, Stack Overflow submission na! Nijer brain lagabi na toh kikora jabe",
      "যদি logic না বোঝ, তাহলে finals তো দুরের কথা, prelims-এর scoreboard eo নাম পাবে না!",
    ];

    const handleCopy = (event) => {
      if (event.target.id === "problem-statement") {
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/run", { problem, input });
      setOutput(response.data.output);
    } catch {
      setOutput("");
    }
  };

  return (
    <div className="dark-mode">
      <nav className="navbar">
        <img src={ccjuLogo} alt="CCJU Logo" className="logo-left" />
        <h2 className="nav-title">Uncode</h2>
        <img src={srijanLogo} alt="Srijan Logo" className="logo-right" />
      </nav>

      <div className="test-container">
        <form className="test-form" onSubmit={handleSubmit}>
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

          {problem && (
            <div className="problem-display">
              <div className="problem-statement">
                <h3>Problem Statement</h3>
                <p
                  id="problem-statement"
                  dangerouslySetInnerHTML={{
                    __html: problemStatement.replace(/\n/g, "<br />"),
                  }}
                />
              </div>
              <div className="io-container">
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
                <div className="output-section">
                  <label>Output</label>
                  <textarea
                    className="output-box"
                    value={output}
                    readOnly
                    rows="10"
                  />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={!problem}>
            Run
          </button>
        </form>
      </div>
    </div>
  );
};

export default Test;
