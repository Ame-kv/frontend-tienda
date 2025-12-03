const multer = require("multer");

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // carpeta donde se guardan las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Filtro para solo aceptar imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
