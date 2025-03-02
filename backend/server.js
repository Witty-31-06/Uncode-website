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
  const data = fs.readFileSync(path.join(__dirname, "problems.json"));
  return JSON.parse(data);
};

app.post("/run", (req, res) => {
  const problems = getProblems();
  const { problem, input } = req.body;

  if (!problems[problem]) {
    return res.status(400).json({ error: "Invalid problem" });
  }

  const executablePath = path.join(__dirname, problems[problem].executable);

  const process = spawn(executablePath);
  let output = "",
    errorOutput = "";

  process.stdout.on("data", (data) => {
    output += data.toString();
  });

  process.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  process.on("close", (code) => {
    res.json({
      output: code !== 0 ? "Execution Error: " + errorOutput : output.trim(),
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
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
})
//--------deployment-----------
app.listen(5000, () => console.log("Server running"));
