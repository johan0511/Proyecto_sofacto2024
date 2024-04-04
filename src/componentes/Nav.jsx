import logoempresa from "../img/logoempresa.png";
import "../index.css";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
// import { BrowserRouter, Routes outlet, Route, link} from "react-router-dom";

export const Nav = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <link to="/"></link>
          <img src={logoempresa} alt="Logo" width={100} />
          <ul className="info">
            <Link to="/">
            <li>Inicio</li>
            </Link>
            <Link to="/contacto">
            <li>Contacto</li>
            </Link>
          </ul>
          <ul>
            <div className="login">
              <li>
                <Link to="./login">Iniciar sesion</Link>
              </li>
            </div>
          </ul>
        </div>
      </header>
      <div className="cuerp">
        <img className="initl" src={logoempresa} alt="Logo de la empresa" />
        <div className="contp">
          <div className="textp">
            <p className="pcuerp">
              ¿Que es SOFACTO? <br />
              SOFACTO. es el software definitivo para simplificar tus procesos
              de facturación, control <br />
              de inventario y registro de ventas. Con una interfaz amigable y de
              fácil uso, SOFACTO. <br />
              te permite automatizar tus tareas diarias y enfocarte en lo que
              realmente importa: hacer crecer tu negocio.
              <br />
              <br />
              ¿Te preocupa la complejidad del proceso de facturación?
              <br />
              <br />
              Con este software podrás generar facturas de manera rápida y
              sencilla, sin tener que preocuparte por errores o demoras.
            </p>
          </div>
        </div>
      </div>
      <div>
        <footer>
          <div className="contacto">
            <h3>Contacto</h3>
            <h4 className="inf">
              Correo electrónico: johancasilimas@gmail.com
            </h4>
            <h4 className="inf">Teléfono: 3112599859</h4>
            <h4 className="inf">
              Dirección: Plaza paloquemao - Sección de quesos
            </h4>
          </div>
        </footer>
      </div>
    </div>
  );
};
