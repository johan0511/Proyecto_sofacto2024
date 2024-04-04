import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";
import logoempresa from "../img/logoempresa.png";
import Avatar from "../../components/Avatar";
import TabEmpleados from "../../components/TablaProductos/TabEmpleados";

const Empleados = () => {
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
          <Avatar />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="tAb">
        <TabEmpleados />
      </div>
    </>
  );
};

export default Empleados;
