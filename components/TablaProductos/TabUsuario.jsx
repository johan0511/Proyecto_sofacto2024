import React, { Component } from "react";
import Swal from "sweetalert2";
import { Button } from "@nextui-org/react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class TabUsuario extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      IdTipo_identificacion: "",
      IdUsuario: "",
      Correo: "",
      Contrasena: "",
      Verificar_Contrasena: "",
      IdCargo: "",
      Tipo_identificacion: "",
    },
    tiposIdentificacion: [],
  };

  peticionGet = () => {
    axios
      .get("http://localhost:3000/usuario/ver_usuario")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  pGetSelect = () => {
    axios
      .get("http://localhost:3000/selectid/T")
      .then((res) => {
        this.setState({ tiposIdentificacion: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  peticionPost = async () => {
    try {
      const { Correo, IdUsuario, IdCargo } = this.state.form;

      if (!Correo.includes("@")) {
        Swal.fire(
          "",
          "El campo de correo debe contener el carácter @",
          "error"
        );
        return;
      }

      if (IdCargo !== "Administrador" && IdCargo !== "Empleado") {
        Swal.fire("", "Cargo no válido", "error");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/usuario/agregar",
        this.state.form
      );
      this.modalInsertar();
      this.peticionGet();
      Swal.fire({
        text: "Usuario creado exitosamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.refreshPage();
        }
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire("", "Hubo un problema al crear el usuario", "error");
    }
  };

  refreshPage = () => {
    window.location.reload();
  };

  peticionDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/usuario/eliminar/${this.state.form.IdUsuario}`
      );
      this.setState({ modalEliminar: false });
      this.peticionGet();
      Swal.fire({
        text: "Usuario eliminado exitosamente",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error.message);
      Swal.fire("", "Hubo un problema al eliminar el usuario", "error");
    }
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  };

  componentDidMount() {
    this.peticionGet();
    this.pGetSelect();
  }

  render() {
    const { form, tiposIdentificacion } = this.state;
    return (
      <div className="App">
        <br />
        <Button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: {} });
            this.modalInsertar();
          }}
        >
          Agregar Usuario
        </Button>
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Número de Identificación</th>
              <th>Correo</th>
              <th>Cargo</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((usuario) => {
              return (
                <tr key={usuario.IdUsuario}>
                  <td>{usuario.IdUsuario}</td>
                  <td>{usuario.Correo}</td>
                  <td>{usuario.IdCargo}</td>
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        this.setState({
                          form: { IdUsuario: usuario.IdUsuario },
                          modalEliminar: true,
                        });
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
          <ModalHeader>Agregar Usuario</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Tipo de Identificación:</label>
              <select
                className="form-control"
                name="IdTipo_identificacion"
                onChange={this.handleChange}
                value={form.IdTipo_identificacion || ""}
              >
                <option value="">SELECCIONE TIPO IDENTIFICACION</option>
                {tiposIdentificacion.map((Tipo_identificacion) => (
                  <option
                    key={Tipo_identificacion.IdTipo_identificacion}
                    value={Tipo_identificacion.IdTipo_identificacion}
                  >
                    {Tipo_identificacion.Tipo_identificacion}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Número de Identificación:</label>
              <input
                className="form-control"
                type="number"
                name="IdUsuario"
                onChange={this.handleChange}
                value={form.IdUsuario || ""}
              />
            </div>
            <div className="form-group">
              <label>Correo:</label>
              <input
                className="form-control"
                type="text"
                name="Correo"
                onChange={this.handleChange}
                value={form.Correo || ""}
              />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                className="form-control"
                type="password"
                name="Contrasena"
                onChange={this.handleChange}
                value={form.Contrasena || ""}
              />
            </div>
            <div className="form-group">
              <label>Verificar Contraseña:</label>
              <input
                className="form-control"
                type="password"
                name="Verificar_Contrasena"
                onChange={this.handleChange}
                value={form.Verificar_Contrasena || ""}
              />
            </div>
            <div className="form-group">
              <label>Cargo:</label>
              <select
                className="form-control"
                name="IdCargo"
                onChange={this.handleChange}
                value={form.IdCargo || ""}
              >
                <option value="">Seleccione un cargo</option>
                <option value="Administrador">Administrador</option>
                <option value="Empleado">Empleado</option>
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={this.peticionPost}>
              Insertar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalHeader>Eliminar Usuario</ModalHeader>
          <ModalBody>¿Está seguro de que desea eliminar el usuario?</ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={this.peticionDelete}>
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

export default TabUsuario;
