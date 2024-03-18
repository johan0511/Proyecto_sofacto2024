import logoempresa from "../img/logoempresa.png";
import { Button } from "@nextui-org/button";
import Avat from "../../components/Avatar";
import App from "../../components/TablaProductos/TabVenta";
import { Link } from "react-router-dom";

export const Informe_venta = () => {
  return (
    <>
      <div className="nav">
        <img src={logoempresa} alt="Logo" className="navlg" />
        <Link to="#">
          <Button className="BtnN" color="success" variant="shadow">
            Factura
          </Button>
        </Link>
        <Link to="/inventario">
          <Button className="BtnN" color="success" variant="shadow">
            Inventario
          </Button>
        </Link>
        <Link to="7venta">
          <Button className="BtnN" color="success" variant="shadow">
            Registro Ventas
          </Button>
        </Link>
        <Link to="/">
          <Button className="BtnN" color="success" variant="shadow">
            Informe Ventas
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
