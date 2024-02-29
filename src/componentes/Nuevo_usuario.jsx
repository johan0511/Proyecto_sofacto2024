import "../index.css";
import "../main";
import React from "react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../../components/EyeFilledIcon";
import { opcion } from "../../components/datos";
import { documents } from "../../components/documentos";
import { EyeSlashFilledIcon } from "../../components/EyeSlashFilledIcon";

export const RegistroUsuario = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="fondo">
      <form className="form-inicio1" id="login-form">
        <div className="registro">
          <h1>Registrarse</h1>
          <Select
            isRequired
            label="Tipo de documento"
            placeholder="Seleccione"
            defaultSelectedKeys={["OtroDocumento"]}
            className="respuesta1"
          >
            {documents.map((doc) => (
              <SelectItem key={doc.value} value={doc.value}>
                {doc.label}
              </SelectItem>
            ))}
          </Select>
          <Input
            isRequired
            type="name"
            label="Ingresa tus nombres completos "
            defaultValue="Juan Alberto"
            className="respuesta1"
          />
          <Input
            isRequired
            type="email"
            label="Email"
            defaultValue="junior@nextui.org"
            className="respuesta1"
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
            className="respuesta1"
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
            className="respuesta1"
          />
          <Select
            isRequired
            label="Seleccione su cargo"
            placeholder="Seleccione su cargo"
            defaultSelectedKeys={["Administrador"]}
            className="respuesta1"
          >
            {opcion.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Link to="/">
          <Button color="primary" variant="ghost">
            Registrarse
          </Button>
          </Link>
          O
          <Link to="/">
            <Button color="danger" variant="bordered">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
