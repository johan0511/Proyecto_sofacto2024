import React, { useState } from "react";
import Swal from "sweetalert2";
import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { EyeFilledIcon } from "../../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../components/EyeSlashFilledIcon";
import logoempresa from "/src/img/logoempresa.png";

export const IniciarSesion = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

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

      const response = await fetch("http://localhost:3000/login/logeo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      if (response.ok) {
        console.log("Inicio de sesión exitoso");
        const data = await response.json();
        const cargo = data.usuario.IdCargo;

        // Guardar los datos del usuario en el almacenamiento local
        localStorage.setItem("user", JSON.stringify({ formData }));

        let redirectPath = "/menu"; // Ruta predeterminada de redirección

        if (cargo === "Administrador") {
          redirectPath = "/menuadmin";
        } else if (cargo === "Empleado") {
          redirectPath = "/menuemple";
        }

        Swal.fire({
          icon: "success",
          title: "¡Bienvenido de vuelta!",
          text: `Estimado: ${cargo}`,
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.href = redirectPath; // Redirigir a la ruta correspondiente
        });
      } else {
        console.error("Credenciales incorrectas");
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Credenciales incorrectas",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/">
            <img src={logoempresa} alt="Logo" width={100} />
          </Link>
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
            <br />
            <Button color="primary" variant="ghost" type="submit">
              Iniciar sesión
            </Button>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
