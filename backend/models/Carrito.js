const mongoose = require('mongoose');

const carritoItemSchema = new mongoose.Schema({
  producto: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Producto", 
    required: [true, "El producto es obligatorio"] 
  },
  talla: { 
    type: String, 
    required: [true, "La talla es obligatoria"] 
  },
  cantidad: { 
    type: Number, 
    required: [true, "La cantidad es obligatoria"],
    min: 1 
  }
}, { _id: false }); // <-- MUY IMPORTANTE

const carritoSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: {
    type: [carritoItemSchema],
    default: []
  }
});

module.exports = mongoose.model('Carrito', carritoSchema);
