const db = require("../Models/database").promise();

const obtenerFacturas = async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT IdFactura, IdProducto_FK, Cantidad_productos, Precio_producto, Total_pagar, Fecha_venta, IdMetodo_pago, IdCliente_FK FROM Factura;`
    );
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener facturas." });
  }
};

const obtenerFacturaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "SELECT * FROM Factura WHERE IdFactura = ?",
      [id]
    );
    res.json(result[0] || {});
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener la factura." });
  }
};



const crearFactura = async (req, res) => {
  try {
    const { body } = req;
    const fechaVenta = new Date().toISOString().slice(0, 19).replace('T', ' '); // Obtener la fecha actual
    const [result] = await db.query(
      "INSERT INTO Factura (IdProducto_FK, Cantidad_productos, Precio_producto, Total_pagar, Fecha_venta, IdMetodo_pago, IdCliente_FK) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        body.IdProducto_FK,
        body.Cantidad_productos,
        body.Precio_producto,
        body.Total_pagar,
        fechaVenta,
        body.IdMetodo_pago,
        body.IdCliente_FK,
      ]
    );
    res.json({ message: "Factura creada correctamente", id: result.insertId });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al crear la factura." });
  }
};

const actualizarFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    delete body.IdFactura;

    await db.query("UPDATE Factura SET ? WHERE IdFactura = ?", [body, id]);
    res.json({ message: "Factura actualizada correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al actualizar la factura." });
  }
};

const eliminarFactura = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Factura WHERE IdFactura = ?", [id]);
    res.json({ message: "Factura eliminada correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al eliminar la factura." });
  }
};

module.exports = {
  obtenerFacturas,
  obtenerFacturaPorId,
  crearFactura,
  actualizarFactura,
  eliminarFactura,
};
