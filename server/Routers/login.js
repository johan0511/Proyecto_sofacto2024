const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/iniciosesion");

router.post("/logeo", usuarioController.iniciarSesion);

router.get("/usuarios", usuarioController.obtenerUsuarios);

router.post("/usuarios/obtener", usuarioController.obtenerUsuarioPorCorreoYContrasena);

module.exports = router;
