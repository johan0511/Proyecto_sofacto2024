import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

class TabVenta extends Component {
  state = {
    data: [],
    modalVer: false,
    form: {
      id: "",
      descripcion: "",
      nombreEmpleado: "",
      fecha: "",
      cantidad: "",
      precio: "",
      total: "",
      numeroFactura: "", // Agregar esta línea
    },
    currentPage: 1,
    itemsPerPage: 6,
    fechaInicial: "", // Estado para almacenar temporalmente la fecha inicial
    fechaFinal: "", // Estado para almacenar temporalmente la fecha final
    busqueda: "",
  };

  handleFechaInicialChange = (event) => {
    const fechaInicial = event.target.value;
    this.setState({ fechaInicial });
  };

  handleFechaFinalChange = (event) => {
    const fechaFinal = event.target.value;
    this.setState({ fechaFinal });
  };

  buscar = () => {
    const { fechaInicial, fechaFinal } = this.state;
    if (fechaInicial && fechaFinal) {
      const url = `http://localhost:3000/facturas_vendidas/ventas/${fechaInicial}/${fechaFinal}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ data });
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Fechas no seleccionadas",
        text: "Por favor, selecciona una fecha inicial y una fecha final.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };

  normalizarFecha = (fecha) => {
    const partes = fecha.split("-");
    const anio = partes[0];
    const mes = partes[1].length === 1 ? "0" + partes[1] : partes[1]; // Agregamos un 0 si el mes tiene un solo dígito
    const dia = partes[2];
    return `${anio}-${mes}-${dia}`;
  };

  peticionGet = () => {
    const url = "http://localhost:3000/facturas_vendidas/factura_vendida";

    fetch(url)
      .then((response) => response.json())
      .then((detallesFacturas) => {
        this.setState({ data: detallesFacturas });
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };

  modalVer = () => {
    this.setState({ modalVer: !this.state.modalVer });
  };

  handleBusquedaChange = (event) => {
    this.setState({ busqueda: event.target.value });
  };

  seleccionarVenta = (detalle) => {
    this.setState({
      form: {
        id: detalle.id,
        descripcion: detalle.descripcion,
        nombreEmpleado: detalle.nombreEmpleado,
        fecha: detalle.fecha,
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        total: detalle.total,
        numeroFactura: detalle.numeroFactura, // Agregar esta línea
      },
    });
  };

  generarInformePDF = () => {
    const { fechaInicial, fechaFinal } = this.state;

    const doc = new jsPDF("landscape");
    const pageWidth = doc.internal.pageSize.getWidth();

    // Agregar encabezado con logo y datos de la empresa
    const logoImg = new Image();
    logoImg.src = "../../src/img/logoempresa.png";
    doc.addImage(logoImg, "PNG", 14, 14, 30, 10);
    doc.setFontSize(18);
    doc.text("Informe de Ventas", 50, 18);
    doc.setFontSize(10);
    doc.text("Empresa S.A. de C.V.", 50, 25);
    doc.text("Dirección: Calle Principal #123, Ciudad, País", 50, 30);
    doc.text("RFC: ABC123456789", 50, 35);

    const today = new Date();
    const headerText = `Fecha: ${today.toLocaleDateString()}`;
    doc.setFontSize(12);
    doc.text(headerText, pageWidth - 14 - doc.getTextWidth(headerText), 18);

    let ventasFiltradas = this.state.data;

    if (fechaInicial && fechaFinal) {
      // Filtrar los datos según las fechas seleccionadas
      ventasFiltradas = this.state.data.filter((detalle) => {
        const fechaVenta = new Date(detalle.fecha);
        const fechaInicialObj = new Date(fechaInicial);
        const fechaFinalObj = new Date(fechaFinal);
        return fechaVenta >= fechaInicialObj && fechaVenta <= fechaFinalObj;
      });
    }

    // Agrupar datos por "NOMBRE EMPLEADO" y contar ventas por empleado
    const ventasPorEmpleado = {};
    ventasFiltradas.forEach((detalle) => {
      const nombreEmpleado = detalle.nombreEmpleado;
      if (ventasPorEmpleado[nombreEmpleado]) {
        ventasPorEmpleado[nombreEmpleado]++;
      } else {
        ventasPorEmpleado[nombreEmpleado] = 1;
      }
    });

    // Agregar datos de la tabla
    const tableData = ventasFiltradas.map((detalle) => [
      detalle.numeroFactura,
      detalle.descripcion,
      detalle.nombreEmpleado,
      detalle.fecha.substring(0, 10),
      detalle.cantidad,
      parseFloat(detalle.precio).toFixed(2),
      parseFloat(detalle.total).toFixed(2),
    ]);

    // Configurar estilos de la tabla
    const tableStyles = {
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        halign: "center",
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: 50,
        halign: "center",
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      startY: 40,
    };

    // Agregar tabla al PDF
    doc.autoTable({
      head: [
        [
          "NUMERO DE FACTURA",
          "DESCRIPCIÓN",
          "NOMBRE EMPLEADO",
          "FECHA",
          "CANTIDAD",
          "PRECIO",
          "TOTAL",
        ],
      ],
      body: tableData,
      ...tableStyles,
    });

    // Mostrar el número de ventas por empleado en una tabla separada
    const ventasPorEmpleadoData = Object.entries(ventasPorEmpleado).map(
      ([nombreEmpleado, ventas]) => [nombreEmpleado, ventas]
    );
    const ventasPorEmpleadoStyles = {
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        halign: "center",
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: 50,
        halign: "center",
        fontSize: 9,
      },
      startY: doc.autoTable.previous.finalY + 20,
    };

    doc.autoTable({
      head: [["NOMBRE EMPLEADO", "VENTAS"]],
      body: ventasPorEmpleadoData,
      ...ventasPorEmpleadoStyles,
    });

    // Agregar totales en una tabla separada
    const totales = tableData.reduce(
      (acc, row) => {
        acc.cantidad += row[4];
        acc.total += parseFloat(row[6]);
        return acc;
      },
      { cantidad: 0, total: 0 }
    );

    const totalesData = [
      ["Total de Unidades Vendidas", totales.cantidad],
      ["Total de Ventas", `$${totales.total.toFixed(2)}`],
    ];

    const totalesStyles = {
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        halign: "center",
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: 50,
        halign: "center",
        fontSize: 9,
      },
      startY: doc.autoTable.previous.finalY + 20,
    };

    doc.autoTable({
      head: [["TOTALES", ""]],
      body: totalesData,
      ...totalesStyles,
    });

    // Calcular días trabajados por mes y fechas trabajadas
    const diasTrabajadosPorMes = {};
    const fechasTrabajadas = [];
    ventasFiltradas.forEach((detalle) => {
      const fechaVenta = detalle.fecha.substring(0, 7); // Extraer mes y año
      if (diasTrabajadosPorMes[fechaVenta]) {
        diasTrabajadosPorMes[fechaVenta]++;
      } else {
        diasTrabajadosPorMes[fechaVenta] = 1;
      }
      fechasTrabajadas.push(detalle.fecha.substring(0, 10));
    });

    // Agregar tabla de días trabajados por mes
    const diasTrabajadosData = Object.entries(diasTrabajadosPorMes).map(
      ([fechaVenta, dias]) => [fechaVenta, dias]
    );
    const diasTrabajadosStyles = {
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        halign: "center",
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: 50,
        halign: "center",
        fontSize: 9,
      },
      startY: doc.autoTable.previous.finalY + 20,
    };

    doc.autoTable({
      head: [["Dias trabajados por mes", "Días"]],
      body: diasTrabajadosData,
      ...diasTrabajadosStyles,
    });

    // Agregar tabla de fechas trabajadas
    const fechasTrabajadasData = fechasTrabajadas.map((fecha) => [fecha]);
    const fechasTrabajadasStyles = {
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        halign: "center",
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: 50,
        halign: "center",
        fontSize: 9,
      },
      startY: doc.autoTable.previous.finalY + 20,
    };

    doc.autoTable({
      head: [["Fechas trabajadas"]],
      body: fechasTrabajadasData,
      ...fechasTrabajadasStyles,
    });

    // Agregar información adicional
    doc.setFontSize(8);
    doc.text(
      "Términos y Condiciones: Pago contra entrega. Precios más IVA.",
      14,
      doc.internal.pageSize.getHeight() - 5
    );

    // Guardar el PDF
    doc.save("informe_ventas.pdf");
  };

  componentDidMount() {
    this.peticionGet();
  }

  handleClick = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { form, data, currentPage, itemsPerPage } = this.state;

    // Lógica de paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => (
      <li
        key={number}
        className={`page-item ${currentPage === number ? "active" : ""}`}
      >
        <button className="page-link" onClick={() => this.handleClick(number)}>
          {number}
        </button>
      </li>
    ));

    return (
      <div className="App">
        <br />
        <div className="form-group">
          <label htmlFor="fechaInicial">Fecha Inicial</label>
          <input
            className="form-control"
            type="date"
            name="fechaInicial"
            id="fechaInicial"
            onChange={this.handleFechaInicialChange}
            value={this.state.fechaInicial}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaFinal">Fecha Final</label>
          <input
            className="form-control"
            type="date"
            name="fechaFinal"
            id="fechaFinal"
            onChange={this.handleFechaFinalChange}
            value={this.state.fechaFinal}
          />
        </div>
        <Button onClick={this.buscar}>Buscar</Button>
        <br />
        <br />
        <Button onClick={() => this.generarInformePDF()}>
          Generar Informe PDF
        </Button>
        <table className="table">
          <thead>
            <tr>
              <th>NUMERO DE FACTURA</th>
              <th>DESCRIPCION</th>
              <th>NOMBRE EMPLEADO</th>
              <th>FECHA</th>
              <th>CANTIDAD</th>
              <th>PRECIO</th>
              <th>TOTAL</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((detalle) => (
              <tr key={detalle.numeroFactura}>
                <td>{detalle.numeroFactura}</td>
                <td>{detalle.descripcion}</td>
                <td>{detalle.nombreEmpleado}</td>
                <td>{detalle.fecha.substring(0, 10)}</td>
                <td>{detalle.cantidad}</td>
                <td>{new Intl.NumberFormat("en-EN").format(detalle.precio)}</td>
                <td>{new Intl.NumberFormat("en-EN").format(detalle.total)}</td>
                <td>
                  <Button
                    className="btn btn-info"
                    onClick={() => {
                      this.seleccionarVenta(detalle);
                      this.modalVer();
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination justify-content-center">
            {renderPageNumbers}
          </ul>
        </nav>

        <Modal isOpen={this.state.modalVer}>
          <ModalHeader style={{ display: "block" }}>
            <span style={{ float: "right" }} onClick={() => this.modalVer()}>
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="numeroFactura">NUMERO FACTURA</label>{" "}
              <input
                className="form-control"
                type="text"
                name="numeroFactura"
                id="numeroFactura"
                readOnly
                value={form.numeroFactura || ""}
              />
              <br />
              <label htmlFor="descripcion">DESCRIPCION</label>
              <input
                className="form-control"
                type="text"
                name="descripcion"
                id="descripcion"
                readOnly
                value={form.descripcion || ""}
              />
              <br />
              <label htmlFor="nombreEmpleado">NOMBRE VENDEDOR</label>
              <input
                className="form-control"
                type="text"
                name="nombreEmpleado"
                id="nombreEmpleado"
                readOnly
                value={form.nombreEmpleado || ""}
              />
              <br />
              <label htmlFor="fecha">FECHA</label>
              <input
                className="form-control"
                type="text"
                name="fecha"
                id="fecha"
                readOnly
                value={form.fecha || ""}
              />
              <br />
              <label htmlFor="cantidad">CANTIDAD</label>
              <input
                className="form-control"
                type="number"
                name="cantidad"
                id="cantidad"
                readOnly
                value={form.cantidad || ""}
              />
              <br />
              <label htmlFor="precio">PRECIO</label>
              <input
                className="form-control"
                type="number"
                name="precio"
                id="precio"
                readOnly
                value={form.precio || ""}
              />
              <br />
              <label htmlFor="total">TOTAL</label>
              <input
                className="form-control"
                type="number"
                name="total"
                id="total"
                readOnly
                value={form.total || ""}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-primary" onClick={() => this.modalVer()}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TabVenta;
