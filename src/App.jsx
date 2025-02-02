import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";  // Import Navigate
import Home from "./pages/Home";
import Code from "./pages/Code";
import Api from "./pages/Api";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/api" element={<Api />} />
        <Route path="/code" element={<Code/>}/>
        <Route path="/assignments" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default App;
