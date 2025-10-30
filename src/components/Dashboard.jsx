import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FaShoppingCart } from "react-icons/fa";
import Carrito from "./Carrito";
import { CarritoContext } from "../context/CarritoContext";

const Dashboard = () => {
  const [prendas, setPrendas] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const { cartItems } = useContext(CarritoContext);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const navigate = useNavigate(); // ✅ Para navegar al panel admin

  useEffect(() => {
    fetch(`${API_URL}/api/prendas`)
      .then((res) => res.json())
      .then((data) => setPrendas(data))
      .catch((err) => console.error("Error al cargar las prendas:", err));
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <header
        className="py-3 border-bottom d-flex justify-content-between align-items-center"
        style={{ flexShrink: 0, backgroundColor: "white", zIndex: 10 }}
      >
        <h1 className="text-center m-0">ClothesFever</h1>

        <div className="d-flex align-items-center gap-3">
          {/* ✅ Mostrar el botón solo cuando el carrito NO está visible */}
          {!mostrarCarrito && (
            <button
              onClick={() => navigate("/admin")}
              className="btn btn-outline-primary"
              style={{ fontWeight: "bold" }}
            >
              Panel Admin
            </button>
          )}

          {/* Botón del carrito */}
          <button
            onClick={() => setMostrarCarrito(true)}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              background: "none",
              border: "none"
            }}
            aria-label="Ver carrito"
          >
            <FaShoppingCart />
            <span> ({cartItems.length})</span>
          </button>
        </div>
      </header>

      {mostrarCarrito ? (
        <Carrito
          cartItems={cartItems}
          onBack={() => setMostrarCarrito(false)}
          onProceedToPago={() => alert("Proceder al pago")}
        />
      ) : (
        <div
          className="flex-grow-1 overflow-auto px-3"
          style={{ paddingBottom: "30px" }}
        >
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-2">
            {prendas.map((prenda) => (
              <div key={prenda._id || prenda.id} className="col">
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;
