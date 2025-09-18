const mongoose = require('mongoose');

const carritoItemSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  talla: { type: String, required: true },
  cantidad: { type: Number, required: true, default: 1 },
});

const carritoSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // O ObjectId si usas usuarios en Mongo
  items: [carritoItemSchema],
});

module.exports = mongoose.model('Carrito', carritoSchema);
