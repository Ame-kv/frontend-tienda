require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Inicializar Firebase Admin con tus credenciales
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware para verificar el token
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

// Ruta pública
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando");
});

// Ruta protegida
app.get("/perfil", verifyFirebaseToken, (req, res) => {
  res.json({
    message: "Acceso concedido",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
