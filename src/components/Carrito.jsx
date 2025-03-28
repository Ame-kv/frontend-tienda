import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Carrito.css";

const Carrito = ({ cartItems, onProceedToPago }) => {
  const total = cartItems.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>

      {/* Seleccionar todos y borrar */}
      <div className="carrito-acciones">
        <label>
          <input type="checkbox" /> Seleccionar todos los artículos
        </label>
        <button className="btn-borrar">Borrar artículos seleccionados</button>
      </div>

      {/* Lista de productos en el carrito */}
      <div className="carrito-list">
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="carrito-item">
              <div className="carrito-item-checkbox">
                <input type="checkbox" />
              </div>
              <img
                src={item.imagen}
                alt={item.nombre}
                className="carrito-item-image"
              />
              <div className="carrito-item-details">
                <h3>{item.nombre}</h3>
                <p>Talla: {item.talla}</p>
                <p className="carrito-item-price">${item.precio.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resumen del Pedido */}
      <div className="carrito-resumen">
        <h3>Resumen</h3>
        <div className="resumen-detalle">
          <p>
            <strong>Subtotal:</strong> ${total.toFixed(2)}
          </p>
          <p>
            <strong>Envío:</strong> $5.00
          </p>
          <p>
            <strong>Estimación total:</strong> ${(total + 5).toFixed(2)}
          </p>
        </div>
        <button className="btn-proceder-pago" onClick={onProceedToPago}>
          Continuar ({cartItems.length})
        </button>
      </div>

      {/* Promociones y garantías */}
      <div className="carrito-promociones">
        <p>
          <strong>Promo Aniversario:</strong> Termina el 26 de marzo, 23:59 (CT)
        </p>
        <p>
          Para ahorrar $80.00 en gastos de envío, compra $6.00 más.
        </p>
      </div>

      {/* Garantías y seguridad */}
      <div className="carrito-garantias">
        <p>
          <strong>Garantías:</strong>
        </p>
        <ul>
          <li>Reembolso por pérdida del paquete ✓</li>
          <li>Reembolso por artículos dañados ✓</li>
          <li>Reembolso si no llega en 45 días ✓</li>
        </ul>
        <p>
          <strong>Seguridad & Privacidad:</strong> Pagos seguros - Datos personales seguros.
        </p>
      </div>
    </div>
  );
};

export default Carrito;