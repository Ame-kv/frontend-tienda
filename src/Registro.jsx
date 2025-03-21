import React, { useState } from "react";
import "./style.css"; // Asegúrate de que tienes el style.css vinculado

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistroExitoso(true);
    setNombre("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="registro-container"> {/* Contenedor principal */}
      <h2>Registro</h2>
      {registroExitoso ? (
        <p className="success-message">Registro exitoso!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-container"> {/* Recuadro para Nombre */}
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="input-container"> {/* Recuadro para Email */}
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container"> {/* Recuadro para Contraseña */}
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
    </div>
  );
}

export default Registro;