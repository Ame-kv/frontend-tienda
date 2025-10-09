const express = require("express");
const router = express.Router();

router.post("/google", (req, res) => {
  const { nombre, correo } = req.body;
  console.log("Usuario recibido:", nombre, correo);
  res.json({ success: true, nombre, correo });
});

module.exports = router;
