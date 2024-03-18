import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const url = "http://localhost:3000/Ventas/";

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      Idventas: "",
      Producto: "",
      Fecha: "",
      cantidad: "",
      Precio: "",
      Total: "",
      tipoModal: "",
    },
  };

  peticionGet = () => {
    axios
      .get(url + "venta")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    delete this.state.form.Idventas;
    await axios
      .post(url + "crear", this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
        Swal.fire({
          text: "",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPut = async () => {
    await axios
      .put(url + "actualizar/" + this.state.form.Idventas, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
        Swal.fire({
          text: "",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionDelete = () => {
    axios
      .delete(url + "eliminar/" + this.state.form.Idventas)
      .then((response) => {
        this.setState({ modalEliminar: false });
        this.peticionGet();
        Swal.fire({
          text: "Eliminado correctamente",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarProducto = (venta) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        ...venta,
        Fecha: venta.Fecha.substring(0, 10),
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

    const { cantidad, Precio } = this.state.form;
    if (cantidad !== "" && Precio !== "") {
      const total = parseInt(cantidad) * parseInt(Precio);
      this.setState({
        form: {
          ...this.state.form,
          Total: total,
        },
      });
    }
  };

  componentDidMount() {
    this.peticionGet();
    this.setState({
      form: {
        ...this.state.form,
        tipoModal: "insertar",
      },
    });
  }

  render() {
    const { form } = this.state;
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
          Agregar Venta
        </Button>
        <br />
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>PRODUCTO</th>
              <th>FECHA</th>
              <th>CANTIDAD</th>
              <th>PRECIO</th>
              <th>TOTAL</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(this.state.data) &&
              this.state.data.map((venta) => {
                return (
                  <tr key={venta.Idventas}>
                    <td>{venta.Idventas}</td>
                    <td>{venta.Producto}</td>
                    <td>{venta.Fecha}</td>
                    <td>{venta.cantidad}</td>
                    <td>
                      {new Intl.NumberFormat("en-EN").format(venta.Precio)}
                    </td>
                    <td>
                      {new Intl.NumberFormat("en-EN").format(venta.Total)}
                    </td>
                    <td>
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          this.seleccionarProducto(venta);
                          this.modalInsertar();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      {"   "}
                      <Button
                        className="btn btn-danger"
                        onClick={() => {
                          this.seleccionarProducto(venta);
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
              <label htmlFor="Idventas">ID</label>
              <input
                className="form-control"
                type="text"
                name="Idventas"
                id="Idventas"
                readOnly
                onChange={this.handleChange}
                value={form.Idventas || this.state.data.length + 1}
              />
              <br />
              <label htmlFor="Producto">PRODUCTO</label>
              <input
                className="form-control"
                type="text"
                name="Producto"
                id="Producto"
                onChange={this.handleChange}
                value={form.Producto || ""}
              />
              <br />
              <label htmlFor="Fecha">FECHA</label>
              <input
                className="form-control"
                type="date"
                name="Fecha"
                id="Fecha"
                onChange={this.handleChange}
                value={form.Fecha || ""}
              />
              <br />
              <label htmlFor="cantidad">CANTIDAD</label>
              <input
                className="form-control"
                type="number"
                name="cantidad"
                id="cantidad"
                onChange={this.handleChange}
                value={form.cantidad || ""}
              />
              <br />
              <label htmlFor="Precio">PRECIO</label>
              <input
                className="form-control"
                type="number"
                name="Precio"
                id="Precio"
                onChange={this.handleChange}
                value={form.Precio || ""}
              />
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
            Estás seguro que deseas eliminar la venta de ID:{" "}
            {form && form.Idventas}
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

export default App;
