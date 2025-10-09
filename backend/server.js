require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------
// Middlewares globales
// ---------------------------
app.use(cors());
app.use(express.json());

// ---------------------------
// Inicializar Firebase Admin
// ---------------------------
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ---------------------------
// Middleware para verificar token Firebase
// ---------------------------
const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido", details: err.message });
  }
};

// ---------------------------
// Rutas públicas
// ---------------------------
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando");
});

// ---------------------------
// Rutas protegidas
// ---------------------------
app.get("/perfil", verifyFirebaseToken, (req, res) => {
  res.json({
    message: "Acceso concedido",
    user: req.user,
  });
});

// ---------------------------
// Rutas de API
// ---------------------------
// Autenticación normal
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Autenticación con Google
const authGoogleRouter = require("./routes/authGoogle");
app.use("/api/auth/google", authGoogleRouter);

// Carrito
const carritoRouter = require("./routes/carrito");
app.use("/api/carrito", carritoRouter);

// ---------------------------
// Servidor
// ---------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
