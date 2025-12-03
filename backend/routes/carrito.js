const express = require('express');
const router = express.Router();
const Carrito = require('../models/Carrito');
const mongoose = require("mongoose");

/* GET — Obtener carrito */
router.get('/:userId', async (req, res) => {
  try {
    let carrito = await Carrito.findOne({ userId: req.params.userId })
      .populate("items.producto");

    if (!carrito) {
      carrito = new Carrito({ userId: req.params.userId, items: [] });
      await carrito.save();
    }

    res.json({ items: carrito.items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* POST — Agregar producto */
router.post('/:userId/agregar', async (req, res) => {
  try {
    const { userId } = req.params;
    const { productoId, talla, cantidad } = req.body;

    console.log("Recibido:", { userId, productoId, talla, cantidad });

    // Validación simple
    if (!productoId || !talla || !cantidad) {
      return res.status(400).json({
        error: "productoId, talla y cantidad son requeridos",
        recibido: { productoId, talla, cantidad }
      });
    }

    let carrito = await Carrito.findOne({ userId });

    if (!carrito) {
      carrito = new Carrito({ userId, items: [] });
    }

    // Limpieza de posibles items corruptos
    carrito.items = carrito.items.filter(i =>
      i.producto && i.talla && i.cantidad
    );

    // Buscar si ya existe ese producto con esa talla
    const itemExistente = carrito.items.find(i =>
      i.producto &&
      i.producto.toString() === String(productoId) &&
      i.talla === talla
    );

    if (itemExistente) {
      itemExistente.cantidad += parseInt(cantidad);
      console.log("Cantidad incrementada");
    } else {
      const nuevoItem = {
        producto: new mongoose.Types.ObjectId(productoId),
        talla: String(talla),
        cantidad: parseInt(cantidad)
      };

      console.log("Insertando:", nuevoItem);

      carrito.items.push(nuevoItem);
      console.log("Nuevo item agregado");
    }

    await carrito.save();
    await carrito.populate("items.producto");

    res.json({ message: "Producto agregado", items: carrito.items });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/* DELETE — Eliminar */
router.delete('/:userId/:productoId', async (req, res) => {
  try {
    const { userId, productoId } = req.params;

    const carrito = await Carrito.findOne({ userId });
    if (!carrito)
      return res.status(404).json({ message: "Carrito no encontrado" });

    // Filtrar item
    carrito.items = carrito.items.filter(
      i => i.producto.toString() !== productoId
    );

    await carrito.save();
    await carrito.populate("items.producto"); 

    res.json({
      message: "Producto eliminado",
      items: carrito.items
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
