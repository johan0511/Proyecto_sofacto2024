import { User } from "@nextui-org/react";
import Swal from 'sweetalert2';

export default function Avatar() {
  const handleLogout = () => {
    Swal.fire({
      title: '¿Seguro que quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes poner la lógica para cerrar la sesión, por ejemplo:
        // window.location.href = 'http://localhost:3001/#';
        // O cualquier otra forma que utilices para cerrar la sesión en tu aplicación.
        console.log('Cerrar sesión');
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
        <a href="#" onClick={handleLogout}>
          Cerrar sesión
        </a>
      </li>
    </ul>
  );
}
