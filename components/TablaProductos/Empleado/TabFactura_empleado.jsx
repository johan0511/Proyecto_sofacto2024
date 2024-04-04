import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import Avat from "../../../components/TablaProductos/Empleado/Avatar_empleado";
import { Link } from "react-router-dom";
import { Input } from "@nextui-org/react";
import logoempresa from "./../../../src/img/logoempresa.png";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import Swal from "sweetalert2";
import QRCode from "qrcode";

function Factura() {
  const [idCliente, setIdCliente] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [ciudadCliente, setCiudadCliente] = useState("Bogotá");
  const [paisCliente, setPaisCliente] = useState("Colombia");
  const [telefonoCliente, setTelefonoCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState(1);
  const [subtotalProductos, setSubtotalProductos] = useState(0);
  const [numeroFactura, setNumeroFactura] = useState("");
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [productoPrecio, setProductoPrecio] = useState(0);
  const [valorRecibido, setValorRecibido] = useState(0);
  const [cambioDinero, setCambioDinero] = useState(0);
  const [metodosPago, setMetodosPago] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [firmaDigital, setFirmaDigital] = useState(null);

  useEffect(() => {
    obtenerProductosDisponibles();
    obtenerMetodosPago();
    generarNumeroFactura();
    obtenerEmpleados();
    // Cargar la firma digital
    const firmaDigitalImg = new Image();
    firmaDigitalImg.src = "ruta/a/la/firma/digital.png";
    firmaDigitalImg.onload = () => {
      setFirmaDigital(firmaDigitalImg);
    };
  }, []);

  const obtenerEmpleados = () => {
    axios
      .get("http://localhost:3000/selectnombre/empleados")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEmpleados(res.data);
        } else if (res.data && Object.keys(res.data).length === 0) {
          console.error("No se encontraron empleados");
        } else {
          console.error("La respuesta no es un array:", res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setEmpleados([]);
      });
  };

  const obtenerProductosDisponibles = () => {
    axios
      .get("http://localhost:3000/producto/P")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProductosDisponibles(res.data);
        } else {
          console.error("No se encontraron productos disponibles");
        }
      })
      .catch((err) => {
        console.log(err);
        setProductosDisponibles([]);
      });
  };

  const obtenerMetodosPago = () => {
    axios
      .get("http://localhost:3000/pago/p")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setMetodosPago(res.data);
        } else {
          console.error("No se encontraron métodos de pago");
        }
      })
      .catch((err) => {
        console.log(err);
        setMetodosPago([]);
      });
  };

  const agregarProducto = () => {
    if (productoSeleccionado && cantidadProducto > 0) {
      const { IdProducto, Nombre, Precio } = productoSeleccionado;
      const cantidad = parseInt(cantidadProducto);
      const subtotalProducto = Precio * cantidad;

      setProductosAgregados([
        ...productosAgregados,
        { IdProducto, Nombre, Precio, Cantidad: cantidad },
      ]);
      setSubtotalProductos(subtotalProductos + subtotalProducto);

      setProductoSeleccionado("");
      setCantidadProducto(1);
      setProductoPrecio(0);

      // Restablecer el valor del select a la opción por defecto
      document.querySelector(".select_producto").value = "";
    }
  };

  const eliminarProducto = (index) => {
    const { Cantidad } = productosAgregados[index];
    const nuevosProductos = productosAgregados.filter((_, i) => i !== index);
    setProductosAgregados(nuevosProductos);

    const subtotal = nuevosProductos.reduce(
      (total, producto) => total + producto.Precio * producto.Cantidad,
      0
    );
    setSubtotalProductos(subtotal);
  };

  const generarFacturaPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");

    // Colores
    const primaryColor = [25, 55, 109];
    const secondaryColor = [245, 245, 245];
    const textColor = [0, 0, 0];

    // Agregar borde
    doc.setLineWidth(1);
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(5, 5, 200, 287, "D");

    // Encabezado
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(10, 10, 190, 50, "F");
    doc.addImage(logoempresa, "PNG", 15, 12, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("Lacteos del campo", 60, 25);
    doc.setFontSize(12);
    doc.text("Factura de Venta", 60, 35);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("NIT: 123456789-0", 60, 45);
    doc.text("Dirección: Calle 123 #45-67, Bogotá, Colombia", 60, 55);
    doc.text("Contacto: lacteos@delcampo.com | Tel: 123-456-7890", 60, 65);

    // Información de la factura
    const metodoPagoSeleccionado = document.getElementById("metodoPago").value;
    const nombreEmpleadoSeleccionado =
      document.getElementById("nombreEmpleado").value;
    const facturaHeaders = [
      [
        "N° Factura",
        "Fecha de venta",
        "Método de pago",
        "Cajero",
        "Resolución",
        "Vigencia",
      ],
    ];
    const fechaActual = new Date();
    const fechaInicial = fechaActual.toISOString().slice(0, 10);
    const fechaFinal = new Date(
      fechaActual.getTime() + 15 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);

    const facturaData = [
      [
        numeroFactura,
        fechaActual.toLocaleDateString(),
        metodoPagoSeleccionado,
        nombreEmpleadoSeleccionado,
        "Res. DIAN 123456",
        `${fechaInicial} hasta ${fechaFinal}`,
      ],
    ];
    doc.autoTable({
      startY: 80,
      head: facturaHeaders,
      body: facturaData,
      theme: "grid",
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontSize: 10,
        cellPadding: 2,
        valign: "middle",
        halign: "center",
      },
      bodyStyles: {
        fillColor: secondaryColor,
        textColor: textColor,
        fontSize: 10,
        cellPadding: 2,
        valign: "middle",
        halign: "center",
      },
    });

    // Información del cliente
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Datos del cliente:", 15, doc.autoTable.previous.finalY + 10);
    const clienteHeaders = [
      [
        "Nombre",
        "Identificación",
        "Dirección",
        "Ciudad",
        "País",
        "Teléfono",
        "Email",
      ],
    ];
    const clienteData = [
      [
        nombreCliente,
        idCliente,
        direccionCliente,
        ciudadCliente,
        paisCliente,
        telefonoCliente,
        emailCliente,
      ],
    ];
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 15,
      head: clienteHeaders,
      body: clienteData,
      theme: "grid",
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontSize: 10,
        cellPadding: 2,
        valign: "middle",
        halign: "center",
      },
      bodyStyles: {
        fillColor: secondaryColor,
        textColor: textColor,
        fontSize: 10,
        cellPadding: 2,
        valign: "middle",
        halign: "center",
      },
    });

    // Detalle de la venta
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Detalle de la venta:", 15, doc.autoTable.previous.finalY + 10);
    const headers = [
      ["Código", "Descripción", "Cantidad", "Precio", "Descuento", "Total"],
    ];
    const data = productosAgregados.map((producto) => [
      producto.IdProducto,
      producto.Nombre,
      producto.Cantidad,
      `$${producto.Precio.toLocaleString("es-CO")}`,
      "-",
      `$${(producto.Precio * producto.Cantidad).toLocaleString("es-CO")}`,
    ]);

    // Agregar filas de totales a la tabla
    const subtotal = subtotalProductos;
    const iva = subtotal * 0.19;
    const total = subtotal + iva;
    data.push(
      ["", "", "", "", "Subtotal:", `$${subtotal.toLocaleString("es-CO")}`],
      ["", "", "", "", "IVA (19%):", `$${iva.toLocaleString("es-CO")}`],
      ["", "", "", "", "Total:", `$${total.toLocaleString("es-CO")}`]
    );

    // Agregar el dinero recibido y el cambio solo si se han establecido
    if (valorRecibido) {
      data.push([
        "",
        "",
        "",
        "",
        "Dinero Recibido:",
        `$${valorRecibido.toLocaleString("es-CO")}`,
      ]);
    }
    if (cambioDinero) {
      data.push([
        "",
        "",
        "",
        "",
        "Cambio:",
        `$${cambioDinero.toLocaleString("es-CO")}`,
      ]);
    }

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 15,
      head: headers,
      body: data,
      theme: "grid",
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontSize: 10,
        cellPadding: 2,
        valign: "middle",
        halign: "center",
      },
      bodyStyles: {
        fillColor: secondaryColor,
        textColor: textColor,
        fontSize: 10,
        cellPadding: 2,
        valign: "middle",
        halign: "center",
      },
      didParseCell: function (data) {
        if (
          data.row.index === productosAgregados.length ||
          data.row.index === productosAgregados.length + 2
        ) {
          data.cell.styles.fillColor = primaryColor;
          data.cell.styles.textColor = 255;
          data.cell.styles.fontStyle = "bold";
        }
      },
    });

    // Notas y términos
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Notas:", 15, doc.autoTable.previous.finalY + 10);
    doc.text(
      "- Los productos adquiridos no tienen cambio ni devolución.",
      15,
      doc.autoTable.previous.finalY + 15
    );
    doc.text(
      "- El cliente dispone de 5 días hábiles para reclamar la factura.",
      15,
      doc.autoTable.previous.finalY + 20
    );

    const qrCodeData = `Factura N°: ${numeroFactura}
    Fecha: ${fechaActual.toLocaleDateString()}
    Empresa: Lacteos del campo
    NIT: 123456789-0
    Dirección: Calle 123 #45-67, Bogotá, Colombia
    Contacto: lacteos@delcampo.com | Tel: 123-456-7890
    
    Productos:
    ${productosAgregados
      .map(
        (producto) =>
          `${producto.Nombre} | Cantidad: ${
            producto.Cantidad
          } | Precio: $${producto.Precio.toLocaleString("es-CO")} | Total: $${(
            producto.Precio * producto.Cantidad
          ).toLocaleString("es-CO")}`
      )
      .join("\n")}
    
    Subtotal: $${subtotalProductos.toLocaleString("es-CO")}
    IVA (19%): $${(subtotalProductos * 0.19).toLocaleString("es-CO")}
    Total: $${total.toLocaleString("es-CO")}`;

    const qrCodeSize = 40;
    const qrCodeX = doc.internal.pageSize.width - 15 - qrCodeSize;
    const qrCodeY = 15;
    const qrCodeURL = await generateQRCode(qrCodeData, qrCodeSize);
    if (qrCodeURL) {
      doc.addImage(qrCodeURL, "PNG", qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
    }

    // Firma digital
    doc.text("Firma digital:", 15, doc.autoTable.previous.finalY + 30);
    if (firmaDigital) {
      doc.addImage(
        firmaDigital,
        "PNG",
        15,
        doc.autoTable.previous.finalY + 35,
        50,
        20
      );
    }

    // Leyendas legales
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(
      "Factura electrónica",
      doc.internal.pageSize.width - 15,
      doc.internal.pageSize.height - 15,
      null,
      null,
      "right"
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      "Copia sin valor fiscal",
      doc.internal.pageSize.width - 15,
      doc.internal.pageSize.height - 10,
      null,
      null,
      "right"
    );

    // Pie de página
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${doc.internal.getNumberOfPages()} de ${doc.internal.getNumberOfPages()}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      null,
      null,
      "center"
    );

    doc.save("factura.pdf");
  };

  // Función para generar el código QR
  const generateQRCode = async (data, size) => {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(data, { width: size });
      return qrCodeDataURL;
    } catch (err) {
      console.error("Error al generar el código QR:", err);
      return null;
    }
  };

  const generarNumeroFactura = () => {
    const primerBloque = Math.floor(Math.random() * 900000) + 200;
    const digitos = primerBloque.toString().split("").map(Number);
    const sum = digitos.reduce(
      (acc, digit, index) => acc + digit * ((index % 6) + 2),
      0
    );
    const verificador = (11 - (sum % 11)) % 11;
    setNumeroFactura(`${primerBloque}-${verificador}`);
  };

  const handleProductoSeleccionado = (value) => {
    const selectedProduct = productosDisponibles.find(
      (product) => product.Nombre === value
    );
    setProductoSeleccionado(selectedProduct);
    if (selectedProduct) {
      setCantidadProducto(1);
      setProductoPrecio(selectedProduct.Precio);
    }
  };

  const confirmarVenta = () => {
    // Verificar si todos los campos están llenos
    if (
      !idCliente ||
      !nombreCliente ||
      !direccionCliente ||
      !telefonoCliente ||
      !emailCliente ||
      productosAgregados.length === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa todos los campos para poder generar la venta.",
        showCloseButton: true,
      });
      return;
    }

    // Verificar la disponibilidad de todos los productos
    const productosAgotados = productosAgregados.filter((producto) => {
      const productoDisponible = productosDisponibles.find(
        (p) => p.IdProducto === producto.IdProducto
      );
      return producto.Cantidad > parseFloat(productoDisponible.Descripcion);
    });

    if (productosAgotados.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Productos Agotados",
        text: "Algunos productos seleccionados están agotados por el momento.",
        showCloseButton: true,
      });
      return;
    }

    // Calcular el total a pagar
    const total = subtotalProductos * 1.19;

    // Mostrar SweetAlert para ingresar el dinero recibido
    Swal.fire({
      title: "Dinero Recibido",
      html: `
        <p>Total a pagar: $${total.toLocaleString("es-CO")}</p>
        <input id="dineroRecibido" type="number" min="0" step="0.01" class="swal2-input" placeholder="Ingrese el dinero recibido">
      `,
      showCancelButton: true,
      confirmButtonText: "Calcular",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const dineroRecibido = parseFloat(
          document.getElementById("dineroRecibido").value
        );
        if (isNaN(dineroRecibido) || dineroRecibido < total) {
          Swal.showValidationMessage(
            `El valor recibido debe ser igual o mayor a $${total.toLocaleString(
              "es-CO"
            )}`
          );
        }
        return dineroRecibido;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const dineroRecibido = result.value;
        const cambio = dineroRecibido - total;
        setValorRecibido(dineroRecibido);
        setCambioDinero(cambio);
        mostrarConfirmacionFactura(dineroRecibido, cambio);
      }
    });
  };

  const mostrarConfirmacionFactura = (dineroRecibido, cambio) => {
    const total = subtotalProductos * 1.19;

    Swal.fire({
      icon: "success",
      title: "Venta realizada con éxito",
      html: `
        <p>La venta se ha registrado correctamente y el inventario se ha actualizado</p>
        <p>Total a pagar: $${total.toLocaleString("es-CO")}</p>
        <p>Valor recibido: $${dineroRecibido.toLocaleString("es-CO")}</p>
        <p>Su cambio es: $${cambioDinero.toLocaleString("es-CO")}</p>
      `,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¿Deseas generar la factura electrónica?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Generar Factura",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            generarFacturaPDF().then(() => {
              realizarVenta(dineroRecibido, cambio, true);
            });
          } else {
            realizarVenta(dineroRecibido, cambio, false);
          }
        });
      }
    });
  };

  const realizarVenta = async (dineroRecibido, cambio, generarFactura) => {
    // Obtener valores de los campos del formulario
    const idCliente = document.getElementById("idCliente").value;
    const nombreCliente = document.getElementById("nombreCliente").value;
    const direccionCliente = document.getElementById("direccionCliente").value;
    const ciudadCliente = "Bogotá"; // Valor fijo
    const paisCliente = "Colombia"; // Valor fijo
    const telefonoCliente = document.getElementById("telefonoCliente").value;
    const emailCliente = document.getElementById("emailCliente").value;
    const fechaFactura = new Date().toISOString().slice(0, 10);
    const metodoPago = document.getElementById("metodoPago").value;
    const nombreEmpleado = document.getElementById("nombreEmpleado").value;
    const subtotal = subtotalProductos;
    const iva = subtotal * 0.19;
    const total = subtotal * 1.19;

    try {
      // Actualizar el inventario en la base de datos
      const inventarioActualizado = await actualizarInventario(
        productosAgregados
      );

      if (inventarioActualizado) {
        // Hacer una solicitud POST al backend para crear la factura
        const response = await axios.post(
          "http://localhost:3000/facturas/crear",
          {
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
            detallesFactura: productosAgregados.map((producto) => ({
              descripcion: producto.Nombre,
              cantidad: producto.Cantidad,
              precio: producto.Precio,
              total: producto.Cantidad * producto.Precio,
            })),
          }
        );

        if (response.data) {
          console.log("Factura creada exitosamente:", response.data);
          Swal.fire({
            icon: "success",
            title: "Factura creada exitosamente",
            text: "La factura se ha creado correctamente",
          }).then(() => {
            Swal.fire({
              title: "¿Deseas realizar otra venta?",
              showCancelButton: true,
              confirmButtonText: "Sí",
              cancelButtonText: "No",
            }).then((result) => {
              if (result.isConfirmed) {
                // Refrescar la página
                window.location.reload();
              }
            });
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al crear la factura",
            text: "No se pudo crear la factura. Inténtalo de nuevo.",
          });
        }

        // Actualizar el estado local de los productos disponibles
        const nuevosProductosDisponibles = productosDisponibles.map(
          (producto) => {
            const productoVendido = productosAgregados.find(
              (p) => p.IdProducto === producto.IdProducto
            );
            if (productoVendido) {
              const nuevaCantidad =
                parseFloat(producto.Descripcion) - productoVendido.Cantidad;
              return {
                ...producto,
                Descripcion: nuevaCantidad.toString(),
              };
            }
            return producto;
          }
        );
        setProductosDisponibles(nuevosProductosDisponibles);

        // Mostrar SweetAlert con el mensaje de inventario actualizado
        Swal.fire({
          icon: "success",
          title: "Inventario actualizado",
          text: "El inventario se ha actualizado correctamente",
          confirmButtonText: "OK",
          allowOutsideClick: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar el inventario",
          text: "No se pudo actualizar el inventario. La factura no se creará.",
        });
      }
    } catch (error) {
      console.error("Error al realizar la venta:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al realizar la venta. Inténtalo de nuevo.",
      });
    }
  };

  const actualizarInventario = async (productosVendidos) => {
    try {
      // Hacer una solicitud PUT al backend para actualizar el inventario en la base de datos
      const response = await axios.put(
        "http://localhost:3000/vender-producto",
        {
          productosVendidos: productosVendidos.map((producto) => ({
            Nombre: producto.Nombre,
            cantidadVendida: producto.Cantidad,
          })),
        }
      );

      // Verificar si la actualización fue exitosa
      if (response.status === 200) {
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: "success",
          title: "Inventario actualizado",
          text: "El inventario se ha actualizado correctamente",
        });
        return true;
      } else {
        console.error("Error al actualizar el inventario:", response);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al actualizar el inventario. Inténtalo de nuevo.",
        });
        return false;
      }
    } catch (error) {
      console.error("Error al actualizar el inventario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al actualizar el inventario. Inténtalo de nuevo.",
      });
      return false;
    }
  };

  return (
    <>
      <div className="nav">
        <img src={logoempresa} alt="Logo" className="navlg" />
        <Link to="/factura_empleado">
          <Button className="BtnN" color="success" variant="shadow">
            Factura
          </Button>
        </Link>
        <Link to="/inventario_empleado">
          <Button className="BtnN" color="success" variant="shadow">
            Inventario
          </Button>
        </Link>
        <div className="Avat">
          <Avat />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Detalles del Cliente</h4>
                <Input
                  label="Número de Identificación"
                  id="idCliente"
                  className="mb-3"
                  value={idCliente}
                  onChange={(e) => setIdCliente(e.target.value)}
                />
                <Input
                  label="Nombre del Cliente"
                  id="nombreCliente"
                  className="mb-3"
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                />
                <Input
                  label="Dirección"
                  id="direccionCliente"
                  className="mb-3"
                  value={direccionCliente}
                  onChange={(e) => setDireccionCliente(e.target.value)}
                />
                <Input
                  label="Teléfono"
                  id="telefonoCliente"
                  className="mb-3"
                  value={telefonoCliente}
                  onChange={(e) => setTelefonoCliente(e.target.value)}
                />
                <Input
                  label="Email"
                  id="emailCliente"
                  className="mb-3"
                  value={emailCliente}
                  onChange={(e) => setEmailCliente(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Detalles de la Factura</h4>
                <Input
                  label="N° Factura"
                  id="numeroFactura"
                  className="mb-3"
                  value={numeroFactura}
                  readOnly
                />
                <Input type="date" label="Fecha" className="mb-3" />
                <div>
                  <select
                    className="select_pago"
                    name="metodoPago"
                    id="metodoPago"
                  >
                    <option value="">Selecciona el metodo de pago</option>
                    {metodosPago.map((metodo, index) => (
                      <option key={index} value={metodo.Metodo_pago}>
                        {metodo.Metodo_pago}
                      </option>
                    ))}
                  </select>
                  <select
                    className="select_nombre"
                    name="nombreEmpleado"
                    id="nombreEmpleado"
                  >
                    <option value="">Selecciona el empleado</option>
                    {empleados.map((empleado, index) => (
                      <option key={index} value={empleado.Nombre}>
                        {empleado.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Productos</h4>
                <div className="row">
                  <br />
                  <br />
                  <div className="col-md-4">
                    <select
                      className="select_producto"
                      onChange={(e) =>
                        handleProductoSeleccionado(e.target.value)
                      }
                    >
                      <option label="Seleccione el producto" value=""></option>
                      {productosDisponibles.map((producto, index) => (
                        <option key={index} value={producto.Nombre}>
                          {producto.Nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <Input
                      label="Precio"
                      className="mb-3"
                      value={productoPrecio.toLocaleString("es-CO")}
                      readOnly
                    />
                    <div className="col-md-2">
                      <Input
                        label="Cantidad"
                        className="mb-3"
                        type="number"
                        value={cantidadProducto}
                        onChange={(e) => setCantidadProducto(e.target.value)}
                      />
                    </div>
                    <div className="botones-factura">
                      <Button onClick={agregarProducto}>
                        Agregar Producto
                      </Button>
                      <Button onClick={confirmarVenta}>Generar Venta</Button>
                    </div>
                  </div>
                </div>
                <div className="tabla">
                  <table className="table mt-4">
                    <thead>
                      <tr>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosAgregados.map((producto, index) => (
                        <tr key={index}>
                          <td>{producto.Nombre}</td>
                          <td>{producto.Cantidad}</td>
                          <td>${producto.Precio.toLocaleString("es-CO")}</td>
                          <td>
                            $
                            {(
                              producto.Precio * producto.Cantidad
                            ).toLocaleString("es-CO")}
                          </td>
                          <td>
                            <Button
                              color="error"
                              onClick={() => eliminarProducto(index)}
                            >
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="precios">
                  <h5>
                    Subtotal: ${subtotalProductos.toLocaleString("es-CO")}
                  </h5>
                  <h5>
                    IVA (19%): $
                    {(subtotalProductos * 0.19).toLocaleString("es-CO")}
                  </h5>
                  <h4>
                    Total: ${(subtotalProductos * 1.19).toLocaleString("es-CO")}
                  </h4>
                  <h5>
                    Dinero Recibido: ${valorRecibido.toLocaleString("es-CO")}
                  </h5>
                  <h5>Cambio: ${cambioDinero.toLocaleString("es-CO")}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Factura;
