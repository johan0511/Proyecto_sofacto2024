const express = require("express");
const selectController = require("../Controllers/Select");
const rutaSelect = express.Router();

rutaSelect.get("/S", selectController.obtenerSelect);

module.exports = rutaSelect;