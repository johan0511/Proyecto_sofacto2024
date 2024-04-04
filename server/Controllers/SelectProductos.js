// Controllers/ProductosController.js
const db = require("../Models/database").promise();

const obtenerProductos = async (req, res) => {
  try {
    // Modificamos la consulta para obtener todos los datos de ProductosDisponibles
    const [result] = await db.query(
      "SELECT * FROM ProductosDisponibles"
    );
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener los productos." });
  }
};

module.exports = {
  obtenerProductos,
};
