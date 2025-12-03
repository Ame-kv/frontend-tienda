// Carrito.jsx
import React, { useState, useEffect } from "react";

const Carrito = ({ cartItems, setCartItems, onBack, onProceedToPago }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  /* =================================
       NORMALIZAR ITEMS DEL CARRITO
  ================================== */
  const normalizeCartItems = (items) => {
    return items.map((item) => ({
      ...item,
      id: item.id || item._id,      // asegurar clave única
      quantity: item.quantity || 1, // asegurar cantidad
    }));
  };

  useEffect(() => {
    setCartItems((prev) => normalizeCartItems(prev));
  }, []);

  /* =================================
          CALCULAR TOTAL
  ================================== */
  const calcularTotal = () =>
    cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);

  /* =================================
          SELECCIONAR ITEMS
  ================================== */
  const toggleItemSelection = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  /* =================================
        ELIMINAR UN SOLO ITEM
  ================================== */
  const eliminarItem = async (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    const userId = item?.userId;
    if (!userId) return;

    try {
      await fetch(`${API_URL}/api/carrito/${userId}/eliminar/${itemId}`, {
        method: "DELETE",
      });
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Error al eliminar del carrito:", err);
    }
  };

  /* =================================
       ELIMINAR ITEMS SELECCIONADOS
  ================================== */
  const eliminarSeleccionados = async () => {
    if (selectedItems.length === 0) return;

    const promises = selectedItems.map((itemId) => eliminarItem(itemId));
    await Promise.all(promises);

    setSelectedItems([]);
  };

  /* =================================
       RENDERIZAR ITEMS DEL CARRITO
  ================================== */
  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={onBack}>
        Volver
      </button>

      <h2 className="text-center mb-4">Tu Carrito</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">El carrito está vacío.</p>
      ) : (
        <>
          <div className="text-end mb-2">
            <button className="btn btn-outline-dark btn-sm" onClick={toggleSelectAll}>
              Seleccionar Todo
            </button>
            <button
              className="btn btn-danger btn-sm ms-2"
              onClick={eliminarSeleccionados}
              disabled={selectedItems.length === 0}
            >
              Eliminar Seleccionados
            </button>
          </div>

          <div className="list-group mb-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                  />
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <div>
                    <h5 className="mb-1">{item.nombre}</h5>
                    <small>Talla: {item.talla || "Única"}</small>
                    <br />
                    <small>Cantidad: {item.quantity}</small>
                  </div>
                </div>

                <div className="text-end">
                  <p className="fw-bold mb-2">${item.precio}</p>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminarItem(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h4 className="text-end mb-3">Total: ${calcularTotal()}</h4>

          <div className="text-end">
            <button className="btn btn-success" onClick={onProceedToPago}>
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
