// Routers/EmpleadosRouter.js
const express = require("express");
const empleadosController = require("../Controllers/Selecttrabajadores");
const router = express.Router();

router.get("/empleados", empleadosController.obtenerEmpleadosActivos);

module.exports = router;
