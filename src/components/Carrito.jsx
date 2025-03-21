import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Carrito.css";

const Carrito = ({ cartItems, onRemoveItem, onProceedToPago }) => {
  const [selectedItems, setSelectedItems] = useState([]); // Estado para los artículos seleccionados

  // Función para manejar la selección/deselección de artículos
  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Función para seleccionar/deseleccionar todos los artículos
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]); // Deseleccionar todos
    } else {
      setSelectedItems(cartItems.map((item) => item.id)); // Seleccionar todos
    }
  };

  // Función para borrar los artículos seleccionados
  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      alert("No hay artículos seleccionados para borrar.");
      return;
    }
    onRemoveItem(selectedItems); // Llama a la función de eliminación
    setSelectedItems([]); // Limpia la selección
  };

  // Calcular el total de los artículos seleccionados
  const total = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.precio, 0);

  return (
    <div className="carrito-container">
      <h2>Cesta ({cartItems.length})</h2>

      {/* Seleccionar todos y borrar */}
      <div className="carrito-acciones">
        <label>
          <input
            type="checkbox"
            checked={selectedItems.length === cartItems.length && cartItems.length > 0}
            onChange={handleSelectAll}
          />
          Seleccionar todos los artículos
        </label>
        <button className="btn-borrar" onClick={handleDeleteSelected}>
          Borrar artículos seleccionados
        </button>
      </div>

      {/* Lista de productos en el carrito */}
      <div className="carrito-list">
        {cartItems.map((item) => (
          <div key={item.id} className="carrito-item">
            <div className="carrito-item-checkbox">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleSelectItem(item.id)}
              />
            </div>
            <img src={item.imagen} alt={item.nombre} className="carrito-item-image" />
            <div className="carrito-item-details">
              <h3>{item.nombre}</h3>
              <p>Talla: {item.talla}</p>
              <p className="carrito-item-price">${item.precio.toFixed(2)}</p>
              <button className="btn-eliminar" onClick={() => onRemoveItem([item.id])}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen del pedido */}
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
          Continuar ({selectedItems.length || cartItems.length})
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