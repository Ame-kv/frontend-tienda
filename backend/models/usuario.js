const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  contraseña: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// Encriptar la contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = function (passwordIngresada) {
  return bcrypt.compare(passwordIngresada, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
