import logoempresa from "../img/logoempresa.png";
import { Button } from "@nextui-org/button";
// import Table from "../../components/TablaProductos/App";
import Avat from "../../components/Avatar";
import App from "../../components/TablaProductos/TabInventario";

export const Inventario = () => {
  return (
    <>
      <div className="nav">
        <img src={logoempresa} alt="Logo" className="navlg" />
        <Button className="BtnN" color="success" variant="shadow">
          Factura
        </Button>
        <Button className="BtnN" color="success" variant="shadow">
          Inventario
        </Button>
        <Button className="BtnN" color="success" variant="shadow">
          Registro Ventas
        </Button>
        <Button className="BtnN" color="success" variant="shadow">
          Informe Ventas
        </Button>
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
