import React, { useState, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import Carrito from "./Carrito";
import Pago from "./Pago";

const CarritoYPago = () => {
  const { cartItems, setCartItems } = useContext(CarritoContext);
  const [mostrarPago, setMostrarPago] = useState(false);

  const handleProceedToPago = () => {
    console.log("Proceder a pago clickeado");
    setMostrarPago(true);
  };

  const handleBackFromPago = () => {
    console.log("Volviendo al carrito");
    setMostrarPago(false);
  };

  const handleBackFromCarrito = () => {
    console.log("Volver a la tienda o dashboard");
    // Aquí puedes usar navegación o cualquier lógica para regresar
  };

  return (
    <>
      {!mostrarPago ? (
        <Carrito
          cartItems={cartItems}
          setCartItems={setCartItems}
          onProceedToPago={handleProceedToPago} // Usar función con console.log
          onBack={handleBackFromCarrito}
        />
      ) : (
        <Pago
          cartItems={cartItems}
          onBack={handleBackFromPago} // Volver al carrito
        />
      )}
    </>
  );
};

export default CarritoYPago;
