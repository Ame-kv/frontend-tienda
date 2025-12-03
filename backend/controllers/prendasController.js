const Prenda = require("../models/Producto");

// Obtener todas las prendas
exports.obtenerPrendas = async (req, res) => {
  try {
    const prendas = await Prenda.find();
    res.json(prendas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener prendas", error });
  }
};

// Obtener una prenda por ID
exports.obtenerPrendaPorId = async (req, res) => {
  try {
    const prenda = await Prenda.findById(req.params.id);
    if (!prenda) return res.status(404).json({ message: "Prenda no encontrada" });
    res.json(prenda);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la prenda", error });
  }
};

// Crear nueva prenda (con imagen)
exports.crearPrenda = async (req, res) => {
  try {
    // URL de la imagen subida
    const imagenUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const nuevaPrenda = new Prenda({
      ...req.body,
      imagen: imagenUrl, // Guardar URL en Mongo
    });

    const prendaGuardada = await nuevaPrenda.save();

    res.status(201).json(prendaGuardada);
  } catch (error) {
    res.status(400).json({ message: "Error al guardar prenda", error });
  }
};
