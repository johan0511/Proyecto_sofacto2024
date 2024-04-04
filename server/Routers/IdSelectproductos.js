// Routers/ProductosRouter.js
const express = require("express");
const productosController = require("../Controllers/SelectProductos"); // Corregido el nombre del controlador

const router = express.Router();

router.get("/P", productosController.obtenerProductos);

module.exports = router;
