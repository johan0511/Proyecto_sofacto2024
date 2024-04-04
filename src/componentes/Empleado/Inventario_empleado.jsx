import logoempresa from "../../img/logoempresa.png";
import { Button } from "@nextui-org/button";
// import Table from "../../components/TablaProductos/App";
import Avat from "../../../components/TablaProductos/Empleado/Avatar_empleado";
import App from "../../../components/TablaProductos/TabInventario";
import { Link } from "react-router-dom";

 const Inventario = () => {
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
      <div className="tAb">
        <App />
      </div>
    </>
  );
};

export default Inventario;
