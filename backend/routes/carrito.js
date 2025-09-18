const express = require('express');
const router = express.Router();
const Carrito = require('../models/Carrito');

// Obtener carrito por userId
router.get('/:userId', async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ userId: req.params.userId }).populate('items.productoId');
    if (!carrito) return res.json({ items: [] });
    // Formateamos los productos para enviar datos necesarios
    const items = carrito.items.map(item => ({
      id: item.productoId._id,
      nombre: item.productoId.nombre,
      precio: item.productoId.precio,
      imagen: item.productoId.imagen,
      talla: item.talla,
      quantity: item.cantidad,
    }));
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener carrito" });
  }
});

// Agregar o actualizar producto en carrito
router.post('/:userId/agregar', async (req, res) => {
  const { productoId, talla, cantidad } = req.body;
  const { userId } = req.params;
  if (!productoId || !talla || !cantidad) return res.status(400).json({ error: "Faltan datos" });

  try {
    let carrito = await Carrito.findOne({ userId });
    if (!carrito) {
      carrito = new Carrito({ userId, items: [] });
    }

    // Buscar si ya existe el producto con esa talla
    const index = carrito.items.findIndex(i => i.productoId.equals(productoId) && i.talla === talla);
    if (index !== -1) {
      // Actualizar cantidad
      carrito.items[index].cantidad = cantidad;
    } else {
      // Agregar nuevo
      carrito.items.push({ productoId, talla, cantidad });
    }
    await carrito.save();

    res.json({ message: "Carrito actualizado", items: carrito.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar carrito" });
  }
});

// Eliminar producto del carrito
router.delete('/:userId/:productoId', async (req, res) => {
  const { userId, productoId } = req.params;

  try {
    const carrito = await Carrito.findOne({ userId });
    if (!carrito) return res.status(404).json({ error: "Carrito no encontrado" });

    carrito.items = carrito.items.filter(i => !i.productoId.equals(productoId));
    await carrito.save();

    res.json({ message: "Producto eliminado", items: carrito.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

module.exports = router;
