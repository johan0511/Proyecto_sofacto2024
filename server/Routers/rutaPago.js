const express = require("express");
const  selectpago = require("../Controllers/Pago");
const rutaPago = express.Router();

rutaPago.get("/p", selectpago.obtenerMetodo_pago);

module.exports = rutaPago;
