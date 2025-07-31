import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const PrendaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prenda, setPrenda] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { agregarAlCarrito } = useContext(CarritoContext);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/api/prendas/${id}`)
      .then((res) => res.json())
      .then((data) => setPrenda(data))
      .catch((err) => console.error("Error al obtener la prenda:", err));
  }, [id]);

  const handleAgregarAlCarrito = async () => {
    if (!tallaSeleccionada) {
      setMensaje("Seleccione una talla");
      return;
    }

    const resultado = await agregarAlCarrito(prenda._id, tallaSeleccionada, 1);

    if (resultado.success) {
      setMensaje(`Agregaste la prenda con talla ${tallaSeleccionada}`);
    } else {
      setMensaje(`Error: ${resultado.message}`);
    }
  };

  if (!prenda) return <p className="text-center mt-5">Cargando prenda...</p>;

  const imagenSrc = prenda.imagen.startsWith("/")
    ? prenda.imagen
    : `/${prenda.imagen}`;

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}
    >
      <div className="bg-white rounded-4 p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-3">{prenda.nombre}</h2>

        <img
          src={imagenSrc}
          alt={prenda.nombre}
          className="img-fluid mx-auto d-block mb-3"
          style={{ maxHeight: "300px" }}
        />

        <p className="text-center">{prenda.descripcion}</p>
        <p className="text-center fw-semibold">Precio: ${prenda.precio}</p>

        <div className="d-flex justify-content-center gap-2 mb-3">
          {["XS", "S", "M", "L", "XL"].map((talla) => (
            <button
              key={talla}
              className={`btn ${
                tallaSeleccionada === talla ? "btn-secondary" : "btn-outline-secondary"
              }`}
              onClick={() => {
                setTallaSeleccionada(talla);
                setMensaje("");
              }}
            >
              {talla}
            </button>
          ))}
        </div>

        <button className="btn btn-primary w-100 mb-2" onClick={handleAgregarAlCarrito}>
          Agregar al Carrito
        </button>

        <button className="btn btn-danger w-100" onClick={() => navigate("/dashboard")}>
          Regresar a la Lista
        </button>

        {mensaje && <p className="text-danger text-center mt-2">{mensaje}</p>}
      </div>
    </div>
  );
};

export default PrendaDetalle;
