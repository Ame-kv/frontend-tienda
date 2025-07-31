import React, { useState } from "react";
import "./style.css";
import logo from "./assets/logo.jpeg";
import LoginGoogle from "./components/LoginGoogle"; //Importa el botón de Google

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

  // Maneja el login con Google
  const handleLoginSuccess = async (user) => {
    console.log("Usuario autenticado con Google:", user);

    // Ejemplo: Guardar usuario en tu backend (opcional)
    try {
      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: user.displayName,
          correo: user.email,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(data.mensaje || "Error al registrar con Google");
      } else {
        setRegistroExitoso(true);
        setError("");
      }
    } catch (err) {
      console.error("Error de red al registrar con Google:", err);
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
        <>
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

          <div className="divider" style={{ margin: "20px 0", textAlign: "center" }}>
            <hr />
            <span style={{ background: "#fff", padding: "0 10px" }}>o</span>
          </div>

          {/* Login con Google */}
          <LoginGoogle onLoginSuccess={handleLoginSuccess} />
        </>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Registro;
