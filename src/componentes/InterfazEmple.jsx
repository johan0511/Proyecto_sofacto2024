import { NavLink } from "react-router-dom";
import { Button } from "@nextui-org/button";
import logoempresa from "../img/logoempresa.png";
import Fact from "../img/LogoFac.jpeg";
import Inve from "../img/LogoInvent.jpeg";
import Avat from "../../components/TablaProductos/Empleado/Avatar_empleado";

const InterfazInvent = () => {
  return (
    <>
      <div className="nav">
        <img src={logoempresa} alt="Logo" className="navlg" />
        <div className="Avat">
          <Avat />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="QrpInv">
        <div>
          <h2 className="h2Invet">Interfaz Empleado</h2>
          <br />
          <br />
          <br />
        </div>
        <div className="ContIma">
          <NavLink to="/factura_empleado" activeClassName="active">
            <img className="ImgS" src={Fact} alt="Factura" />
            <h3 className="TextInv">Factura</h3>
          </NavLink>
        </div>
        <div className="ContIma">
          <NavLink to="/inventario_empleado" activeClassName="active">
            <img className="ImgS" src={Inve} alt="Inventario" />
            <h3 className="TextInv">Inventario</h3>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default InterfazInvent;
