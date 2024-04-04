// routes/usuarioRouter.js

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/Nuevousuario");

router.get("/ver_usuario", usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuarioPorId);
router.post("/agregar", usuarioController.crearUsuario);
router.put("/actualizar/:id", usuarioController.actualizarUsuario);
router.delete("/eliminar/:id", usuarioController.eliminarUsuario);

module.exports = router;
