const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/iniciosesion");

// Ruta para manejar las solicitudes de inicio de sesión
router.post("/logeo", usuarioController.iniciarSesion);

// Ruta para obtener todos los usuarios (solo para propósitos de desarrollo, no se debe utilizar en producción)
router.get("/usuarios", usuarioController.obtenerUsuarios);

// Ruta para obtener un usuario por correo y contraseña
router.post("/usuarios/obtener", usuarioController.obtenerUsuarioPorCorreoYContrasena);

module.exports = router;
