import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Maps from "./components/Maps";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/askai" element={<AskAI />} />
      </Routes>
    </Router>
  );
}
