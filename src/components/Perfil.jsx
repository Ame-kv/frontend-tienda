import React, { useState, useRef } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiSave } from "react-icons/fi";
import "../styles/Admin.css";

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
  const fileInputRef = useRef(null);

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
    
    // Mostrar notificación de éxito
    alert("Los cambios se han guardado correctamente");
  };

  // Función para cancelar la edición
  const handleCancelar = () => {
    setEditando(false);
    setFotoPreview(null);
    setCambiosPendientes(false);
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
          <button className="btn-editar" onClick={() => setEditando(true)}>
            Editar Perfil
          </button>
        )}
      </div>

      <div className="perfil-content">
        <div className="foto-perfil-container">
          <div className="foto-perfil-wrapper">
            <img 
              src={fotoPreview || usuario.foto} 
              alt="Foto de perfil" 
              className="foto-perfil"
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
            <p className="foto-instructions">Haz clic en la cámara para cambiar tu foto</p>
          )}
        </div>

        <div className="datos-perfil">
          <div className="campo-perfil">
            <label><FiUser /> Nombre Completo</label>
            {editando ? (
              <input
                type="text"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                className="input-perfil"
              />
            ) : (
              <p>{usuario.nombre}</p>
            )}
          </div>

          <div className="campo-perfil">
            <label><FiMail /> Correo Electrónico</label>
            {editando ? (
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                className="input-perfil"
              />
            ) : (
              <p>{usuario.email}</p>
            )}
          </div>

          <div className="campo-perfil">
            <label><FiPhone /> Teléfono</label>
            {editando ? (
              <input
                type="tel"
                name="telefono"
                value={usuario.telefono}
                onChange={handleChange}
                className="input-perfil"
              />
            ) : (
              <p>{usuario.telefono}</p>
            )}
          </div>

          <div className="campo-perfil">
            <label><FiMapPin /> Dirección</label>
            {editando ? (
              <textarea
                name="direccion"
                value={usuario.direccion}
                onChange={handleChange}
                className="input-perfil textarea-perfil"
                rows="3"
              />
            ) : (
              <p>{usuario.direccion}</p>
            )}
          </div>

          <div className="campo-perfil">
            <label>Puesto</label>
            <p>{usuario.puesto}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;