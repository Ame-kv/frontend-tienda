import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import logo from "./assets/logo.jpeg";

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(""); // Esto es el correo
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: usuario,
          contraseña: contrasena,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.mensaje || "Error al iniciar sesión");
        return;
      }

      // Guardar datos de usuario (opcional)
      localStorage.setItem("usuario", JSON.stringify(data));
      
      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Error de red o del servidor");
    }
  };

  const handleRegistro = () => {
    navigate("/registro");
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo ClothesFever" className="logo" />
      </div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Correo:</label>
          <input
            type="email"
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
