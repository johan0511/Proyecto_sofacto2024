const db = require("../Models/database").promise();

const obtenerVentas = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Ventas");
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener ventas." });
  }
};

const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("SELECT * FROM Ventas WHERE Idventas = ?", [
      id,
    ]);
    res.json(result[0] || {});
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener la venta." });
  }
};

const crearVenta = async (req, res) => {
  try {
    const { body } = req;
    const [result] = await db.query(
      "INSERT INTO Ventas (Producto, Fecha, cantidad, Precio, Total) VALUES (?, ?, ?, ?, ?)",
      [body.Producto, body.Fecha, body.cantidad, body.Precio, body.Total]
    );
    res.json({ message: "Venta creada correctamente", id: result.insertId });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al crear la venta." });
  }
};

const actualizarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    delete body.Idventas;

    await db.query("UPDATE Ventas SET ? WHERE Idventas = ?", [body, id]);
    res.json({ message: "Venta actualizada correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al actualizar la venta." });
  }
};

const eliminarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Ventas WHERE Idventas = ?", [id]);
    res.json({ message: "Venta eliminada correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al eliminar la venta." });
  }
};

module.exports = {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
};
