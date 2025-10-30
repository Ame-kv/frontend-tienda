const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Carrito = require('../models/Carrito');
const Producto = require('../models/Producto');

// Función auxiliar para migrar items antiguos
function migrarItems(carrito) {
  let modificado = false;
  carrito.items = carrito.items.map(i => {
    if (i.productoId) {
      modificado = true;
      return {
        producto: i.productoId,
        talla: i.talla,
        cantidad: i.cantidad
      };
    }
    return i;
  });
  return modificado;
}

// GET /api/carrito/:userId — obtener carrito de un usuario
router.get('/:userId', async (req, res) => {
  try {
    let carrito = await Carrito.findOne({ userId: req.params.userId }).populate("items.producto");

    if (!carrito) {
      carrito = new Carrito({ userId: req.params.userId, items: [] });
      await carrito.save();
    } else {
      // Migrar items antiguos si es necesario
      if (migrarItems(carrito)) {
        await carrito.save();
      }
    }
    router.post("/:userId/agregar", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productoId, cantidad } = req.body;

    console.log("userId:", userId);
    console.log(" productoId:", productoId);
    console.log(" cantidad:", cantidad);

    // Lógica
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    res.status(500).json({ message: "Error al agregar producto al carrito", error: error.message });
  }
});


    const items = carrito.items
      .map(item => {
        if (!item.producto) return null;
        return {
          id: item.producto._id,
          nombre: item.producto.nombre,
          precio: item.producto.precio,
          imagen: item.producto.imagen,
          talla: item.talla,
          cantidad: item.cantidad,
        };
      })
      .filter(Boolean);

    res.json({ items });
  } catch (err) {
    console.error("Error al obtener carrito:", err);
    res.status(500).json({ error: "Error al obtener carrito", details: err.message });
  }
});

// POST /api/carrito/:userId/agregar — agregar o actualizar producto
router.post('/:userId/agregar', async (req, res) => {
  const { userId } = req.params;
  const { productoId, talla, cantidad } = req.body;

  if (!productoId || !talla || !cantidad) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const prodIdObj = new mongoose.Types.ObjectId(productoId);

    let carrito = await Carrito.findOne({ userId });
    if (!carrito) {
      carrito = new Carrito({ userId, items: [] });
    } else {
      migrarItems(carrito); // Migrar items antiguos
    }

    // Buscar si ya existe el producto con la misma talla
    const index = carrito.items.findIndex(
      i => i.producto && i.producto.equals(prodIdObj) && i.talla === talla
    );

    if (index !== -1) {
      carrito.items[index].cantidad = cantidad;
    } else {
      carrito.items.push({ producto: prodIdObj, talla, cantidad });
    }

    await carrito.save();
    res.json({ message: "Carrito actualizado", items: carrito.items });
  } catch (err) {
    console.error("Error al actualizar carrito:", err);
    res.status(500).json({ error: "Error al actualizar carrito", details: err.message });
  }
});

// DELETE /api/carrito/:userId/:productoId — eliminar producto
router.delete('/:userId/:productoId', async (req, res) => {
  const { userId, productoId } = req.params;

  try {
    let carrito = await Carrito.findOne({ userId });
    if (!carrito) {
      carrito = new Carrito({ userId, items: [] });
    } else {
      migrarItems(carrito); // Migrar items antiguos
    }

    const prodIdObj = new mongoose.Types.ObjectId(productoId);
    carrito.items = carrito.items.filter(i => !i.producto.equals(prodIdObj));

    await carrito.save();
    res.json({ message: "Producto eliminado", items: carrito.items });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto", details: err.message });
  }
});

module.exports = router;
