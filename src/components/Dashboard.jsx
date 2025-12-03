// Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Carrito from "./Carrito";

import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [prendas, setPrendas] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const { cartItems, setCartItems } = useContext(CarritoContext);
  const { user, requireAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  /* ================================
        ABRIR CARRITO
  ================================= */
  const handleOpenCarrito = () => {
    if (requireAuth()) setMostrarCarrito(true);
    else navigate("/login");
  };

  /* ================================
        CARGAR PRENDAS
  ================================= */
  useEffect(() => {
    fetch(`${API_URL}/api/prendas`)
      .then((res) => res.json())
      .then((data) => setPrendas(data))
      .catch((err) => console.error(err));
  }, []);

  /* ================================
        PAGO CON STRIPE
  ================================= */
  const handleStripePayment = async () => {
  try {
    const response = await fetch(`${API_URL}/api/payments/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems.map(item => ({
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.quantity,
        })),
      }),
    });

    const data = await response.json();

    if (!data.url) {
      console.error("Stripe no devolvió URL:", data);
      return;
    }

    window.location.href = data.url;

  } catch (error) {
    console.error("Error Stripe:", error);
  }
};


  return (
    <div className="container-fluid"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >

      {/* ================================
              HEADER
      ================================= */}
      <header
        className="py-3 border-bottom d-flex justify-content-between align-items-center"
        style={{ flexShrink: 0, backgroundColor: "white", zIndex: 10 }}
      >
        <h1 className="text-center m-0">ClothesFever</h1>

        <div className="d-flex align-items-center gap-3">
          {user && (
            <button
              onClick={() => navigate("/admin")}
              className="btn btn-outline-primary"
            >
              Panel Admin
            </button>
          )}

          <button
            onClick={handleOpenCarrito}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              background: "none",
              border: "none"
            }}
          >
            <FaShoppingCart /> <span>({cartItems.length})</span>
          </button>
        </div>
      </header>

      {/* ================================
              CONTENIDO
      ================================= */}
      {mostrarCarrito ? (
        <Carrito
          cartItems={cartItems}
          setCartItems={setCartItems}
          onBack={() => setMostrarCarrito(false)}
          onProceedToPago={handleStripePayment}
        />

      ) : (
        <div
          className="flex-grow-1 overflow-auto px-3"
          style={{ paddingBottom: "30px" }}
        >
          {/* ===== GRID DE PRENDAS ===== */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-2">
            {prendas.map((prenda, index) => (
              <div key={prenda._id + index} className="col">
                <Link
                  to={`/prenda/${prenda._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card h-100 shadow-sm">
                    <img
                      src={prenda.imagen}
                      className="card-img-top"
                      alt={prenda.nombre}
                      style={{ height: "250px", objectFit: "cover" }}
                    />

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{prenda.nombre}</h5>
                      <p className="card-text">{prenda.descripcion}</p>
                      <p className="card-text fw-bold">${prenda.precio}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* ===== FOOTER ===== */}
          <div
            className="text-center py-3"
            style={{ backgroundColor: "#f8f9fa", marginTop: "auto" }}
          >
            <p>
              Contacto para vendedores:{" "}
              <strong>amely@gmail.com</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
