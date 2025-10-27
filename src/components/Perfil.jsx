import React, { useState, useRef } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiSave, FiAlertCircle, FiEdit } from "react-icons/fi";
import "../styles/Admin.css";
import "../styles/Perfil.css";

const Perfil = () => {
  // Datos iniciales del usuario
  const [usuario, setUsuario] = useState({
    nombre: "Judith",
    email: "judith.cante20@gmail.com",
    telefono: "+52 55 1234 5678",
    direccion: "Av. Reforma 123, CDMX",
    puesto: "Administrador",
    foto: "/imagenes/avatar-default.jpg"
  });

  const [editando, setEditando] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [cambiosPendientes, setCambiosPendientes] = useState(false);
  const [datosOriginales, setDatosOriginales] = useState(null);
  const fileInputRef = useRef(null);

  // Activar modo edición
  const activarEdicion = () => {
    setDatosOriginales({ ...usuario });
    setEditando(true);
  };

  // Manejar cambios en los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
    setCambiosPendientes(true);
  };

  // Manejar cambio de foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Máximo 5MB permitidos');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
        setCambiosPendientes(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para guardar los cambios
  const handleGuardar = () => {
    if (!usuario.nombre.trim()) {
      alert("El nombre completo es obligatorio");
      return;
    }

    if (!usuario.email.trim()) {
      alert("El correo electrónico es obligatorio");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario.email)) {
      alert("Por favor, ingresa un correo electrónico válido");
      return;
    }

    console.log("Guardando cambios:", usuario);
    
    setTimeout(() => {
      if (fotoPreview) {
        setUsuario(prev => ({ ...prev, foto: fotoPreview }));
        setFotoPreview(null);
      }
      
      setEditando(false);
      setCambiosPendientes(false);
      setDatosOriginales(null);
      alert("Los cambios se han guardado correctamente");
    }, 500);
  };

  // Función para cancelar la edición
  const handleCancelar = () => {
    if (cambiosPendientes) {
      const confirmar = window.confirm(
        "Tienes cambios sin guardar. ¿Estás seguro de que quieres cancelar?"
      );
      if (!confirmar) return;
    }
    
    if (datosOriginales) {
      setUsuario(datosOriginales);
    }
    setEditando(false);
    setFotoPreview(null);
    setCambiosPendientes(false);
    setDatosOriginales(null);
  };

  // Activar el input de archivo
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h2>Mi Perfil</h2>
        <p className="perfil-subtitle">Configuración de tu perfil</p>
      </div>

      <div className={`perfil-content ${editando ? 'editing' : ''}`}>
        {editando && cambiosPendientes && (
          <div className="cambios-pendientes-notice">
            <FiAlertCircle />
            <span>Tienes cambios sin guardar</span>
          </div>
        )}
        
        <div className="foto-perfil-section">
          <div className="foto-perfil-container">
            <div className={`foto-perfil-wrapper ${editando ? 'editing-mode' : ''}`}>
              <img 
                src={fotoPreview || usuario.foto} 
                alt="Foto de perfil" 
                className="foto-perfil"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRThFQ0VGIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iIzlBOTk5OSIvPjxwYXRoIGQ9Ik0zMCAxNjBDMzAgMTQ2Ljc0NSA0Ni43NDUgMTMwIDYwIDEzMEgxNDBDMTUzLjI1NSAxMzAgMTcwIDE0Ni43NDUgMTcwIDE2MFYxNzBIMzBWMTYwWiIgZmlsbD0iIzlBOTk5OSIvPgo8L3N2Zz4K';
                }}
              />
              {editando && (
                <button className="btn-cambiar-foto" onClick={triggerFileInput}>
                  <FiCamera />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFotoChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            {editando && (
              <p className="foto-instructions">Haz clic en la cámara para cambiar tu foto de perfil</p>
            )}
            
            {!editando && (
              <div className="boton-editar-container">
                <button className="btn-editar" onClick={activarEdicion}>
                  <FiEdit /> Editar Información
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="datos-perfil-section">
          <div className="datos-perfil">
            {editando ? (
              <div className="perfil-botones-header">
                <div className="perfil-botones">
                  <button 
                    className={`btn-guardar ${!cambiosPendientes ? 'disabled' : ''}`} 
                    onClick={handleGuardar}
                    disabled={!cambiosPendientes}
                  >
                    <FiSave /> Guardar Cambios
                  </button>
                  <button className="btn-cancelar" onClick={handleCancelar}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : null}

            <div className="campos-perfil-grid">
              <div className="campo-perfil">
                <label className={editando ? 'editing-mode' : ''}>
                  <FiUser /> Nombre Completo
                </label>
                <div className="campo-input-wrapper">
                  {editando ? (
                    <input
                      type="text"
                      name="nombre"
                      value={usuario.nombre}
                      onChange={handleChange}
                      className="input-perfil"
                      placeholder="Ingresa tu nombre completo"
                      required
                    />
                  ) : (
                    <div className="campo-texto">{usuario.nombre}</div>
                  )}
                </div>
              </div>

              <div className="campo-perfil">
                <label className={editando ? 'editing-mode' : ''}>
                  <FiMail /> Correo Electrónico
                </label>
                <div className="campo-input-wrapper">
                  {editando ? (
                    <input
                      type="email"
                      name="email"
                      value={usuario.email}
                      onChange={handleChange}
                      className="input-perfil"
                      placeholder="Ingresa tu correo electrónico"
                      required
                    />
                  ) : (
                    <div className="campo-texto">{usuario.email}</div>
                  )}
                </div>
              </div>

              <div className="campo-perfil">
                <label className={editando ? 'editing-mode' : ''}>
                  <FiPhone /> Teléfono
                </label>
                <div className="campo-input-wrapper">
                  {editando ? (
                    <input
                      type="tel"
                      name="telefono"
                      value={usuario.telefono}
                      onChange={handleChange}
                      className="input-perfil"
                      placeholder="Ingresa tu número de teléfono"
                    />
                  ) : (
                    <div className="campo-texto">{usuario.telefono}</div>
                  )}
                </div>
              </div>

              <div className="campo-perfil">
                <label className={editando ? 'editing-mode' : ''}>
                  <FiMapPin /> Dirección
                </label>
                <div className="campo-input-wrapper">
                  {editando ? (
                    <textarea
                      name="direccion"
                      value={usuario.direccion}
                      onChange={handleChange}
                      className="input-perfil textarea-perfil"
                      rows="3"
                      placeholder="Ingresa tu dirección completa"
                    />
                  ) : (
                    <div className="campo-texto">{usuario.direccion}</div>
                  )}
                </div>
              </div>

              <div className="campo-perfil">
                <label>Puesto</label>
                <div className="campo-input-wrapper">
                  <div className="campo-texto puesto-texto">{usuario.puesto}</div>
                </div>
              </div>

              {editando && (
                <div className="campo-perfil">
                  <div className="editing-notice">
                    <p>
                      💡 Recuerda guardar los cambios cuando termines de editar
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;