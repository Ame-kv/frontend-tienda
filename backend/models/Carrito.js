const mongoose = require('mongoose');

const carritoItemSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  talla: { type: String, required: true },
  cantidad: { type: Number, required: true }
});

const carritoSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: { type: [carritoItemSchema], default: [] }
});

module.exports = mongoose.model('Carrito', carritoSchema);
