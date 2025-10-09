import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const userId = "6889c534a3c86fbe77ce6cd6"; // Deberías usar el ID real del usuario logueado

  // Cargar carrito desde backend al montar
  useEffect(() => {
    fetch(`${API_URL}/api/carrito/${userId}`)
      .then(res => res.json())
      .then(data => {
        setCartItems(data.items || []);
      })
      .catch(console.error);
  }, []);

  // Función para agregar al carrito
  const agregarAlCarrito = async (productoId, talla, cantidad) => {
    try {
      const res = await fetch(`${API_URL}/api/carrito/${userId}/agregar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productoId, talla, cantidad }),
      });

      const data = await res.json();

      if (res.ok) {
        // Opcional: actualizar carrito local con lo que responde el backend
        setCartItems(data.items || []);
        return { success: true };
      } else {
        return { success: false, message: data.error || "Error desconocido" };
      }
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      return { success: false, message: "Error de red" };
    }
  };

  return (
    <CarritoContext.Provider value={{ cartItems, setCartItems, agregarAlCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
