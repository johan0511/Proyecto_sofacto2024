const db = require("../Models/database").promise();

const obtenerProveedores = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM productos");
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener proveedores." });
  }
};

const obtenerProveedorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "SELECT * FROM productos WHERE IdProducto = ?",
      [id]
    );
    res.json(result[0] || {});
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener el proveedor." });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { body } = req;
    const [result] = await db.query(
      "INSERT INTO productos (Nombre, Nombre_categoria_FK, Proveedor, Descripcion, Fecha, Estado, Precio) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        body.Nombre,
        body.Nombre_categoria_FK,
        body.Proveedor,
        body.Descripcion,
        body.Fecha,
        body.Estado,
        body.Precio,
      ]
    );
    res.json({ message: "Producto creado correctamente", id: result.insertId });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al crear el producto." });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    delete body.IdProducto;

    await db.query("UPDATE productos SET ? WHERE IdProducto = ?", [body, id]);
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al actualizar el producto." });
  }
};

const eliminarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM productos WHERE IdProducto = ?", [id]);
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al eliminar el proveedor." });
  }
};

module.exports = {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProducto,
  actualizarProducto,
  eliminarProveedor,
};
