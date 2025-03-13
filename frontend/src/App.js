import "./App.css";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Test.js";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={<Test />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} CodeClub JU</span>
          <span className="srijan">SRIJAN - Tech Fest of JU</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
