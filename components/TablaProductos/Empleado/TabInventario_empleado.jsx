import React, { Component } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "http://localhost:3000";

class App extends Component {
  state = {
    proveedores: [],
    categoria: [],
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    modalAgregarCantidad: false,
    form: {
      IdProducto: "",
      Nombre: "",
      Nombre_categoria_FK: "",
      Proveedor: "",
      Descripcion: "",
      Fecha: "",
      Estado: "",
      Precio: "",
      cantidadAgregar: "",
    },
    productosAgrupados: [],
    currentPage: 1,
    productsPerPage: 6,
    searchTerm: "",
  };

  GetSelectP = () => {
    axios
      .get(`${url}/proveedores/P`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          this.setState({ proveedores: res.data });
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

  pGetSelect = () => {
    axios
      .get(`${url}/select/S`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          this.setState({ categoria: res.data });
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
      .get(`${url}/`)
      .then((response) => {
        const productos = response.data;

        const dataActualizada = productos.reduce((acc, producto) => {
          const { IdProducto, Nombre, Descripcion, ...rest } = producto;
          const existingProductIndex = acc.findIndex(
            (item) => item.Nombre === Nombre
          );
          if (existingProductIndex !== -1) {
            acc[existingProductIndex].Descripcion += parseFloat(Descripcion);
          } else {
            acc.push({
              IdProducto,
              Nombre,
              Descripcion: parseFloat(Descripcion),
              ...rest,
            });
          }
          return acc;
        }, []);

        const productosAgrupados = productos.reduce((acc, producto) => {
          const { Nombre, Descripcion } = producto;
          if (acc[Nombre]) {
            acc[Nombre].Cantidad += parseFloat(Descripcion);
          } else {
            acc[Nombre] = { ...producto, Cantidad: parseFloat(Descripcion) };
          }
          return acc;
        }, {});

        // Actualizar el estado de los productos
        const dataActualizadaConEstado = dataActualizada.map((producto) => ({
          ...producto,
          Estado: producto.Descripcion > 0 ? "Disponible" : "Agotado",
        }));

        this.setState({
          data: dataActualizadaConEstado,
          productosAgrupados: Object.values(productosAgrupados),
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPut = async () => {
    const { form } = this.state;
    const currentDate = new Date().toISOString().split("T")[0];
    try {
      await axios.put(`${url}/actualizar-producto/${form.IdProducto}`, {
        ...form,
        Fecha: currentDate,
      });
      this.modalInsertar();
      this.peticionGet();
      Swal.fire({
        title: "Éxito",
        text: "El producto se ha modificado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
      if (form.Descripcion <= 10) {
        alert(
          `El producto ${form.Nombre} sigue con pocas unidades, haz un nuevo pedido.`
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  agregarCantidad = () => {
    const { IdProducto, cantidadAgregar } = this.state.form;

    axios
      .put(`http://localhost:3000/agregar-cantidad/${IdProducto}`, {
        cantidad: cantidadAgregar,
      })
      .then((response) => {
        this.setState((prevState) => ({
          modalAgregarCantidad: false,
          data: prevState.data.map((producto) =>
            producto.IdProducto === IdProducto
              ? {
                  ...producto,
                  Descripcion:
                    producto.Descripcion + parseFloat(cantidadAgregar),
                  Estado:
                    producto.Descripcion + parseFloat(cantidadAgregar) > 0
                      ? "Disponible"
                      : "Agotado",
                }
              : producto
          ),
        }));

        // Mostrar la alerta de SweetAlert
        Swal.fire({
          title: "¡Cantidad agregada!",
          text: "La cantidad ha sido agregada correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionDelete = async () => {
    const { form } = this.state;
    try {
      await axios.delete(`${url}/eliminar-producto/${form.IdProducto}`);
      this.setState((prevState) => ({
        modalEliminar: false,
        data: prevState.data.filter(
          (producto) => producto.IdProducto !== form.IdProducto
        ),
      }));
      Swal.fire({
        title: "Éxito",
        text: "El producto se ha eliminado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  peticionPost = async () => {
    delete this.state.form.IdProducto;
    const currentDate = new Date().toISOString().split("T")[0];
    this.setState({
      form: {
        ...this.state.form,
        Fecha: currentDate,
      },
    });
    await axios
      .post(`${url}/crear`, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
        Swal.fire({
          title: "Éxito",
          text: "El producto se agregó correctamente",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarProducto = (Productos) => {
    const { Id_categoria, ...rest } = Productos;

    const fecha = new Date(Productos.Fecha);
    const day = fecha.getDate().toString().padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[fecha.getMonth()];
    const year = fecha.getFullYear();
    const formattedFecha = `${day}-${month}-${year}`;
    this.setState({
      form: {
        ...rest,
        Nombre_categoria_FK: Id_categoria,
        Fecha: formattedFecha,
      },
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    let estado = this.state.form.Estado;

    if (name === "Descripcion") {
      const cantidad = parseInt(value);
      estado = cantidad > 0 ? "Disponible" : "Agotado";
    }

    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
        Estado: estado,
      },
    });
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  componentDidMount() {
    this.GetSelectP();
    this.pGetSelect();
    this.peticionGet();
    this.setState({
      form: {
        ...this.state.form,
        tipoModal: "insertar",
      },
    });
  }

  render() {
    const { form, currentPage, productsPerPage, searchTerm } = this.state;
    const filteredData = this.state.data.filter((product) =>
      product.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredData.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(filteredData.length / productsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => (
      <li
        key={number}
        className={`page-item ${currentPage === number ? "active" : ""}`}
      >
        <a onClick={() => paginate(number)} href="#" className="page-link">
          {number}
        </a>
      </li>
    ));

    return (
      <div className="App">
        <br />
        <div className="table-container">
          <Button
            className="btn btn-success"
            onClick={() => {
              this.setState({ form: {} });
              this.modalInsertar();
            }}
          >
            Agregar Producto
          </Button>
          <input
            className="buscar-cont"
            type="text"
            placeholder="Buscar por nombre del producto"
            value={searchTerm}
            onChange={this.handleSearch}
          />
          <br />
          <br />
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>PRODUCTO</th>
                <th>CATEGORIA</th>
                <th>PROVEEDOR</th>
                <th>CANTIDAD</th>
                <th>FECHA INGRESO</th>
                <th>ESTADO</th>
                <th>PRECIO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((Productos) => {
                return (
                  <tr key={Productos.IdProducto}>
                    <td>{Productos.IdProducto}</td>
                    <td>{Productos.Nombre}</td>
                    <td>{Productos.Nombre_categoria}</td>
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
                        className="btn btn-success"
                        onClick={() => {
                          this.seleccionarProducto(Productos);
                          this.setState({ modalAgregarCantidad: true });
                        }}
                      >
                        <FontAwesomeIcon icon={faPlusCircle} />
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
          {currentProducts.map((Productos) => {
            if (Productos.Descripcion <= 10) {
              return (
                <div key={Productos.IdProducto} className="alert alert-warning">
                  <p>
                    El producto "{Productos.Nombre}" le quedan pocas unidades,
                    haz un nuevo pedido.
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {renderPageNumbers}
          </ul>
        </nav>

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
              <select
                onChange={this.handleChange}
                name="Nombre_categoria_FK"
                id="Nombre_categoria_FK"
                className="form-control"
                value={form.Nombre_categoria_FK || ""}
              >
                <option value="">SELECCIONE UNA CATEGORIA</option>
                {this.state.categoria.map((categoria) => (
                  <option
                    key={categoria.Id_categoria}
                    value={categoria.Id_categoria}
                  >
                    {categoria.Nombre_categoria}
                  </option>
                ))}
              </select>
              <br />
              <label htmlFor="Proveedor">PROVEEDOR</label>
              <select
                className="form-control"
                name="Proveedor"
                id="Proveedor"
                onChange={this.handleChange}
                value={form.Proveedor || ""}
              >
                <option value="">SELECCIONE UN PROVEEDOR</option>
                {this.state.proveedores.map((proveedor) => (
                  <option key={proveedor.IdProveedor} value={proveedor.Empresa}>
                    {proveedor.Empresa}
                  </option>
                ))}
              </select>
              <br />
              <label htmlFor="Descripcion">CANTIDAD</label>
              <input
                className="form-control"
                type="number"
                name="Descripcion"
                id="Descripcion"
                onChange={this.handleChange}
                value={form.Descripcion || ""}
              />
              <br />
              <label htmlFor="Fecha">FECHA INGRESO</label>
              <input
                className="form-control"
                type="text"
                name="Fecha"
                id="Fecha"
                value={form.Fecha || ""}
                readOnly
              />
              <br />
              <label htmlFor="Estado">ESTADO</label>
              <select
                className="form-control"
                name="Estado"
                id="Estado"
                onChange={this.handleChange}
                value={form.Estado || ""}
                disabled
              >
                <option value="">{form.Estado}</option>
              </select>
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
            {form.IdProducto ? (
              <Button
                className="btn btn-primary"
                onClick={() => this.peticionPut()}
              >
                Actualizar
              </Button>
            ) : (
              <Button
                className="btn btn-success"
                onClick={() => this.peticionPost()}
              >
                Insertar
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
            Estás seguro que deseas eliminar el producto {form && form.Nombre}
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

        <Modal isOpen={this.state.modalAgregarCantidad}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="cantidadAgregar">Cantidad a agregar:</label>
              <input
                className="form-control"
                type="number"
                name="cantidadAgregar"
                id="cantidadAgregar"
                onChange={this.handleChange}
                value={form.cantidadAgregar || ""}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-success"
              onClick={() => this.agregarCantidad()}
            >
              Agregar
            </Button>
            <Button
              className="btn btn-secondary"
              onClick={() => this.setState({ modalAgregarCantidad: false })}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
