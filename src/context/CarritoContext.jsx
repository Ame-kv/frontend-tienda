import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const getUserId = () => localStorage.getItem("userId") || "688b2cd326dcdb2466dc5c66";

  // Normaliza los items que vienen del backend
  const normalizeResponseItems = (items = []) =>
    items
      .filter(item => item.producto)
      .map(item => {
        const prod = item.producto;
        return {
          id: prod._id,
          nombre: prod.nombre,
          precio: prod.precio,
          imagen: prod.imagen,
          talla: item.talla,
          quantity: item.cantidad,
        };
      });

  // Cargar carrito al entrar
  const fetchCart = async () => {
    try {
      const userId = getUserId();
      const res = await fetch(`${API_URL}/api/carrito/${userId}`);

      if (!res.ok) return;

      const data = await res.json();
      setCartItems(normalizeResponseItems(data.items));
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  //  AGREGAR AL CARRITO (CORRECTO)
  const agregarAlCarrito = async (productoId, talla = "S", cantidad = 1) => {
    try {
      const userId = getUserId();
      const payload = { productoId, talla, cantidad };

      const res = await fetch(`${API_URL}/api/carrito/${userId}/agregar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error agregando al carrito: ${text}`);
      }

      const data = await res.json();
      const nuevosItems = normalizeResponseItems(data.items);
      setCartItems(nuevosItems);

      return nuevosItems;

    } catch (err) {
      console.error("Error agregando al carrito:", err);
      throw err;
    }
  };

  return (
    <CarritoContext.Provider value={{ cartItems, setCartItems, agregarAlCarrito, fetchCart }}>
      {children}
    </CarritoContext.Provider>
  );
};
