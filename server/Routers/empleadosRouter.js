const express = require("express");
const rutaEmpleado = express.Router();
const empleadosController = require("../Controllers/empleadosController");

rutaEmpleado.get("/E/", empleadosController.obtenerEmpleados);
rutaEmpleado.get("/:id", empleadosController.obtenerEmpleadoPorId);
rutaEmpleado.post("/crear", empleadosController.crearEmpleado);
rutaEmpleado.put("/actualizar/:id", empleadosController.actualizarEmpleado);
rutaEmpleado.delete("/eliminar/:id", empleadosController.eliminarEmpleado);

module.exports = rutaEmpleado;
