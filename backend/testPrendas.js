const express = require("express");
const mongoose = require("mongoose");
const Prenda = require("./models/Prenda");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error(err));

const app = express();
app.use(express.json());

app.get("/test", async (req, res) => {
  try {
    const prendas = await Prenda.find();
    res.json(prendas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Servidor de test corriendo en puerto 5000"));
