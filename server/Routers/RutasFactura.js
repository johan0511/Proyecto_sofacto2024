const express = require("express");
const facturaController = require("../Controllers/FacturaEnd");
const rutaFacturas = express.Router();

rutaFacturas.get("/F", facturaController.obtenerFacturas);
rutaFacturas.get("/:id", facturaController.obtenerFacturaPorId);
rutaFacturas.post("/crear", facturaController.crearFactura);
rutaFacturas.put("/actualizar/:id", facturaController.actualizarFactura);
rutaFacturas.delete("/eliminar/:id", facturaController.eliminarFactura);

module.exports = rutaFacturas;
