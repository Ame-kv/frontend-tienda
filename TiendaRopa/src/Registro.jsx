import React, { useState } from "react";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de registro exitoso
    setRegistroExitoso(true);
    // Limpiar el formulario
    setNombre("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h2>Registro</h2>
      {registroExitoso ? (
        <p>Registro exitoso!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
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