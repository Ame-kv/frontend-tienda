import React, { useState, useRef } from "react";
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCamera, 
  FiSave, 
  FiEdit2,
  FiLock,
  FiBell,
  FiShield,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX
} from "react-icons/fi";
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
  const [vistaActiva, setVistaActiva] = useState('informacion'); // 'informacion', 'seguridad', 'notificaciones'
  const [mostrarPassword, setMostrarPassword] = useState(false);
  
  // Estados para seguridad
  const [passwordActual, setPasswordActual] = useState('');
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  
  // Estados para notificaciones
  const [notificaciones, setNotificaciones] = useState({
    email: true,
    push: false,
    sms: true,
    promociones: false,
    novedades: true
  });

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

  // Manejar cambios en notificaciones
  const handleNotificacionChange = (tipo) => {
    setNotificaciones(prev => ({
      ...prev,
      [tipo]: !prev[tipo]
    }));
  };

  // Función para guardar los cambios
  const handleGuardar = () => {
    console.log("Guardando cambios:", usuario);
    
    if (fotoPreview) {
      setUsuario(prev => ({ ...prev, foto: fotoPreview }));
      setFotoPreview(null);
    }
    
    setEditando(false);
    setCambiosPendientes(false);
    alert("Los cambios se han guardado correctamente");
  };

  // Función para cancelar la edición
  const handleCancelar = () => {
    setEditando(false);
    setFotoPreview(null);
    setCambiosPendientes(false);
  };

  // Función para cambiar contraseña
  const handleCambiarPassword = () => {
    if (nuevoPassword !== confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    if (nuevoPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    // Aquí iría la llamada a la API para cambiar la contraseña
    console.log("Cambiando contraseña...");
    setPasswordActual('');
    setNuevoPassword('');
    setConfirmarPassword('');
    alert("Contraseña cambiada exitosamente");
  };

  // Activar el input de archivo
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Renderizar contenido según la vista activa
  const renderContenido = () => {
    switch (vistaActiva) {
      case 'informacion':
        return (
          <>
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
          </>
        );

      case 'seguridad':
        return (
          <div className="seguridad-container">
            <h3>Cambiar Contraseña</h3>
            <div className="campo-seguridad">
              <label>Contraseña Actual</label>
              <div className="password-input-container">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                  className="input-perfil"
                  placeholder="Ingresa tu contraseña actual"
                />
                <button 
                  type="button" 
                  className="btn-mostrar-password"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                  {mostrarPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="campo-seguridad">
              <label>Nueva Contraseña</label>
              <input
                type="password"
                value={nuevoPassword}
                onChange={(e) => setNuevoPassword(e.target.value)}
                className="input-perfil"
                placeholder="Ingresa tu nueva contraseña"
              />
            </div>

            <div className="campo-seguridad">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                className="input-perfil"
                placeholder="Confirma tu nueva contraseña"
              />
            </div>

            <button 
              className="btn-cambiar-password"
              onClick={handleCambiarPassword}
              disabled={!passwordActual || !nuevoPassword || !confirmarPassword}
            >
              <FiLock /> Cambiar Contraseña
            </button>

            <div className="consejos-seguridad">
              <h4>Consejos de Seguridad:</h4>
              <ul>
                <li>Usa una combinación de letras, números y símbolos</li>
                <li>No uses la misma contraseña en múltiples sitios</li>
                <li>Cambia tu contraseña regularmente</li>
              </ul>
            </div>
          </div>
        );

      case 'notificaciones':
        return (
          <div className="notificaciones-container">
            <h3>Preferencias de Notificación</h3>
            
            <div className="opcion-notificacion">
              <div className="opcion-info">
                <h4>Notificaciones por Email</h4>
                <p>Recibe actualizaciones importantes por correo electrónico</p>
              </div>
              <button 
                className={`toggle-btn ${notificaciones.email ? 'activo' : ''}`}
                onClick={() => handleNotificacionChange('email')}
              >
                {notificaciones.email ? <FiCheck /> : <FiX />}
              </button>
            </div>

            <div className="opcion-notificacion">
              <div className="opcion-info">
                <h4>Notificaciones Push</h4>
                <p>Recibe notificaciones en tiempo real en tu dispositivo</p>
              </div>
              <button 
                className={`toggle-btn ${notificaciones.push ? 'activo' : ''}`}
                onClick={() => handleNotificacionChange('push')}
              >
                {notificaciones.push ? <FiCheck /> : <FiX />}
              </button>
            </div>

            <div className="opcion-notificacion">
              <div className="opcion-info">
                <h4>Notificaciones SMS</h4>
                <p>Recibe alertas importantes por mensaje de texto</p>
              </div>
              <button 
                className={`toggle-btn ${notificaciones.sms ? 'activo' : ''}`}
                onClick={() => handleNotificacionChange('sms')}
              >
                {notificaciones.sms ? <FiCheck /> : <FiX />}
              </button>
            </div>

            <div className="opcion-notificacion">
              <div className="opcion-info">
                <h4>Promociones y Ofertas</h4>
                <p>Recibe información sobre descuentos y promociones especiales</p>
              </div>
              <button 
                className={`toggle-btn ${notificaciones.promociones ? 'activo' : ''}`}
                onClick={() => handleNotificacionChange('promociones')}
              >
                {notificaciones.promociones ? <FiCheck /> : <FiX />}
              </button>
            </div>

            <div className="opcion-notificacion">
              <div className="opcion-info">
                <h4>Novedades del Sistema</h4>
                <p>Mantente informado sobre nuevas funciones y actualizaciones</p>
              </div>
              <button 
                className={`toggle-btn ${notificaciones.novedades ? 'activo' : ''}`}
                onClick={() => handleNotificacionChange('novedades')}
              >
                {notificaciones.novedades ? <FiCheck /> : <FiX />}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h2>Mi Perfil</h2>
        
        {vistaActiva === 'informacion' && (
          editando ? (
            <div className="perfil-botones">
              <button 
                className={`btn-guardar ${!cambiosPendientes ? 'disabled' : ''}`} 
                onClick={handleGuardar}
                disabled={!cambiosPendientes}
              >
                <FiSave /> Guardar Cambios
              </button>
              <button className="btn-cancelar" onClick={handleCancelar}>
                <FiX /> Cancelar
              </button>
            </div>
          ) : (
            <button className="btn-editar" onClick={() => setEditando(true)}>
              <FiEdit2 /> Editar Perfil
            </button>
          )
        )}
      </div>

      <div className="perfil-navegacion">
        <button 
          className={`nav-btn ${vistaActiva === 'informacion' ? 'active' : ''}`}
          onClick={() => setVistaActiva('informacion')}
        >
          <FiUser /> Información Personal
        </button>
        <button 
          className={`nav-btn ${vistaActiva === 'seguridad' ? 'active' : ''}`}
          onClick={() => setVistaActiva('seguridad')}
        >
          <FiShield /> Seguridad
        </button>
        <button 
          className={`nav-btn ${vistaActiva === 'notificaciones' ? 'active' : ''}`}
          onClick={() => setVistaActiva('notificaciones')}
        >
          <FiBell /> Notificaciones
        </button>
      </div>

      <div className={`perfil-content ${vistaActiva !== 'informacion' ? 'full-width' : ''}`}>
        {renderContenido()}
      </div>
    </div>
  );
};

export default Perfil;