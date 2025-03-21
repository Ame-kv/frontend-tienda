import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "./Registro"; 
import Login from "./Login"; 
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;