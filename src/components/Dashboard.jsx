import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import Carrito from "./Carrito";
import Pago from "./Pago";

function Dashboard() {
  const [prendaSeleccionada, setPrendaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCarrito, setShowCarrito] = useState(false);
  const [showPago, setShowPago] = useState(false);

  const prendas = [
    {
      id: 1,
      nombre: "Crop Top con Estampado de Planeta",
      imagen: "/imagenes/blusa2.jpg",
      descripcion: "Crop top negro con estampado de planeta y estrellas.",
      precio: 19.99,
    },
    {
      id: 2,
      nombre: "Blusa a los hombros",
      imagen: "/imagenes/blusa.jpg",
      descripcion: "blusa floreada, color crema.",
      precio: 19.99,
    },
    {
      id: 3,
      nombre: "Conjunto",
      imagen: "/imagenes/ropa.jpg",
      descripcion: "conjunto de blusa y short azul.",
      precio: 19.99,
    },
    {
      id: 4,
      nombre: "Súeter",
      imagen: "/imagenes/sueter.jpg",
      descripcion: "sueter floreado estilo crochet.",
      precio: 19.99,
    },
  ];

  const seleccionarPrenda = (prenda) => {
    setPrendaSeleccionada(prenda);
    setTallaSeleccionada(null);
  };

  const regresarALista = () => {
    setPrendaSeleccionada(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const seleccionarTalla = (talla) => {
    setTallaSeleccionada(talla);
  };

  const agregarAlCarrito = () => {
    if (!prendaSeleccionada || !tallaSeleccionada) {
      alert("Por favor, selecciona una prenda y una talla antes de agregar al carrito.");
      return;
    }
    const item = { ...prendaSeleccionada, talla: tallaSeleccionada };
    setCartItems([...cartItems, item]);
    alert(`${prendaSeleccionada.nombre} (Talla: ${tallaSeleccionada}) ha sido agregado al carrito.`);
    setPrendaSeleccionada(null);
    setTallaSeleccionada(null);
  };

  const eliminarDelCarrito = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleProceedToPago = () => {
    setShowCarrito(false);
    setShowPago(true);
  };

  const handleBackFromPago = () => {
    setShowPago(false);
    setShowCarrito(true);
  };

  const toggleCarrito = () => {
    setShowCarrito(!showCarrito);
    setShowPago(false);
  };

  const prendasFiltradas = prendas.filter((prenda) =>
    prenda.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container container">
      {!prendaSeleccionada && !showCarrito && !showPago && (
        <div className="text-center mb-4">
          <h1>¡Bienvenido a ClothesFever!</h1>
        </div>
      )}
      {!prendaSeleccionada && !showCarrito && !showPago && (
        <div className="search-bar mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar prendas..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      )}
      {prendaSeleccionada ? (
        <div className="prenda-detalles card">
          <div className="card-body">
            <h2 className="card-title">{prendaSeleccionada.nombre}</h2>
            <img
              src={prendaSeleccionada.imagen}
              alt={prendaSeleccionada.nombre}
              className="img-fluid"
            />
            <p className="card-text">{prendaSeleccionada.descripcion}</p>
            <p className="card-text">Precio: ${prendaSeleccionada.precio}</p>
            <div className="tallas-selector d-flex justify-content-center">
              <label className={`talla-button btn btn-outline-secondary ${tallaSeleccionada === "XS" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="talla"
                  value="XS"
                  checked={tallaSeleccionada === "XS"}
                  onChange={() => seleccionarTalla("XS")}
                  className="d-none"
                />
                XS
              </label>
              <label className={`talla-button btn btn-outline-secondary ${tallaSeleccionada === "M" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="talla"
                  value="M"
                  checked={tallaSeleccionada === "M"}
                  onChange={() => seleccionarTalla("M")}
                  className="d-none"
                />
                M
              </label>
              <label className={`talla-button btn btn-outline-secondary ${tallaSeleccionada === "L" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="talla"
                  value="L"
                  checked={tallaSeleccionada === "L"}
                  onChange={() => seleccionarTalla("L")}
                  className="d-none"
                />
                L
              </label>
              <label className={`talla-button btn btn-outline-secondary ${tallaSeleccionada === "XL" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="talla"
                  value="XL"
                  checked={tallaSeleccionada === "XL"}
                  onChange={() => seleccionarTalla("XL")}
                  className="d-none"
                />
                XL
              </label>
            </div>
            <button className="btn btn-primary mt-3" onClick={agregarAlCarrito}>
              Agregar al Carrito
            </button>
            <button className="btn btn-secondary mt-2" onClick={regresarALista}>
              Regresar a la Lista
            </button>
          </div>
        </div>
      ) : showCarrito ? (
        <Carrito
          cartItems={cartItems}
          onRemoveItem={eliminarDelCarrito}
          onProceedToPago={handleProceedToPago}
        />
      ) : showPago ? (
        <Pago cartItems={cartItems} onBack={handleBackFromPago} />
      ) : (
        <div className="prendas-lista row justify-content-center">
          {prendasFiltradas.map((prenda) => (
            <div key={prenda.id} className="col-md-3 mb-4" onClick={() => seleccionarPrenda(prenda)}>
              <div className="card h-100">
                <img
                  src={prenda.imagen}
                  className="card-img-top"
                  alt={prenda.nombre}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{prenda.nombre}</h5>
                  <p className="card-text">${prenda.precio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-info mt-3" onClick={toggleCarrito}>
        {showCarrito ? "Ver Catálogo" : "Ver Carrito"}
      </button>
    </div>
  );
}

export default Dashboard;