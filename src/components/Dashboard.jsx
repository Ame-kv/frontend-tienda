import React, { useState } from "react";
import "../styles/Dashboard.css";
import Carrito from "./Carrito";
import Pago from "./Pago";
import { FaShoppingCart, FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [prendaSeleccionada, setPrendaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCarrito, setShowCarrito] = useState(false);
  const [showPago, setShowPago] = useState(false);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
  const [addToCartMessage, setAddToCartMessage] = useState("");
  const navigate = useNavigate();

  const prendas = [
    {
      id: 1,
      nombre: "Crop Top con Estampado de Planeta",
      imagen: "/imagenes/blusa2.jpg",
      descripcion: "Crop top negro con estampado de planeta y estrellas.",
      precio: 60.00,
    },
    {
      id: 2,
      nombre: "Blusa a los hombros",
      imagen: "/imagenes/blusa.jpg",
      descripcion: "blusa floreada, color crema.",
      precio: 130.00,
    },
    {
      id: 3,
      nombre: "Conjunto",
      imagen: "/imagenes/ropa.jpg",
      descripcion: "conjunto de blusa y short azul.",
      precio: 250.00,
    },
    {
      id: 4,
      nombre: "Súeter",
      imagen: "/imagenes/sueter.jpg",
      descripcion: "sueter floreado estilo crochet.",
      precio: 150.00,
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
    setAddToCartMessage(`${prendaSeleccionada.nombre} (Talla: ${tallaSeleccionada}) ha sido agregado al carrito.`);
    setShowAddToCartMessage(true);
    setTimeout(() => {
      setShowAddToCartMessage(false);
    }, 3000); // El mensaje desaparece después de 3 segundos
    // No resetear prendaSeleccionada y tallaSeleccionada aquí para mantener la vista
    // setPrendaSeleccionada(null);
    // setTallaSeleccionada(null);
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

  const goToAdmin = () => {
    navigate('/admin');
  };

  const prendasFiltradas = prendas.filter((prenda) =>
    prenda.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Barra superior con botones - Solo visible cuando NO está en carrito/pago */}
      {!showCarrito && !showPago && (
        <div className="dashboard-header">
          <h1>¡Bienvenido a ClothesFever!</h1>
          <div className="dashboard-buttons">
            <button className="btn-carrito" onClick={toggleCarrito}>
              <FaShoppingCart />
              <span className="carrito-count">{cartItems.length}</span>
            </button>
            <button className="btn-admin" onClick={goToAdmin}>
              <FaUserCog /> Admin
            </button>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      {/* Barra de búsqueda - Solo visible en la vista principal de las prendas */}
      {!prendaSeleccionada && !showCarrito && !showPago && (
        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar prendas..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      )}

      {/* Vista de detalles de la prenda */}
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
              {["XS", "M", "L", "XL"].map((talla) => (
                <label
                  key={talla}
                  className={`talla-button btn btn-outline-secondary ${
                    tallaSeleccionada === talla ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="talla"
                    value={talla}
                    checked={tallaSeleccionada === talla}
                    onChange={() => seleccionarTalla(talla)}
                    className="d-none"
                  />
                  {talla}
                </label>
              ))}
            </div>
            <button className="btn btn-primary mt-3" onClick={agregarAlCarrito}>
              Agregar al Carrito
            </button>
            <button className="btn btn-secondary mt-2" onClick={regresarALista}>
              Regresar a la Lista
            </button>

            {/* Mensaje de agregar al carrito - AHORA DENTRO DE LOS DETALLES */}
            {showAddToCartMessage && (
              <div className="add-to-cart-message-details">
                {addToCartMessage}
              </div>
            )}

          </div>
        </div>
      ) : showCarrito ? (
        <Carrito
          cartItems={cartItems}
          onProceedToPago={handleProceedToPago}
          onBack={() => setShowCarrito(false)}
        />
      ) : showPago ? (
        <Pago cartItems={cartItems} onBack={handleBackFromPago} />
      ) : (
        <div className="prendas-lista row justify-content-center">
          {prendasFiltradas.map((prenda) => (
            <div
              key={prenda.id}
              className="col-md-3 mb-4"
              onClick={() => seleccionarPrenda(prenda)}
            >
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
    </div>
  );
}

export default Dashboard;