const connection = require("../Models/database");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const obtenerFacturas = async (req, res) => {
  try {
    const [detallesFactura] = await connection
      .promise()
      .query(
        "SELECT numeroFactura, descripcion, fecha, cantidad, precio, total FROM DetallesFactura"
      );
    res.json(detallesFactura);
  } catch (error) {
    console.error("Error al obtener facturas:", error);
    res.status(500).json({ error: "Error al obtener facturas." });
  }
};

const crearFactura = async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const {
      idCliente,
      nombreCliente,
      direccionCliente,
      ciudadCliente,
      paisCliente,
      telefonoCliente,
      emailCliente,
      numeroFactura, // Aquí se encuentra el número de factura
      fechaFactura,
      metodoPago,
      nombreEmpleado, // Nombre del empleado
      subtotal,
      iva,
      total,
      dineroRecibido,
      cambio,
      detallesFactura,
    } = req.body;

    // Insertar datos en la tabla Facturas
    await connection
      .promise()
      .query(
        "INSERT INTO facturas (idCliente, nombreCliente, direccionCliente, ciudadCliente, paisCliente, telefonoCliente, emailCliente, numeroFactura, fechaFactura, metodoPago, nombreEmpleado, subtotal, iva, total, dineroRecibido, cambio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          idCliente,
          nombreCliente,
          direccionCliente,
          ciudadCliente,
          paisCliente,
          telefonoCliente,
          emailCliente,
          numeroFactura,
          fechaFactura,
          metodoPago,
          nombreEmpleado,
          subtotal,
          iva,
          total,
          dineroRecibido,
          cambio,
        ]
      );

    // Obtener el número de factura recién creada
    const facturaId = numeroFactura;

    // Insertar datos en la tabla DetallesFactura
    for (const detalle of detallesFactura) {
      await connection
        .promise()
        .query(
          "INSERT INTO DetallesFactura (numeroFactura, descripcion, nombreEmpleado, cantidad, precio, total, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            facturaId,
            detalle.descripcion,
            nombreEmpleado, // Se agrega el nombre del empleado aquí
            detalle.cantidad,
            detalle.precio,
            detalle.total,
            new Date(),
          ]
        );
    }

    res.json({
      numeroFactura: facturaId,
      message: "Factura creada exitosamente.",
    });
  } catch (error) {
    console.error("Error al crear la factura:", error);
    res.status(500).json({ error: "Error al crear la factura." });
  }
};

module.exports = {
  obtenerFacturas,
  crearFactura,
};
