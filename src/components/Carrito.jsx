import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Carrito.css";
import { FaArrowLeft, FaTrash, FaPlus, FaMinus, FaLock } from "react-icons/fa";

const Carrito = ({ cartItems, onProceedToPago, onBack }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState(
    cartItems.map(item => ({ ...item, quantity: 1 }))
  );

  // Calcular totales
  const subtotal = items.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;
  const missingForFreeShipping = Math.max(0, 6 - subtotal);

  // Manejar selección de items
  const handleSelectAll = (e) => {
    setSelectedItems(e.target.checked ? items.map(item => item.id) : []);
  };

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Manejar cantidad de items
  const handleQuantityChange = (id, change) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change)
            }
          : item
      )
    );
  };

  // Eliminar items seleccionados
  const handleDeleteSelected = () => {
    setItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <button className="btn-regresar-carrito" onClick={onBack}>
          <FaArrowLeft /> Regresar a la tienda
        </button>
        <h2>Tu Carrito de Compras</h2>
        <div className="carrito-counter">{items.length} artículos</div>
      </div>

      {items.length > 0 ? (
        <>
          <div className="carrito-acciones">
            <label className="select-all">
              <input
                type="checkbox"
                checked={selectedItems.length === items.length && items.length > 0}
                onChange={handleSelectAll}
              />
              Seleccionar todos
            </label>
            <button
              className={`btn-borrar ${selectedItems.length === 0 ? 'disabled' : ''}`}
              onClick={handleDeleteSelected}
              disabled={selectedItems.length === 0}
            >
              <FaTrash /> Eliminar ({selectedItems.length})
            </button>
          </div>

          <div className="carrito-list">
            {items.map((item) => (
              <div key={item.id} className="carrito-item">
                <div className="carrito-item-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemSelect(item.id)}
                  />
                </div>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="carrito-item-image"
                />
                <div className="carrito-item-details">
                  <h3>{item.nombre}</h3>
                  <p className="carrito-item-meta">
                    <span>Talla: {item.talla}</span>
                    <span className="divider">•</span>
                    <span>Color: Negro</span>
                  </p>
                  <div className="quantity-selector">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div className="carrito-item-price">
                  ${(item.precio * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <h3>Resumen de compra</h3>
            <div className="resumen-detalle">
              <div className="resumen-row">
                <span>Subtotal ({items.length} artículos)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="resumen-row">
                <span>Envío</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              {missingForFreeShipping > 0 && (
                <div className="shipping-promo">
                  <span>¡Faltan ${missingForFreeShipping.toFixed(2)} para envío gratis!</span>
                </div>
              )}
              <div className="resumen-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn-proceder-pago" onClick={onProceedToPago}>
              <FaLock /> Proceder al pago
            </button>
            <p className="secure-checkout">
              <FaLock /> Pago seguro cifrado SSL
            </p>
            {/* Nuevo botón "Seguir Comprando" */}
            <button className="btn-seguir-comprando-carrito" onClick={onBack}>
              Seguir comprando
            </button>
          </div>

          <div className="carrito-promociones">
            <h4>Ofertas especiales</h4>
            <div className="promo-item">
              <span className="promo-badge">🔥 Hot</span>
              <p>
                <strong>Termina el 19 de junio:</strong> Gasta $6 más y obtén envío gratis
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="carrito-vacio">
          <img src="/imagenes/102661.png" alt="Carrito vacío" />
          <h3>Tu carrito está vacío</h3>
          <p>Parece que no has agregado ningún producto aún</p>
          <button className="btn-seguir-comprando" onClick={onBack}>
            Seguir comprando
          </button>
        </div>
      )}

      <div className="carrito-garantias">
        <h4>Compra con confianza</h4>
        <ul>
          <li>
            <span className="guarantee-icon">✓</span>
            <span>Devoluciones fáciles en 30 días</span>
          </li>
          <li>
            <span className="guarantee-icon">✓</span>
            <span>Garantía del producto de 1 año</span>
          </li>
          <li>
            <span className="guarantee-icon">✓</span>
            <span>Pagos 100% seguros</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Carrito;