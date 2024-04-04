const express = require("express");
const proveedorController = require("../Controllers/Proveedor"); // Cambiar el nombre del controlador si es necesario
const rutaSelect = express.Router();

rutaSelect.get("/P", proveedorController.obtenerProveedores);

module.exports = rutaSelect;