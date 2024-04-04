import React, { Component } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const apiUrl = "http://localhost:3000/Cargos/";

class Emple extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {},
    tipoModal: "insertar",
  };

  peticionGet = () => {
    axios
      .get(apiUrl + "C")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    try {
      const response = await axios.post(apiUrl + "crear", this.state.form);

      if (response.status === 200) {
        this.peticionGet();
        this.modalInsertar();
        console.log("Dato agregado correctamente.");
      } else {
        console.log("Dato no cargado.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  peticionPut = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}actualizar/${this.state.form.Id}`,
        this.state.form
      );

      if (response.status === 200) {
        this.modalInsertar();
        this.peticionGet();
      } else {
        console.log(
          "Error al actualizar el cargo. Código de estado:",
          response.status
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  peticionDelete = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}eliminar/${this.state.form.Id}`
      );

      if (response.status === 200) {
        this.setState({ modalEliminar: false });
        this.peticionGet();
      } else {
        console.log(
          "Error al eliminar el cargo. Código de estado:",
          response.status
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarDato = (dato) => {
    this.setState({
      tipoModal: "actualizar",
      form: { ...dato },
    });
  };

  handleChange = (e) => {
    e.persist();
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      },
    }));
  };

  componentDidMount() {
    this.peticionGet();
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
          Agregar Cargo
        </Button>
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CARGO</th>
              <th>ESTADO ACTUAL</th>
              <th>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dato) => {
              return (
                <tr key={dato.Id}>
                  <td>{dato.Id}</td>
                  <td>{dato.Nombre}</td>
                  <td>{dato.Nombre_cargo}</td>
                  <td>{dato.Estado_actual}</td>
                  <td>
                    <Button
                      className="btn btn-primary"
                      onClick={() => {
                        this.seleccionarDato(dato);
                        this.modalInsertar();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    {"   "}
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarDato(dato);
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
              <label htmlFor="Id">ID</label>
              <input
                className="form-control"
                type="text"
                name="Id"
                id="Id"
                onChange={this.handleChange}
                value={form.Id || ""}
              />
              <br />
              <label htmlFor="Nombre">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="Nombre"
                id="Nombre"
                onChange={this.handleChange}
                value={form.Nombre || ""}
              />
              <br />
              <label htmlFor="Nombre_cargo">Cargo</label>
              <select
                className="form-control"
                name="Nombre_cargo"
                id="Nombre_cargo"
                onChange={this.handleChange}
                value={form.Nombre_cargo || ""}
              >
                <option value="">Seleccione un cargo</option>
                <option value="Administrador">Administrador</option>
                <option value="Empleado">Empleado</option>
              </select>
              <br />
              <label htmlFor="Estado_actual">Estado actual</label>
              <select
                className="form-control"
                name="Estado_actual"
                id="Estado_actual"
                onChange={this.handleChange}
                value={form.Estado_actual || ""}
              >
                <option value="">Seleccione un estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
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
            Estás seguro que deseas eliminar el cargo con ID {form.Id}
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

export default Emple;
