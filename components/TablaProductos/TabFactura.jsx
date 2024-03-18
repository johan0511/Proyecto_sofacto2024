import React, { Component } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class TabFactura extends Component {
  state = {
    tipoId: [],
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      IdFactura: "",
      IdProducto_FK: "",
      Cantidad_productos: "",
      Precio_producto: "",
      Total_pagar: "",
      Fecha_venta: "",
      IdMetodo_pago_FK: "",
      IdCliente_FK: "",
      tipoModal: "insertar",
    },
    productNames: {}, // Agregar objeto para almacenar los nombres de los productos
  };

  pGetSelect = () => {
    axios
      .get("http://localhost:3000/id/Cle")
      .then((res) => {
        if (Array.isArray(res.data)) {
          this.setState({ tipoId: res.data });
        } else if (res.data && Object.keys(res.data).length === 0) {
          console.error("La respuesta está vacía.");
        } else {
          console.error("La respuesta no es un array:", res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  peticionGet = () => {
    axios
      .get("http://localhost:3000/fact/F")
      .then((response) => {
        const productNames = {};
        response.data.forEach((factura) => {
          productNames[factura.IdProducto_FK] = factura.NombreProducto;
        });
        this.setState({
          data: response.data,
          productNames: productNames,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    const { form } = this.state;
    try {
      delete form.IdFactura;
      const response = await axios.post(
        "http://localhost:3000/fact/crear",
        form
      );
      console.log(response.data);
      this.modalInsertar();
      this.peticionGet();
    } catch (error) {
      console.log(error.message);
    }
  };

  peticionPut = async () => {
    const { form } = this.state;
    const { IdFactura, ...rest } = form;
    await axios
      .put(`http://localhost:3000/fact/actualizar/${IdFactura}`, rest)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionDelete = async () => {
    const { form } = this.state;
    await axios
      .delete(`http://localhost:3000/fact/eliminar/${form.IdFactura}`)
      .then((response) => {
        this.setState({ modalEliminar: false });
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarProducto = (Factura) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        ...Factura,
        Fecha_venta: Factura.Fecha_venta ? Factura.Fecha_venta.substring(0, 10) : "",
      },
    });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  componentDidMount() {
    this.pGetSelect();
    this.peticionGet();
  }

  render() {
    const { form, tipoId, productNames } = this.state;
    return (
      <div className="App">
        <br />
        <Button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: {}, tipoModal: "insertar" });
            this.modalInsertar();
          }}
        >
          Agregar Producto
        </Button>
        <br />
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>DESCRIPCION</th>
              <th>CANTIDAD</th>
              <th>PRECIO UNITARIO</th>
              <th>TOTAL</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((Factura) => {
              return (
                <tr key={Factura.IdFactura}>
                  <td>{productNames[Factura.IdProducto_FK]}</td>
                  <td>{Factura.Cantidad_productos}</td>
                  <td>{Factura.Precio_producto}</td>
                  <td>{Factura.Total_pagar}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(Factura.Precio)}</td>
                  <td>
                    <Button
                      className="btn btn-primary"
                      onClick={() => {
                        this.seleccionarProducto(Factura);
                        this.modalInsertar();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    {"   "}
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarProducto(Factura);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: "block" }}>
            <span
              style={{ float: "right" }}
              onClick={() => this.modalInsertar()}
            >
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="IdFactura">ID</label>
              <input
                className="form-control"
                type="text"
                name="IdFactura"
                id="IdFactura"
                readOnly
                onChange={this.handleChange}
                value={form.IdFactura || this.state.data.length + 1}
              />
              <br />
              <label htmlFor="IdProducto_FK">PRODUCTO</label>
              <input
                className="form-control"
                type="text"
                name="IdProducto_FK"
                id="IdProducto_FK"
                onChange={this.handleChange}
                value={form.IdProducto_FK || ""}
              />
              <br />
              <label htmlFor="Cantidad_productos">CANTIDAD DE PRODUCTOS</label>
              <br />
              <input
                className="form-control"
                type="number"
                name="Cantidad_productos"
                id="Cantidad_productos"
                onChange={this.handleChange}
                value={form.Cantidad_productos || ""}
              />
              <br />
              <label htmlFor="Precio_producto">PRECIO PRODUCTO</label>
              <input
                className="form-control"
                type="number"
                name="Precio_producto"
                id="Precio_producto"
                onChange={this.handleChange}
                value={form.Precio_producto || ""}
              />
              <br />
              <label htmlFor="Total_pagar">TOTAL A PAGAR</label>
              <input
                className="form-control"
                type="number"
                name="Total_pagar"
                id="Total_pagar"
                onChange={this.handleChange}
                value={form.Total_pagar || ""}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal === "insertar" ? (
              <Button
                className="btn btn-success"
                onClick={() => this.peticionPost()}
              >
                Insertar
              </Button>
            ) : (
              <Button
                className="btn btn-primary"
                onClick={() => this.peticionPut()}
              >
                Actualizar
              </Button>
            )}
            <Button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar a la empresa {form && form.IdFactura}
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-danger"
              onClick={() => this.peticionDelete()}
            >
              Sí
            </Button>
            <Button
              className="btn btn-secondary"
              onClick={() => this.setState({ modalEliminar: false })}
            >
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TabFactura;
