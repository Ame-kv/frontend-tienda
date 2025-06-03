import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Pago.css";

const Pago = ({ cartItems, onBack }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    codigoPostal: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const [guardarInfo, setGuardarInfo] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [metodoPago, setMetodoPago] = useState("tarjeta"); // tarjeta | oxxo | confirmado

  const total = cartItems.reduce((sum, item) => sum + item.precio, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPagoExitoso(true);
  };

  const handleVolver = () => {
    setPagoExitoso(false);
    setMetodoPago("tarjeta");
    onBack();
  };

  const handleMetodoAlternativo = () => {
    setMetodoPago("oxxo");
  };

  const handleConfirmarOxxo = () => {
    setMetodoPago("confirmado");
    setPagoExitoso(true);
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className={`pago-container-compact ${pagoExitoso ? 'pago-exitoso-container' : ''}`}>
      <h2 className="titulo-pago">{pagoExitoso ? 'Pago Exitoso' : 'Proceder al Pago'}</h2>

      {pagoExitoso ? (
        <div className="mensaje-exito-pago">
          <div className="icono-exito-pago">✓</div>
          {metodoPago === "confirmado" ? (
            <>
              <p className="texto-exito-pago">¡Has elegido pagar en <strong>OXXO</strong>!</p>
              <p className="texto-exito-pago">Tu referencia de pago es: <strong>1234-5678-9012</strong></p>
              <p className="texto-exito-pago">Presenta este número en caja y paga <strong>${total.toFixed(2)}</strong></p>
            </>
          ) : (
            <>
              <p className="texto-exito-pago">¡Tu pago de <strong>${total.toFixed(2)}</strong> ha sido procesado con éxito!</p>
              <p className="texto-exito-pago">Recibirás un correo electrónico con los detalles de tu compra.</p>
            </>
          )}
          <button className="btn-volver-pedido" onClick={handleVolver}>Volver al Pedido</button>
        </div>
      ) : metodoPago === "oxxo" ? (
        <div className="oxxo-pago-info">
          <h4>Pago en OXXO</h4>
          <p>Podrás pagar en efectivo en cualquier tienda OXXO presentando una referencia.</p>
          <p>Monto a pagar: <strong>${total.toFixed(2)}</strong></p>
          <button className="btn-confirmar-oxxo" onClick={handleConfirmarOxxo}>
            Confirmar Pago en OXXO
          </button>
          <button className="btn-volver" onClick={() => setMetodoPago("tarjeta")}>
            Volver al Pago con Tarjeta
          </button>
        </div>
      ) : (
        <div className="pago-content-compact">
          {/* RESUMEN Y FORMULARIO */}
          <div className="resumen-compact">
            <h3>Tu Pedido</h3>
            <div className="productos-imagenes">
              {cartItems.map(item => (
                <div key={item.id} className="producto-imagen-container">
                  <img
                    src={item.imagen || 'https://via.placeholder.com/80'}
                    alt={item.nombre}
                    className="producto-imagen"
                  />
                </div>
              ))}
            </div>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <span>{item.nombre}</span>
                  <span>${item.precio.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="total-compact">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="formulario-compact">
            <div className="seccion-form">
              <h3>Información Personal</h3>
              <div className="form-group-compact">
                <input type="text" name="nombre" placeholder="Nombre Completo" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div className="form-group-compact">
                <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group-compact">
                <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
              </div>
            </div>

            <div className="seccion-form">
              <h3>Dirección</h3>
              <div className="form-group-compact">
                <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
              </div>
              <div className="form-group-compact">
                <input type="text" name="codigoPostal" placeholder="Código Postal" value={formData.codigoPostal} onChange={handleChange} required />
              </div>
            </div>

            <div className="seccion-form">
              <h3>Información de Pago</h3>
              <div className="tarjeta-visual-compact">
                <div className="tipo-tarjeta">VISA</div>
                <div className="numero-tarjeta">{formData.cardNumber || "•••• •••• •••• ••••"}</div>
                <div className="tarjeta-inferior">
                  <span className="fecha-expiracion">{formData.expiryDate || "MM/AA"}</span>
                  <span className="cvv">{formData.cvv || "CVC"}</span>
                </div>
              </div>

              <div className="form-group-compact">
                <input type="text" name="cardNumber" placeholder="Número de Tarjeta" value={formData.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value.replace(/\D/g, ''));
                    setFormData({ ...formData, cardNumber: formatted });
                  }}
                  maxLength="19" required
                />
              </div>

              <div className="grupo-doble">
                <div className="form-group-compact">
                  <input type="text" name="expiryDate" placeholder="MM/AA" value={formData.expiryDate}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      let formatted = value;
                      if (value.length > 2) {
                        formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                      }
                      setFormData({ ...formData, expiryDate: formatted });
                    }}
                    maxLength="5" required
                  />
                </div>
                <div className="form-group-compact">
                  <input type="text" name="cvv" placeholder="CVC" value={formData.cvv}
                    onChange={(e) => {
                      setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) });
                    }}
                    maxLength="3" required
                  />
                </div>
              </div>
            </div>

            <div className="opcion-guardar">
              <label>
                <input type="checkbox" checked={guardarInfo} onChange={() => setGuardarInfo(!guardarInfo)} />
                Guardar información para futuros pagos
              </label>
            </div>

            <button type="submit" className="btn-pagar-compact" disabled={pagoExitoso}>
              Pagar ${total.toFixed(2)}
            </button>

            <button type="button" className="btn-otro-metodo" onClick={handleMetodoAlternativo}>
              Elegir otro método de pago
            </button>

            <button type="button" className="btn-cancelar-compra" onClick={handleVolver}>
              Cancelar Compra
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Pago;

