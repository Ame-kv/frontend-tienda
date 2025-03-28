import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "./Registro";
import Login from "./Login";
import Dashboard from './components/Dashboard';
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} /> {/* Asegúrate que la ruta es '/admin' */}
      </Routes>
    </Router>
  );
}

export default App;