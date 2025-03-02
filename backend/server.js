// const express = require("express");
// const cors = require("cors");
// const { spawn } = require("child_process");
// const path = require("path");
// const fs = require("fs");

// const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: ["POST", "GET"],
// };
// app.use(cors(corsOptions));
// app.use(express.json());

// const getProblems = () => {
//   const data = fs.readFileSync(path.join(__dirname, "problems.json"));
//   return JSON.parse(data);
// };

// app.post("/run", (req, res) => {
//   const problems = getProblems();
//   const { problem, input } = req.body;

//   if (!problems[problem]) {
//     return res.status(400).json({ error: "Invalid problem" });
//   }

//   const executablePath = path.join(__dirname, problems[problem].executable);

//   const process = spawn(executablePath);
//   let output = "",
//     errorOutput = "";

//   process.stdout.on("data", (data) => {
//     output += data.toString();
//   });

//   process.stderr.on("data", (data) => {
//     errorOutput += data.toString();
//   });

//   process.on("close", (code) => {
//     res.json({
//       output: code !== 0 ? "Execution Error: " + errorOutput : output.trim(),
//     });
//   });

//   process.stdin.write(input + "\n");
//   process.stdin.end();
// });

// app.get("/problems", (req, res) => {
//   res.json(getProblems());
// });

// //--------deployment-----------
// const __dirname1 = path.resolve();
// app.use(express.static(path.join(__dirname1, "/frontend/build")));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
// })
// //--------deployment-----------
// app.listen(5000, () => console.log("Server running"));
const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "GET"],
};
app.use(cors(corsOptions));
app.use(express.json());

const getProblems = () => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "problems.json"),
      "utf-8"
    );
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading problems.json:", error);
    return {};
  }
};

app.post("/run", (req, res) => {
  const problems = getProblems();
  const { problem, input } = req.body;

  if (!problems[problem]) {
    return res.status(400).json({ error: "Invalid problem" });
  }

  const executablePath = path.join(__dirname, problems[problem].executable);

  // Check if the file exists and is executable
  if (!fs.existsSync(executablePath)) {
    return res.status(400).json({ error: "Executable not found" });
  }
  if (!fs.statSync(executablePath).mode & 0o111) {
    return res
      .status(400)
      .json({ error: "Executable does not have execute permissions" });
  }

  const process = spawn(executablePath);

  let output = "",
    errorOutput = "";

  process.stdout.on("data", (data) => {
    output += data.toString();
  });

  process.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  process.on("error", (err) => {
    console.error("Execution Error:", err);
    return res.status(500).json({ error: `Execution error: ${err.message}` });
  });

  process.on("close", (code) => {
    res.json({
      output: code !== 0 ? `Execution Error: ${errorOutput}` : output.trim(),
    });
  });

  process.stdin.write(input + "\n");
  process.stdin.end();
});

app.get("/problems", (req, res) => {
  res.json(getProblems());
});

//--------deployment-----------
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
});
//--------deployment-----------

app.listen(5000, () => console.log("Server running on port 5000"));
