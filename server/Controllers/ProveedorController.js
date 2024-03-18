const db = require("../Models/database").promise();

const obtenerProveedores = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Proveedor");
    res.json(result);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener proveedores." });
  }
};

const obtenerProveedorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "SELECT * FROM Proveedor WHERE IdProveedor = ?",
      [id]
    );
    res.json(result[0] || {});
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener el proveedor." });
  }
};

const crearProveedor = async (req, res) => {
  try {
    const { IdProveedor, Empresa, Contacto } = req.body; // No hay IdEstado en la tabla
    const result = await db.query(
      "INSERT INTO Proveedor(IdProveedor, Empresa, Contacto) VALUES (?, ?, ?)",
      [IdProveedor, Empresa, Contacto]
    );
    if (result && result.insertId) {
      res.json({
        message: "Proveedor creado correctamente",
        id: result.insertId,
      });
    }
  } catch (error) {
    console.error(`Error al crear el proveedor: ${error}`);
    res.status(500).json({
      error:
        "Error al crear el proveedor. Consulta la consola del servidor para más detalles.",
    });
  }
};

const actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { Empresa, Contacto } = req.body;
    await db.query(
      "UPDATE Proveedor SET Empresa = ?, Contacto = ? WHERE IdProveedor = ?",
      [Empresa, Contacto, id]
    );
    res.json({ message: "Proveedor actualizado correctamente" });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al actualizar el proveedor." });
  }
};

const eliminarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Proveedor WHERE IdProveedor = ?", [id]);
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al eliminar el proveedor." });
  }
};

module.exports = {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
};
