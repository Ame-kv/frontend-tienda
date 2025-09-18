const Usuario = require('../models/usuario');

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

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
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

    res.json({ mensaje: 'Inicio de sesión exitoso', usuarioId: usuario._id, nombre: usuario.nombre });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el login', error });
  }
};
