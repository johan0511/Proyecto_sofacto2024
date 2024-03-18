import React, { Component } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "http://localhost:3000";

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      IdProducto: "",
      Nombre: "",
      Nombre_categoria_FK: "",
      Proveedor: "",
      Descripcion: "",
      Fecha: "",
      Estado: "",
      Precio: "",
      tipoModal: "",
    },
  };

  peticionGet = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    delete this.state.form.IdProducto;
    await axios
      .post("http://localhost:3000/crear", this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPut = () => {
    const { IdProducto, ...rest } = this.state.form;
    axios
      .put(`http://localhost:3000/actualizar/${IdProducto}`, rest)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet(); // Fetch updated data after the successful update
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionDelete = () => {
    axios
      .delete("http://localhost:3000/eliminar/" + this.state.form.IdProducto)
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

  seleccionarProducto = (Productos) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        ...Productos, // Copy all fields from Productos
        Fecha: Productos.Fecha.substring(0, 10), // Ensure Date format is YYYY-MM-DD
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
    this.peticionGet();
    this.setState({
      form: {
        ...this.state.form,
        tipoModal: "insertar", // Ensure tipoModal is set correctly
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
          Agregar Producto
        </Button>
        <br />
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>PRODUCTO</th>
              <th>CATEGORIA</th>
              <th>PROVEEDOR</th>
              <th>DESCRIPCION</th>
              <th>FECHA INGRESO</th>
              <th>ESTADO</th>
              <th>PRECIO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((Productos) => {
              return (
                <tr key={Productos.IdProducto}>
                  <td>{Productos.IdProducto}</td>
                  <td>{Productos.Nombre}</td>
                  <td>{Productos.Nombre_categoria_FK}</td>
                  <td>{Productos.Proveedor}</td>
                  <td>{Productos.Descripcion}</td>
                  <td>{Productos.Fecha}</td>
                  <td>{Productos.Estado}</td>
                  <td>
                    {new Intl.NumberFormat("en-EN").format(Productos.Precio)}
                  </td>
                  <td>
                    <Button
                      className="btn btn-primary"
                      onClick={() => {
                        this.seleccionarProducto(Productos);
                        this.modalInsertar();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    {"   "}
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarProducto(Productos);
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
              <label htmlFor="IdProducto">ID</label>
              <input
                className="form-control"
                type="text"
                name="IdProducto"
                id="IdProducto"
                readOnly
                onChange={this.handleChange}
                value={form.IdProducto || this.state.data.length + 1}
              />
              <br />
              <label htmlFor="Nombre">PRODUCTO</label>
              <input
                className="form-control"
                type="text"
                name="Nombre"
                id="Nombre"
                onChange={this.handleChange}
                value={form.Nombre || ""}
              />
              <br />
              <label htmlFor="Nombre_categoria_FK">CATEGORIA</label>
              <input
                className="form-control"
                type="text"
                name="Nombre_categoria_FK"
                id="Nombre_categoria_FK"
                onChange={this.handleChange}
                value={form.Nombre_categoria_FK || ""}
              />
              <br />
              <label htmlFor="Proveedor">PROVEEDOR</label>
              <input
                className="form-control"
                type="text"
                name="Proveedor"
                id="Proveedor"
                onChange={this.handleChange}
                value={form.Proveedor || ""}
              />
              <br />
              <label htmlFor="Descripcion">DESCRIPCION</label>
              <input
                className="form-control"
                type="text"
                name="Descripcion"
                id="Descripcion"
                onChange={this.handleChange}
                value={form.Descripcion || ""}
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
              <label htmlFor="Estado">ESTADO</label>
              <input
                className="form-control"
                type="text"
                name="Estado"
                id="Estado"
                onChange={this.handleChange}
                value={form.Estado || ""}
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
            Estás seguro que deseas eliminar a la empresa {form && form.Nombre}
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