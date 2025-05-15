import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Maps from "./components/Maps";
import Askai from "./components/Askai";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/askai" element={<Askai />} />
      </Routes>
    </Router>
  );
}
