const express = require("express");
const ventaController = require("../Controllers/ventasController"); 
const rutaVentas = express.Router(); 

rutaVentas.get("/venta", ventaController.obtenerVentas); // Ajustado el nombre de la función del controlador
rutaVentas.get("/venta:id", ventaController.obtenerVentaPorId); // Ajustado el nombre de la función del controlador
rutaVentas.post("/crear", ventaController.crearVenta); // Ajustado el nombre de la función del controlador
rutaVentas.put("/actualizar/:id", ventaController.actualizarVenta); // Ajustado el nombre de la función del controlador
rutaVentas.delete("/eliminar/:id", ventaController.eliminarVenta); // Ajustado el nombre de la función del controlador

module.exports = rutaVentas;
