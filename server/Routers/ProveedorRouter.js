const express = require("express");
const router = express.Router();
const datosController = require("../Controllers/ProveedorController");

router.get("/P", datosController.obtenerProveedores);
router.get("/P:id", datosController.obtenerProveedorPorId);
router.post("/crear", datosController.crearProveedor);
router.put("/modificar/:id", datosController.actualizarProveedor);
router.delete("/eliminar/:id", datosController.eliminarProveedor);

module.exports = router;
