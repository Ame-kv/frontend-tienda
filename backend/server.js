require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const mongoose = require("mongoose");

const authGoogleRouter = require("./routes/authGoogle");
const authRoutes = require("./routes/authRoutes");
const carritoRouter = require("./routes/carrito");

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

app.use("/api/auth", authRoutes);

// Autenticación con Google

app.use("/api/auth/google", authGoogleRouter);

// Carrito

app.use("/api/carrito", carritoRouter);

// Rutas
const prendasRoutes = require("./routes/prendas");
app.use("/api/prendas", prendasRoutes);

// ---------------------------
// Conexión a MongoDB
// ---------------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error(" Error al conectar MongoDB:", err));


// ---------------------------
// Servidor
// ---------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
