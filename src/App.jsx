import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Dashboard from "./components/Dashboard";
import AddMemory from "./components/AddMemory";
import MemoryJar from "./components/MemoryJar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-memory" element={<AddMemory />} />
        <Route path="/memory-jar" element={<MemoryJar />} />
      </Routes>
    </Router>
  );
}

export default App;
