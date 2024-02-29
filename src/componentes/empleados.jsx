import logoempresa from "../img/logoempresa.png";
import { Button } from "@nextui-org/button";
import Table from "../../components/Empleados";

import Avat from "../../components/Avatar";

const empleados = () => {
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
      <div className="qrp">
        <Button className="BtnP" color="primary" variant="shadow">
          Agregar empleado
        </Button>
        <div className="tAb">
          <Table />
        </div>
      </div>
    </>
  );
};

export default empleados;
