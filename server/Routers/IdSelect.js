const express = require("express");
const selectIdController = require("../Controllers/Tipo_Id");
const rutaIdSelect = express.Router();

rutaIdSelect.get("/T", selectIdController.obtenerTipoid);

module.exports = rutaIdSelect;
