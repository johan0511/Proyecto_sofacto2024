const express = require("express");
const router = express.Router();
const cargoController = require("../controllers/Cargo");

router.get("/C", cargoController.obtenerCargos);
router.get("/C/:id", cargoController.obtenerCargoPorId);
router.post("/crear", cargoController.crearCargo);
router.put("/actualizar/:id", cargoController.actualizarCargo);
router.delete("/eliminar/:id", cargoController.eliminarCargo);

module.exports = router;
