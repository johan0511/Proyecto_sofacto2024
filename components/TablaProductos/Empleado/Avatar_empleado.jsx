import React from "react";
import Swal from "sweetalert2";

export default function Avatar() {
  const handleLogout = () => {
    Swal.fire({
      title: "¿Seguro que quieres cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar datos de correo y contraseña del almacenamiento local
        localStorage.removeItem("user");
        // Redirigir a la página de inicio de sesión
        window.location.href = "/";
      }
    });
  };

  return (
    <ul className="menu">
      <li>
        <a href="#" onClick={handleLogout}>
          Cerrar sesión
        </a>
      </li>
    </ul>
  );
}
