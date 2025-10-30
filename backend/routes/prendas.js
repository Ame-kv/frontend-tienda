const express = require("express");
const router = express.Router();
const prendasController = require("../controllers/prendasController");

// Rutas usando el controller
router.get("/", prendasController.obtenerPrendas);
router.get("/:id", prendasController.obtenerPrendaPorId);
router.post("/", prendasController.crearPrenda);

module.exports = router;
