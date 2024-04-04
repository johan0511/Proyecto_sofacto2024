const db = require("../Models/database").promise();

const obtenerDetallesFactura = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM detallesfactura");
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res
      .status(500)
      .json({ error: "Error al obtener los detalles de la factura." });
  }
};

const obtenerDetalleFacturaPorNumeroFactura = async (req, res) => {
  try {
    const { numeroFactura } = req.params;
    const [result] = await db.query(
      "SELECT * FROM detallesfactura WHERE numeroFactura = ?",
      [numeroFactura]
    );
    res.json(result || []);
  } catch (error) {
    console.log(`Error: ${error}`);
    res
      .status(500)
      .json({ error: "Error al obtener el detalle de la factura." });
  }
};

const obtenerVentasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    const [result] = await db.query(
      "SELECT * FROM detallesfactura WHERE DATE(fecha) = ?",
      [fecha]
    );
    res.json(result || []);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener las ventas por fecha." });
  }
};

const obtenerVentasPorRangoFechas = async (req, res) => {
  try {
    const { fechaInicial, fechaFinal } = req.params;
    const [result] = await db.query(
      "SELECT * FROM detallesfactura WHERE DATE(fecha) BETWEEN ? AND ?",
      [fechaInicial, fechaFinal]
    );
    res.json(result || []);
  } catch (error) {
    console.log(`Error: ${error}`);
    res
      .status(500)
      .json({ error: "Error al obtener las ventas por rango de fechas." });
  }
};

module.exports = {
  obtenerDetallesFactura,
  obtenerDetalleFacturaPorNumeroFactura,
  obtenerVentasPorFecha,
  obtenerVentasPorRangoFechas,
};
