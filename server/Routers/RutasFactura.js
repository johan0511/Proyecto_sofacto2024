const express = require("express");
const facturaController = require("../Controllers/FacturaEnd");
const routerFacturas = express.Router();

// Crear una nueva factura con sus detalles
routerFacturas.post("/crear", facturaController.crearFactura);

module.exports = routerFacturas;
