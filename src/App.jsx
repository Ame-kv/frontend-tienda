import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from "./Registro";
import Login from "./Login";
import Dashboard from './components/Dashboard';
import Admin from "./components/Admin";
import PrendaDetalle from "./pages/PrendaDetalle";
import CarritoYPago from "./components/CarritoYPago"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/prenda/:id" element={<PrendaDetalle />} />
        <Route path="/carrito" element={<CarritoYPago />} />  {/* YA DENME EL TÍTULO */}
      </Routes>
    </Router>
  );
}

export default App;
