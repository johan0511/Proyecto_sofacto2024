import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { EyeFilledIcon } from "../../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../components/EyeSlashFilledIcon";
import logoempresa from "/src/img/logoempresa.png";

export const IniciarSesion = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    correo: "", // Cambiado a 'correo' para que coincida con el nombre en el backend
    contrasena: "", // Cambiado a 'contrasena' para que coincida con el nombre en el backend
  });
  const [isDecrypting, setIsDecrypting] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { correo, contrasena } = formData;
      console.log("Iniciando sesión...");

      // Hacer solicitud HTTP a la API para validar las credenciales
      const response = await fetch("http://localhost:3000/login/logeo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasena }), // Enviar correo y contraseña al backend
      });

      if (response.ok) {
        console.log("Inicio de sesión exitoso");

        // Obtener el cargo del usuario desde la respuesta del backend
        const data = await response.json();
        const cargo = data.usuario.IdCargo; // Suponiendo que el campo se llama 'IdCargo'

        // Redireccionar a la página correspondiente según el cargo
        if (cargo === "Administrador") {
          window.location.href = "/menu"; // Por ejemplo, si el cargo es 'admin'
        } else if (cargo === "Empleado") {
          window.location.href = "/menu"; // Por ejemplo, si el cargo es 'empleado'
        }
      } else {
        console.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/"><img src={logoempresa} alt="Logo" width={100} /></Link>
        </div>
      </header>
      <div className="fondo">
        <div className="registro">
          <form className="form-inicio0" id="login-form" onSubmit={handleLogin}>
            <h1>Iniciar sesión</h1>
            <Input
              isRequired
              type="email"
              label="Ingrese su correo"
              className="respuesta"
              onChange={(e) => handleInputChange(e, "correo")}
              name="correo"
            />
            <Input
              label="Contraseña"
              variant="contraseña"
              placeholder="Ingrese su contraseña"
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
              onChange={(e) => handleInputChange(e, "contrasena")}
              name="contrasena"
            />
            <a href="/contrasena">¿Olvidaste tu contraseña?</a>
            <br />
            {isDecrypting && <p>Sesión iniciada</p>}
            <br />
            <Button color="primary" variant="ghost" type="submit">
              Iniciar sesión
            </Button>
            <br />
            O
            <br />
            <Link to="/nuevousuario">
              <Button color="primary" variant="ghost">
                Registrarse
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
