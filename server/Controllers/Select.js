const db = require("../Models/database").promise();

const obtenerSelect = async (req, res) => {
  try {
    const [result] = await db.query("SELECT Id_categoria, Nombre_categoria FROM Categoria");
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener Nombre de la categoria." });
  }
};

module.exports = {
  obtenerSelect,
};