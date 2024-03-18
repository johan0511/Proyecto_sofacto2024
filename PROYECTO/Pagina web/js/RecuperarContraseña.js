const usuariosPermitidos = [
  'usuario@ejejemplo.com',
];

function validarFormulario() {
  const correo = document.querySelector('input[name="correo"]').value;
  
  if (usuariosPermitidos.includes(correo)) {
    Swal.fire({
      icon: 'success',
      title: 'Correo válido',
      text: 'Se enviará un correo de recuperación de contraseña.',
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Correo no válido',
      text: 'Verifica la dirección de correo electrónico.',
    });
  }
}
