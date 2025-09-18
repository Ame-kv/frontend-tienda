// routes/prendas.js
const express = require("express");
const router = express.Router();
const Prenda = require("../models/Producto"); // o cambia a "../models/Producto" si tu modelo está ahí

// GET /api/prendas — listar todas
router.get("/", async (req, res) => {
  try {
    const prendas = await Prenda.find();
    res.json(prendas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener prendas" });
  }
});

// GET /api/prendas/:id — obtener una por ID
router.get("/:id", async (req, res) => {
  try {
    const prenda = await Prenda.findById(req.params.id);
    if (!prenda) return res.status(404).json({ mensaje: "Prenda no encontrada" });
    res.json(prenda);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener la prenda" });
  }
});

// POST /api/prendas — crear nueva prenda
router.post("/", async (req, res) => {
  try {
    const nuevaPrenda = new Prenda(req.body);
    const prendaGuardada = await nuevaPrenda.save();
    res.status(201).json(prendaGuardada);
  } catch (err) {
    res.status(400).json({ error: "Error al guardar prenda" });
  }
});

module.exports = router;
