// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const mongoose = require("mongoose");

// Modelos
require("./models/Carrito");
const Usuario = require("./models/usuario");

// Rutas
const authGoogleRouter = require("./routes/authGoogle");
const authRoutes = require("./routes/authRoutes");
const carritoRoutes = require("./routes/carrito");
const prendasRoutes = require("./routes/prendas");
const paymentsRoutes = require("./routes/payments");
const stripeRoutes = require("./routes/stripe");

// Funciones JWT
const generarToken = require("./utils/generarToken");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ---------------------------
// Inicializar Firebase Admin
// ---------------------------
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware para verificar token Firebase
const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
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
// Rutas API
// ---------------------------
app.use("/api/auth", authRoutes);
app.use("/api/auth/google", authGoogleRouter);
app.use("/api/carrito", carritoRoutes);
app.use("/api/prendas", prendasRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/payments", paymentsRoutes);
app.use("/api/stripe", stripeRoutes);

// ---------------------------
// Conexión MongoDB
// ---------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar MongoDB:", err));

// ---------------------------
// Iniciar servidor
// ---------------------------
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// ---------------------------
// Exportar para Vercel
// ---------------------------
module.exports = app;
