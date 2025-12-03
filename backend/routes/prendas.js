const express = require("express");
const router = express.Router();
const prendasController = require("../controllers/prendasController");
const upload = require("../middleware/uploadMulter");

// Obtener todas las prendas
router.get("/", prendasController.obtenerPrendas);

// Obtener 1 prenda
router.get("/:id", prendasController.obtenerPrendaPorId);

// Crear prenda con imagen
router.post("/", upload.single("imagen"), prendasController.crearPrenda);

module.exports = router;
