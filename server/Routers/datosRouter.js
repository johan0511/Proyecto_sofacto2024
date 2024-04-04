const express = require("express");
const productoController = require("../Controllers/datosController");
const rutaProductos = express.Router();

rutaProductos.get("/", productoController.obtenerProductos);
rutaProductos.get("/:id", productoController.obtenerProductoPorId);
rutaProductos.post("/crear", productoController.crearProducto);
rutaProductos.put(
  "/actualizar-producto/:id",
  productoController.actualizarProducto
);
rutaProductos.put("/agregar-cantidad/:id", productoController.agregarCantidad);
rutaProductos.put("/vender-producto", productoController.venderProducto);
rutaProductos.delete(
  "/eliminar-producto/:id",
  productoController.eliminarProducto
);
rutaProductos.post(
  "/productos-disponibles",
  productoController.obtenerProductosDisponibles
);

module.exports = rutaProductos;
