import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === "admin" && contrasena === "12345") {
      // Inicio de sesión exitoso
      navigate("/registro"); // Redirige a la página de registro (sin la extensión)
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const handleRegistro = () => {
    navigate("/registro"); // Redirige a la página de registro (sin la extensión)
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleRegistro}>Ir a Registro</button> {/* Botón de registro */}
    </div>
  );
}

export default Login;