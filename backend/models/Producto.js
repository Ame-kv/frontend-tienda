// models/Producto.js
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  imagen: {
    type: String,
    required: true,
    trim: true
    // Ejemplo: "imagenes/blusa.jpg"
  }
}, {
  timestamps: true // opcional: agrega createdAt y updatedAt
});

module.exports = mongoose.model("Producto", productoSchema);
