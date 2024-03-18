const express = require("express");
const router = express.Router();
const recuperarContrasenaController = require("../controllers/Recuperarcontrasena");

router.get(
  "/recuperarcontrasena",
  recuperarContrasenaController.obtenerRecuperarContrasenas
);
router.post("/crear", recuperarContrasenaController.crearRecuperarContrasena);
router.put(
  "/modificar",
  recuperarContrasenaController.actualizarRecuperarContrasena
);
router.delete(
  "/eliminar/:id",
  recuperarContrasenaController.eliminarRecuperarContrasena
);

module.exports = router;
