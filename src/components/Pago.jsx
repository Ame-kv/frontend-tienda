import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Pago.css";

const Pago = ({ cartItems, onBack }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [guardarInfo, setGuardarInfo] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.precio, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para procesar el pago
    alert(`Pago procesado por un total de $${total.toFixed(2)}`);
    onBack(); // Regresar a la vista anterior después del pago
  };

  return (
    <div className="pago-container">
      <h2>Proceder al Pago</h2>
      <div className="pago-content">
        {/* Resumen del Pedido */}
        <div className="resumen-pedido">
          <h3>Resumen del Pedido</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.nombre} - ${item.precio.toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="resumen-total">
            <p>
              <strong>Total a pagar:</strong> ${total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Formulario de Pago */}
        <form onSubmit={handleSubmit} className="pago-form">
          {/* Nombre */}
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre Completo"
              required
            />
          </div>

          {/* Dirección */}
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Dirección"
              required
            />
          </div>

          {/* Teléfono */}
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Teléfono"
              required
            />
          </div>

          {/* Código Postal */}
          <div className="form-group">
            <label>Código Postal</label>
            <input
              type="text"
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
              placeholder="Código Postal"
              required
            />
          </div>

          {/* Correo Electrónico */}
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electrónico"
              required
            />
          </div>

          {/* Información de la Tarjeta */}
          <div className="form-group">
            <label>Información de la Tarjeta</label>
            <div className="credit-card-visual">
              <div className="card-front">
                <div className="card-logo">VISA</div>
                <div className="card-number">
                  {cardNumber || "**** **** **** ****"}
                </div>
                <div className="card-info">
                  <div className="card-expiry">{expiryDate || "MM/AA"}</div>
                </div>
              </div>
            </div>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 1234 1234 1234"
              maxLength="16"
              required
            />
            <div className="form-row">
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/AA"
                maxLength="5"
                required
              />
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVC"
                maxLength="3"
                required
              />
            </div>
          </div>

          {/* Guardar Información */}
          <div className="form-group guardar-info">
            <label>
              <input
                type="checkbox"
                checked={guardarInfo}
                onChange={(e) => setGuardarInfo(e.target.checked)}
              />
              Guardar la información para pagar más rápido la próxima vez
            </label>
          </div>

          {/* Botón de Pago */}
          <button type="submit" className="btn-pagar">
            Pagar ${total.toFixed(2)}
          </button>
        </form>
      </div>

      {/* Botón de Regresar */}
      <button className="btn-regresar" onClick={onBack}>
        Regresar
      </button>
    </div>
  );
};

export default Pago;