// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Registro from "./Registro";
import Login from "./Login";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import PrendaDetalle from "./pages/PrendaDetalle";
import CarritoYPago from "./components/CarritoYPago";
import CarritoGuard from "./components/CarritoGuard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/prenda/:id" element={<PrendaDetalle />} />

          <Route
            path="/carrito"
            element={
              <CarritoGuard>
                <CarritoYPago />
              </CarritoGuard>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
