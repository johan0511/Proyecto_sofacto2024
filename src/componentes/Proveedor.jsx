import logoempresa from "../img/logoempresa.png";
import { Button } from "@nextui-org/button";
// import Table from "../../components/TablaProductos/App";
import Avat from "../../components/Avatar";
import App from "../../components/TablaProductos/Tabpro";
import { Link } from "react-router-dom";

export const Proveedor = () => {
  return (
    <>
      <div className="nav">
        <img src={logoempresa} alt="Logo" className="navlg" />
        <Link to="/factura">
          <Button className="BtnN" color="success" variant="shadow">
            Factura
          </Button>
        </Link>
        <Link to="/inventario">
          <Button className="BtnN" color="success" variant="shadow">
            Inventario
          </Button>
        </Link>
        <Link to="/venta">
          <Button className="BtnN" color="success" variant="shadow">
            Registro Ventas
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
      <br />
      <div className="tAbP">
        <App />
      </div>
    </>
  );
};
