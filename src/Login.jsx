import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import logo from "./assets/logo.jpeg";

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === "admin" && contrasena === "12345") {
      navigate("/dashboard");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const handleRegistro = () => {
    navigate("/registro");
  };

  return (
    <div className="login-container">
      <div className="logo-container"> {/* Contenedor para el logo */}
        <img src={logo} alt="Logo ClothesFever" className="logo" />
      </div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleRegistro}>Ir a Registro</button>
    </div>
  );
}

export default Login;