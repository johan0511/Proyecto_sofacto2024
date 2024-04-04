import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import Avat from "../../components/Avatar";
import { Link } from "react-router-dom";
import logoempresa from "../../src/img/logoempresa.png";
import { jsPDF } from "jspdf";
import axios from "axios";

function TabFac() {
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");
  const [productos, setProductos] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState("");
  const [subtotalProductos, setSubtotalProductos] = useState(0);

  const agregarProducto = () => {
    if (nombreProducto && precioProducto && cantidadProducto) {
      const precio = parseFloat(precioProducto);
      const cantidad = parseInt(cantidadProducto);
      const subtotalProducto = precio * cantidad;

      setProductos([
        ...productos,
        { nombre: nombreProducto, precio, cantidad },
      ]);
      setSubtotalProductos(subtotalProductos + subtotalProducto);

      // Limpia campos después de agregar el producto
      setNombreProducto("");
      setPrecioProducto("");
      setCantidadProducto("");
    }
  };

  const obtenerNombreCliente = () => {
    if (numeroDocumento) {
      axios
        .get(`http://localhost:3000/Cargos/${Id}`)
        .then((response) => {
          const cliente = response.data;
          setNombreCliente(cliente.nombre);
        })
        .catch((error) => {
          console.error("Error al obtener el nombre del cliente:", error);
        });
    }
  };

  const generarFacturaPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Factura", 10, 10);

    const fechaActual = new Date();
    const fechaString = fechaActual.toLocaleDateString();
    const horaString = fechaActual.toLocaleTimeString();

    doc.setFontSize(12);
    doc.text("Fecha: " + fechaString + " " + horaString, 10, 20);
    doc.text("Número de Documento: " + numeroDocumento, 10, 30);
    doc.text("Nombre del Cliente: " + nombreCliente, 10, 40);
    doc.text("Dirección: " + direccionCliente, 10, 50);
    doc.text("Teléfono: " + telefonoCliente, 10, 60);
    doc.text("Productos:", 10, 70);
    productos.forEach((producto, index) => {
      const y = 80 + index * 10;
      doc.text(
        `${index + 1}. ${producto.nombre} - Precio: ${
          producto.precio
        } - Cantidad: ${producto.cantidad} - Subtotal: ${
          producto.precio * producto.cantidad
        }`,
        10,
        y
      );
    });
    const yTotal = 80 + productos.length * 10;
    doc.text("Subtotal Productos: " + subtotalProductos, 10, yTotal + 10);
    const iva = subtotalProductos * 0.19;
    doc.text("Iva 19%: " + iva, 10, yTotal + 20);
    const total = subtotalProductos + iva;
    doc.setFont("helvetica", "bold");
    doc.text("Total: " + total, 10, yTotal + 30);

    // Agrega línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, yTotal + 35, 200, yTotal + 35);

    // Agrega mensaje final
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("¡Gracias por su compra!", 10, yTotal + 45);

    doc.save("factura.pdf");

    axios
      .post("http://localhost:3000/fact/crear", {
        numeroDocumento: numeroDocumento,
        nombreCliente: nombreCliente,
        direccionCliente: direccionCliente,
        telefonoCliente: telefonoCliente,
        productos: productos,
        subtotalProductos: subtotalProductos,
      })
      .then((response) => {
        console.log("Respuesta de la API:", response.data);
        console.log("Factura enviada exitosamente a la API");
      })
      .catch((error) => {
        console.error("Error al enviar factura a la API:", error);
      });
  };

  return (
    <>
      <div className="nav">
        <div className="Avat">
          <Avat />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div className="client">
        <input
          type="text"
          name="numeroDocumento"
          placeholder="Número de Documento"
          value={Id}
          onChange={(e) => setNumeroDocumento(e.target.value)}
          onBlur={Id}
        />
        <br />
        <br />
        <input
          type="text"
          name="nombreCliente"
          placeholder="Nombre Cliente"
          value={nombreCliente}
          readOnly
        />
        <br />
        <br />
        <input
          type="text"
          name="direccionCliente"
          placeholder="Dirección"
          value={direccionCliente}
          onChange={(e) => setDireccionCliente(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          name="telefonoCliente"
          placeholder="Teléfono"
          value={telefonoCliente}
          onChange={(e) => setTelefonoCliente(e.target.value)}
        />
        <br />
        <br />
      </div>

      <div className="product">
        <input
          type="text"
          name="nombreProducto"
          placeholder="Nombre Producto"
          value={nombreProducto}
          onChange={(e) => setNombreProducto(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          name="precioProducto"
          placeholder="Precio Producto"
          value={precioProducto}
          onChange={(e) => setPrecioProducto(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          name="cantidadProducto"
          placeholder="Cantidad Producto"
          value={cantidadProducto}
          onChange={(e) => setCantidadProducto(e.target.value)}
        />
        <br />
        <br />

        <input
          type="button"
          name="Continuar"
          onClick={agregarProducto}
          value="Agregar Producto"
        />
        <br />
        <br />
      </div>

      <div className="fact">
        <input
          type="button"
          name="Continuar"
          onClick={generarFacturaPDF}
          value="Generar Factura PDF"
        />
        <br />
        <br />
        <h3>Productos:</h3>
        <ul>
          {productos.map((producto, index) => (
            <li key={index}>
              {producto.nombre} - Precio: {producto.precio} - Cantidad:{" "}
              {producto.cantidad} - Subtotal:{" "}
              {producto.precio * producto.cantidad}
            </li>
          ))}
        </ul>
        <p>Subtotal Productos: {subtotalProductos}</p>
      </div>
    </>
  );
}

export default TabFac;