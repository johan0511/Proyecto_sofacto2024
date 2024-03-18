import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";
import logoempresa from "../img/logoempresa.png";
import Fact from "../img/Fact.jpg";
import Inve from "../img/inventario.jpg";
import Rventa from "../img/Rventa.jpg";
import InformeV from "../img/InformeV.jpg";
import Avat from "../../components/Avatar";

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
          <h2 className="h2Invet">Interfaz Administrador</h2>
          <br />
          <br />
          <br />
        </div>
        <div className="ContIma">
          <Link>
            <img className="ImgS" src={Fact} />
            <h3 className="TextInv">Factura</h3>
          </Link>
        </div>
        <div className="ContIma">
          <Link>
            <img className="ImgS" src={Inve} />
            <h3 className="TextInv">Inventario</h3>
          </Link>
        </div>
        <div className="ContIma">
          <Link >
            <img className="ImgS" src={InformeV} />
            <h3 className="TextInv">Informe Venta</h3>
          </Link>
        </div>
        <div className="ContIma">
          <Link>
            <img className="ImgS" src={Rventa} />
            <h3 className="TextInv">Registro Ventas</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default InterfazInvent;