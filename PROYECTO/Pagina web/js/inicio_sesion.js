// Array de usuarios quemados
var usuarios = [
  { cargo: "administrador", identificacion: "1012323864", contraseña: "adminpass" },
  { cargo: "empleado", identificacion: "1012323865", contraseña: "empleadopass" },
];

function validarFormulario() {
  var cargo = document.getElementById("cargo").value;
  var identificacion = document.getElementById("identificacion").value;
  var contraseña = document.getElementById("password-input").value;
  
  // Expresión regular para validar que la identificación contenga solo números
  var numeroRegex = /^[0-9]+$/;

  if (!cargo || !identificacion || !contraseña) {
    if (!cargo) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Selecciona tu cargo.'
      });
    }
    if (!identificacion) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingresa tu número de identificación.'
      });
    }
    if (!contraseña) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingresa tu contraseña.'
      });
    }
  } else {
    // Validar que la identificación contenga solo números
    if (!numeroRegex.test(identificacion)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La identificación debe contener solo números.'
      });
      return; // Detener la ejecución si la identificación no es válida
    }

    var usuarioValido = usuarios.find(function (usuario) {
      return usuario.cargo === cargo && usuario.identificacion === identificacion && usuario.contraseña === contraseña;
    });

    if (usuarioValido) {
      if (cargo === "administrador") {
        window.location.href = "../html/interfaz_administrador.html";
      } else if (cargo === "empleado") {
        window.location.href = "../html/Encargado_de_almacen.html";
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.'
      });
    }
  }
}