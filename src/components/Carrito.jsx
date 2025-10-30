import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Carrito.css";
import { FaArrowLeft, FaTrash, FaPlus, FaMinus, FaLock } from "react-icons/fa";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = ({ onProceedToPago, onBack }) => {
  const { cartItems, setCartItems, agregarAlCarrito } = useContext(CarritoContext);
  const [selectedItems, setSelectedItems] = useState([]);

  // Sincronizar cantidades locales
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(cartItems.map(item => ({
      ...item,
      quantity: item.cantidad || 1,
    })));
  }, [cartItems]);

  // Totales
  const subtotal = items.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  const shipping = 5.0;
  const total = subtotal + shipping;
  const missingForFreeShipping = Math.max(0, 6 - subtotal);

  // Selección de items
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

  // Cambiar cantidad de producto y sincronizar con backend
  const handleQuantityChange = async (item, change) => {
    const nuevaCantidad = Math.max(1, item.quantity + change);
    setItems(prev => prev.map(i =>
      i.id === item.id ? { ...i, quantity: nuevaCantidad } : i
    ));
    // Actualizar en backend
    await agregarAlCarrito(item.id, item.talla, nuevaCantidad);
  };

  // Eliminar un producto
  const eliminarProducto = async (itemId) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const userId = "688b2cd326dcdb2466dc5c66"; // mismo que en contexto
      const res = await fetch(`${API_URL}/api/carrito/${userId}/${itemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar producto");

      const data = await res.json();
      const nuevosItems = data.items
        .filter(item => item.productoId)
        .map(item => ({
          id: item.productoId._id,
          nombre: item.productoId.nombre,
          precio: item.productoId.precio,
          imagen: item.productoId.imagen,
          talla: item.talla,
          quantity: item.cantidad,
        }));

      setCartItems(nuevosItems);
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar seleccionados
  const handleDeleteSelected = () => {
    selectedItems.forEach(id => eliminarProducto(id));
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
                <img src={item.imagen} alt={item.nombre} className="carrito-item-image" />
                <div className="carrito-item-details">
                  <h3>{item.nombre}</h3>
                  <p className="carrito-item-meta">
                    <span>Talla: {item.talla}</span>
                    <span className="divider">•</span>
                    <span>Color: Negro</span>
                  </p>
                  <div className="quantity-selector">
                    <button
                      onClick={() => handleQuantityChange(item, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item, 1)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div className="carrito-item-price">
                  ${(item.precio * item.quantity).toFixed(2)}
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ marginLeft: '10px' }}
                  onClick={() => eliminarProducto(item.id)}
                >
                  <FaTrash /> Eliminar
                </button>
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
            <button className="btn-seguir-comprando-carrito" onClick={onBack}>
              Seguir comprando
            </button>
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
    </div>
  );
};

export default Carrito;
