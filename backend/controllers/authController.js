const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const generarToken = require('../utils/generarToken'); // tu función para JWT

// Registro
exports.registrar = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    // Validación simple
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // Revisar si ya existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    // Crear usuario
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: hashedPassword,
      isAdmin: false, // por defecto no es admin
    });

    await nuevoUsuario.save();

    // Generar token
    const token = generarToken(nuevoUsuario._id);

    // Responder con datos
    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      token,
      user: {
        _id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        isAdmin: nuevoUsuario.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el registro', error });
  }
};


// Login
exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo no registrado' });
    }

    const contraseñaValida = await usuario.compararContraseña(contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = generarToken(usuario._id); // Asegúrate de tener esta función

    // Enviar datos del usuario junto con token
    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      user: {
        _id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        isAdmin: usuario.isAdmin || false, // si no existe, false
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el login', error });
  }
};

