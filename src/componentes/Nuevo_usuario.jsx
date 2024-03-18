import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import Swal from "sweetalert2";

export const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    IdTipo_identificacion: "",
    IdUsuario: "",
    Correo: "",
    Contrasena: "",
    Verificar_Contrasena: "",
    IdCargo: "",
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleRegistro = async () => {
    // Verificar que todos los campos estén llenos
    for (const key in formData) {
      if (formData[key] === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor complete todos los campos",
        });
        return;
      }
    }

    // Verificar que las contraseñas coincidan
    if (formData.Contrasena !== formData.Verificar_Contrasena) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden. Por favor verifique.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/usuario/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Usuario creado correctamente",
        });
        setFormData({
          IdTipo_identificacion: "",
          IdUsuario: "",
          Correo: "",
          Contrasena: "",
          Verificar_Contrasena: "",
          IdCargo: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al crear el usuario",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fondo">
      <div className="registro">
        <form className="form-inicio1" id="login-form">
          <h1>Registrarse</h1>
          <Input
            isRequired
            label="Tipo de documento"
            placeholder="Escriba su tipo de documento"
            value={formData.IdTipo_identificacion}
            className="respuesta1"
            onChange={(e) => handleInputChange(e, "IdTipo_identificacion")}
          />
          <Input
            isRequired
            type="name"
            label="Ingresa tu numero de documento "
            value={formData.IdUsuario}
            className="respuesta1"
            onChange={(e) => handleInputChange(e, "IdUsuario")}
          />
          <Input
            isRequired
            type="email"
            label="Email"
            value={formData.Correo}
            className="respuesta1"
            onChange={(e) => handleInputChange(e, "Correo")}
          />
          <Input
            isRequired
            label="Contraseña"
            variant="password"
            placeholder="Ingrese su contraseña"
            value={formData.Contrasena}
            type="password"
            className="respuesta1"
            onChange={(e) => handleInputChange(e, "Contrasena")}
          />
          <Input
            isRequired
            label="Confirme su contraseña"
            variant="password"
            placeholder="Confirme su contraseña"
            value={formData.Verificar_Contrasena}
            type="password"
            className="respuesta1"
            onChange={(e) => handleInputChange(e, "Verificar_Contrasena")}
          />
          <Input
            isRequired
            label="Seleccione su cargo"
            placeholder="Seleccione su cargo"
            value={formData.IdCargo}
            className="respuesta1"
            onChange={(e) => handleInputChange(e, "IdCargo")}
          />
          <Button color="primary" variant="ghost" onClick={handleRegistro}>
            Registrarse
          </Button>
          <br /> O <br />
          <Link to="/">
            <Button color="danger" variant="bordered">
              Volver al inicio
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};
