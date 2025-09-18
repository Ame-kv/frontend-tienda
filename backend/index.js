require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Importar rutas
const prendasRoutes = require("./routes/prendas");
const authRoutes = require("./routes/authRoutes");
const carritoRoutes = require('./routes/carrito');

// Verificar conexión a Mongo
console.log("MONGO_URI:", process.env.MONGO_URI);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Conectado a MongoDB Atlas"))
  .catch((err) => console.error(" Error de conexión:", err));

// Middlewares
app.use(cors({
  origin: "http://localhost:5173" // Dirección de tu frontend (Vite)
}));
app.use(express.json());

// Rutas organizadas
app.use("/api/prendas", prendasRoutes);   // Rutas prendas
app.use("/api/auth", authRoutes);         // Rutas auth
app.use('/api/carrito', carritoRoutes);
// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor backend escuchando en el puerto ${PORT}`);
});
