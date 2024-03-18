import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import logoempresa from "/src/img/logoempresa.png";

const RecuperarContraseña = () => {
  const [correo, setCorreo] = useState("");
  const [codigoRecuperacion, setCodigoRecuperacion] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCorreo(e.target.value);
    setError("");
  };

  const handleRecuperarContraseña = async (e) => {
    e.preventDefault();

    try {
      // Validar que el campo de correo no esté vacío y tenga un formato válido
      if (!correo.trim()) {
        setError("Por favor ingrese su correo electrónico.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/recuperar_contrasena/actualizar",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCodigoRecuperacion(data.codigoRecuperacion);
        setError(""); // Resetear el mensaje de error si la solicitud es exitosa
        // Enviar correo electrónico con el código de recuperación
        const correoResponse = await fetch(
          "http://localhost:3000/recuperar_contrasena/recuperar_contrasena",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo, codigoRecuperacion }),
          }
        );
        if (!correoResponse.ok) {
          setError("Error al enviar el correo de recuperación.");
        }
      } else {
        setError("Error al enviar el correo de recuperación.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error al enviar el correo de recuperación.");
    }
  };

  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/"></Link>
          <img src={logoempresa} alt="Logo" width={100} />
        </div>
      </header>
      <div className="fondo">
        <div className="registro">
          <form
            className="form-inicio0"
            id="reset-password-form"
            onSubmit={handleRecuperarContraseña}
          >
            <h1>¿Olvidaste tu contraseña?</h1>
            <Input
              isRequired
              type="email"
              label="Ingrese su correo electrónico"
              className="respuesta"
              value={correo}
              onChange={handleInputChange}
              name="Correo"
              errorMessage={error} // Mostrar mensaje de error si hay un error de validación
            />
            <Button color="primary" variant="ghost" type="submit">
              Recuperar contraseña
            </Button>
            <br />
            {codigoRecuperacion && (
              <>
                <p>
                  Código de recuperación de contraseña enviado:{" "}
                  {codigoRecuperacion}
                </p>
                <br />
              </>
            )}
            <Link to="/login">Volver al inicio de sesión</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContraseña;
