const db = require("../Models/database").promise();

const obtenerMetodo_pago = async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT Metodo_pago FROM Metodo_pago`
    );
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener Nombre del metodo de pago." });
  }
};

module.exports = {
  obtenerMetodo_pago,
};
