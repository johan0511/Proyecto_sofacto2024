import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { opcion } from "../../components/datos"
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../components/EyeSlashFilledIcon";
import logoempresa from "/src/img/logoempresa.png";
import React from "react";

export const IniciarSesion = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div>
      <header>
        <div className="logo">
          <link to="/"></link>
          <img src={logoempresa} alt="Logo" width={100} />
        </div>
      </header>
      <div className="fondo">
        <form className="form-inicio" id="login-form">
          <h1>Iniciar sesión</h1>
          <div className="registro">
            <div>
              <br />
              <Select
                isRequired
                label="Seleccione su cargo"
                placeholder="Seleccione su cargo"
                defaultSelectedKeys={["Administrador"]}
                className="respuesta"
              >
                {opcion.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Input
              isRequired
              type="email"
              label="Ingrese su correo"
              defaultValue="ejemplocorreo@gmail.com"
              className="respuesta"
            />
            <Input
              label="Contraseña"
              variant="contraseña"
              placeholder="Ingrese su contraseña"
              defaultValue="*********"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="respuesta"
            />
            <a href="./Recuperar_contraseña">¿Olvidaste tu contraseña?</a>
            <br />
            <button className="boton_link" type="submit">
              Iniciar sesión
            </button>
            O
            <Link to="/nuevousuario">
              <Button color="primary" variant="ghost">
                Registrarse
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
