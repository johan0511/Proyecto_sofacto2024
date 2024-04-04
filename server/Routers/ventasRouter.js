const express = require("express");
const ventaController = require("../Controllers/ventasController");
const rutaVentas = express.Router();

rutaVentas.get("/factura_vendida", ventaController.obtenerDetallesFactura);
rutaVentas.get(
  "/detalles-factura/:numeroFactura",
  ventaController.obtenerDetalleFacturaPorNumeroFactura
);
rutaVentas.get(
  "/ventas/:fechaInicial/:fechaFinal",
  ventaController.obtenerVentasPorRangoFechas
);
rutaVentas.get("/ventas/:fecha", ventaController.obtenerVentasPorFecha);

module.exports = rutaVentas;
