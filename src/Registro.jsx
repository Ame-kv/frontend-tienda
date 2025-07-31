import React, { useState } from "react";
import "./style.css";
import logo from "./assets/logo.jpeg";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          correo: email,
          contraseña: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.mensaje || "Error al registrar");
        setRegistroExitoso(false);
        return;
      }

      setRegistroExitoso(true);
      setError("");
      setNombre("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Error de red o del servidor");
      setRegistroExitoso(false);
    }
  };

  return (
    <div className="registro-container">
      <div className="logo-container">
        <img src={logo} alt="Logo ClothesFever" className="logo" />
      </div>
      <h2>Registro</h2>
      {registroExitoso ? (
        <p className="success-message">¡Registro exitoso!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Registro;
