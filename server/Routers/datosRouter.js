const express = require("express");
const proveedorController = require("../Controllers/datosController");
const rutaProveedores = express.Router();

rutaProveedores.get("/", proveedorController.obtenerProveedores);
rutaProveedores.get("/:id", proveedorController.obtenerProveedorPorId);
rutaProveedores.post("/crear", proveedorController.crearProducto);
rutaProveedores.put("/actualizar/:id", proveedorController.actualizarProducto);
rutaProveedores.delete("/eliminar/:id", proveedorController.eliminarProveedor);

module.exports = rutaProveedores;
