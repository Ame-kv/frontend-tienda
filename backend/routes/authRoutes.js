const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/registro', authController.registrar);
router.post('/login', authController.login);
router.post("/google", async (req, res) => {
  try {
    const { email, nombre } = req.body;
    // Aquí podrías guardar el usuario si no existe, etc.
    res.status(200).json({ message: "Usuario de Google recibido", email, nombre });
  } catch (error) {
    console.error("Error en /auth/google:", error);
    res.status(500).json({ message: "Error en servidor" });
  }
});

module.exports = router;
