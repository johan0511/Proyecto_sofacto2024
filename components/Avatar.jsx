import Swal from "sweetalert2";

export default function Avat() {
  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar datos de usuario del almacenamiento local
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    });
  };

  return (
    <ul className="menu">
      <li>
        <a href="http://localhost:3001/proveedor" className="">
          Proveedores
        </a>
      </li>
      <li>
        <a href="http://localhost:3001/empleados" className="">
          Gestionar empleados
        </a>
      </li>
      <li>
        <a href="http://localhost:3001/registrarusuario" className="">
          Gestionar usuarios
        </a>
      </li>
      <li>
        <a href="#" onClick={handleLogout}>
          Cerrar sesión
        </a>
      </li>
    </ul>
  );
}
