import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import Avat from "../../../components/TablaProductos/Empleado/Avatar_empleado";
import TabFac from "../../../components/TablaProductos/Empleado/TabFactura_empleado";
import { Link } from "react-router-dom";
import { Input, Select, SelectSection, SelectItem } from "@nextui-org/react";
import logoempresa from "../../img/logoempresa.png";
import axios from "axios";

function Factura() {
  const [tipoId, setTipoId] = useState([]);

  useEffect(() => {
    pGetSelect();
  }, []);

  const pGetSelect = () => {
    axios
      .get("http://localhost:3000/selectid/T")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTipoId(res.data);
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

  return (
    <>
      {" "}
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
      <div className="tAbFactura">
        <TabFac />
      </div>
      <br />
    </>
  );
}

export default Factura;
