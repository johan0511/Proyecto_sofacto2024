const db = require("../Models/database").promise();

const obtenerTipoid = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT IdTipo_identificacion, Tipo_identificacion  FROM Tipo_identificacion"
    );
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener Nombre de la categoria." });
  }
};

module.exports = {
  obtenerTipoid,
};
