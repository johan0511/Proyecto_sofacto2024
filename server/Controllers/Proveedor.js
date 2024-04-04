const db = require("../Models/database").promise();

const obtenerProveedores = async (req, res) => {
  try {
    const [result] = await db.query("SELECT IdProveedor, Empresa FROM Proveedor");
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener proveedores." });
  }
};

module.exports ={
    obtenerProveedores
}