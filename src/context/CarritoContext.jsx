import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const userId = "usuarioEjemplo"; // Cambia esto según tu sistema de auth

  // Cargar carrito desde backend al montar
  useEffect(() => {
    fetch(`${API_URL}/api/carrito/${userId}`)
      .then(res => res.json())
      .then(data => {
        setCartItems(data.items || []);
      })
      .catch(console.error);
  }, []);

  // Aquí podrías agregar funciones para modificar carrito (agregar, eliminar, etc)
  // Pero al menos exportamos estado y setter para usarlos en componentes

  return (
    <CarritoContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CarritoContext.Provider>
  );
};
