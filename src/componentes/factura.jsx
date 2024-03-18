import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import Avat from "../../components/Avatar";
import TabFac from "../../components/TablaProductos/TabFactura";
import { Link } from "react-router-dom";
import { Input, Select, SelectSection, SelectItem } from "@nextui-org/react";
import logoempresa from "../img/logoempresa.png";
import axios from "axios";

export function Factura() {
  const [tipoId, setTipoId] = useState([]);

  useEffect(() => {
    pGetSelect();
  }, []);

  const pGetSelect = () => {
    axios
      .get("http://localhost:3000/id/Cle")
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
        <Link to="/">
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
      <div className="tAbFactura">
        <div className="imgFac">
          <img src={logoempresa} alt="Logo" width={100} />
        </div>
        <div className="dtacliente">
          <h3 className="Fac3">Detalles del cliente:</h3>
          <br />
          <Select
            name="Tipo_identificacion"
            id="Tipo_identificacion"
            label="Tipo de identificación"
            className="max-w-[300px]"
          >
           {tipoId.map((item, index) => (
          <SelectSection key={index} label={item.label}>
            {item.options && item.options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectSection>
          ))}
          </Select>
          <br />
          <br />
          <Input
            type="number"
            label="Numero de identificacion"
            className="max-w-[300px]"
            pattern="[0-9]*"
          />
          <br />
          <Input type="text" label="Nombre" className="max-w-[300px]" />
        </div>
        <div className="dtafactura">
          <h3 className="Fac3">Detalles de la Factura:</h3>
          <br />
          <Input
            type="text"
            label="N° Factura"
            className="max-w-[300px]"
            isDisabled
          />
          <br />
          <Input type="date" className="max-w-[300px]" />
          <br />
          <Select
            name=""
            id=""
            label="Metodo de pago"
            className="max-w-[300px]"
          ></Select>
          <br />
        </div>
        <div className="FacTab">
          <TabFac />
        </div>
      </div>
    </>
  );
}

