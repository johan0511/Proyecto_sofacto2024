import React, { Component } from "react";
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
    delete this.state.form.id;
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
    axios.put(url + this.state.form.id, this.state.form).then((response) => {
      this.modalInsertar();
      this.peticionGet();
    });
  };

  peticionDelete = () => {
    axios.delete(url + this.state.form.id).then((response) => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarProducto = (Productos) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        IdProducto: Productos.id,
        Nombre: Productos.Nombre,
        Nombre_categoria_FK: Productos.Nombre_categoria_FK,
        Proveedor: Productos.Proveedor,
        Descripcion: Productos.Descripcion,
        Fecha: Productos.Fecha,
        Estado: Productos.Estado,
        Precio: Productos.Precio,

        // id: Producto.id,
        // nombre: empresa.nombre,
        // pais: empresa.pais,
        // capital_bursatil: empresa.capital_bursatil,
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
        tipoModal: "insertar", // Asegurar que el tipoModal se establezca correctamente
      },
    });
  }

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <br />
        <button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: {}, tipoModal: "insertar" });
            this.modalInsertar();
          }}
        >
          Agregar Producto
        </button>
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
              <th>PRECIO</th>
              <th>ESTADO</th>
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
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.seleccionarEmpresa(Productos);
                        this.modalInsertar();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarEmpresa(Productos);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
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
              {/* <label htmlFor="IdProducto">ID</label>
              <input
                className="form-control"
                type="text"
                name="IdProducto"
                id="IdProducto"
                readOnly
                onChange={this.handleChange}
                value={form.IdProducto || this.state.data.length + 1}
              /> */}
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
              <button
                className="btn btn-success"
                onClick={() => this.peticionPost()}
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.peticionPut()}
              >
                Actualizar
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar a la empresa {form && form.Nombre}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.peticionDelete()}
            >
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => this.setState({ modalEliminar: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
