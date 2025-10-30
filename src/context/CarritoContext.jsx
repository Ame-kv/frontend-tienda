import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const userId = "688b2cd326dcdb2466dc5c66"; // Reemplaza por el ID real del usuario logueado

  // Cargar carrito desde backend al montar
  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const res = await fetch(`${API_URL}/api/carrito/${userId}`);
        if (!res.ok) throw new Error("Error al obtener carrito");
        const data = await res.json();

        // Mapear items para que tengan la propiedad 'quantity'
        const itemsMapeados = data.items.map(item => ({
          ...item,
          quantity: item.cantidad || 1
        }));

        setCartItems(itemsMapeados);
      } catch (err) {
        console.error("Error al cargar carrito:", err);
      }
    };

    cargarCarrito();
  }, [API_URL, userId]);

  // Función para agregar o actualizar producto en el carrito
  const agregarAlCarrito = async (productoId, talla, cantidad) => {
    try {
      const res = await fetch(`${API_URL}/api/carrito/${userId}/agregar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productoId, talla, cantidad }),
      });

      const data = await res.json();

      if (res.ok) {
        // Mapear items para mantener quantity
        const itemsMapeados = data.items.map(item => ({
          id: item.productoId._id,
          nombre: item.productoId.nombre,
          precio: item.productoId.precio,
          imagen: item.productoId.imagen,
          talla: item.talla,
          quantity: item.cantidad
        }));

        setCartItems(itemsMapeados);
        return { success: true };
      } else {
        return { success: false, message: data.error || "Error desconocido" };
      }
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      return { success: false, message: "Error de red" };
    }
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = async (productoId) => {
    try {
      const res = await fetch(`${API_URL}/api/carrito/${userId}/${productoId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        const itemsMapeados = data.items.map(item => ({
          id: item.productoId._id,
          nombre: item.productoId.nombre,
          precio: item.productoId.precio,
          imagen: item.productoId.imagen,
          talla: item.talla,
          quantity: item.cantidad
        }));

        setCartItems(itemsMapeados);
        return { success: true };
      } else {
        return { success: false, message: data.error || "Error desconocido" };
      }
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      return { success: false, message: "Error de red" };
    }
  };

  return (
    <CarritoContext.Provider value={{ cartItems, setCartItems, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
