import React, { useState, useRef } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiSave, FiAlertCircle, FiEdit } from "react-icons/fi";
import "../styles/Admin.css";
import "../styles/Perfil.css";

const Perfil = () => {
  // Datos iniciales del usuario
  const [usuario, setUsuario] = useState({
    nombre: "María García",
    email: "maria@clothesfever.com",
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
    // Aquí iría la llamada a la API para guardar los cambios
    console.log("Guardando cambios:", usuario);
    
    // Actualizar el estado con los nuevos datos
    if (fotoPreview) {
      setUsuario(prev => ({ ...prev, foto: fotoPreview }));
      setFotoPreview(null);
    }
    
    setEditando(false);
    setCambiosPendientes(false);
    setDatosOriginales(null);
    
    // Mostrar notificación de éxito
    alert("Los cambios se han guardado correctamente");
  };

  // Función para cancelar la edición
  const handleCancelar = () => {
    // Restaurar datos originales
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
        
        {editando ? (
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
        ) : (
          <button className="btn-editar" onClick={activarEdicion}>
            <FiEdit /> Editar Perfil
          </button>
        )}
      </div>

      <div className={`perfil-content ${editando ? 'editing' : ''}`}>
        {editando && cambiosPendientes && (
          <div className="cambios-pendientes-notice">
            <FiAlertCircle />
            <span>Tienes cambios sin guardar</span>
          </div>
        )}
        
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
        </div>

        <div className="datos-perfil">
          <div className="campo-perfil">
            <label className={editando ? 'editing-mode' : ''}>
              <FiUser /> Nombre Completo
            </label>
            {editando ? (
              <input
                type="text"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                className="input-perfil"
                placeholder="Ingresa tu nombre completo"
              />
            ) : (
              <p>{usuario.nombre}</p>
            )}
          </div>

          <div className="campo-perfil">
            <label className={editando ? 'editing-mode' : ''}>
              <FiMail /> Correo Electrónico
            </label>
            {editando ? (
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                className="input-perfil"
                placeholder="Ingresa tu correo electrónico"
              />
            ) : (
              <p>{usuario.email}</p>
            )}
          </div>

          <div className="campo-perfil">
            <label className={editando ? 'editing-mode' : ''}>
              <FiPhone /> Teléfono
            </label>
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
              <p>{usuario.telefono}</p>
            )}
          </div>

          <div className="campo-perfil">
            <label className={editando ? 'editing-mode' : ''}>
              <FiMapPin /> Dirección
            </label>
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
              <p>{usuario.direccion}</p>
            )}
          </div>

          <div className="campo-perfil">
            <label>Puesto</label>
            <p>{usuario.puesto}</p>
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
  );
};

export default Perfil;