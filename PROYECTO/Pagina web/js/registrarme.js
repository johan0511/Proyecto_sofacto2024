function validarFormulario() {
  const tipoDocumento = document.getElementById('cc').value;
  const numeroIdentificacion = document.getElementsByName('numero_identificacion')[0].value;
  const nombres = document.getElementsByName('nombres')[0].value;
  const correo = document.getElementsByName('correo')[0].value;
  const contrasena = document.getElementsByName('contrasena')[0].value;
  const confirmarContrasena = document.getElementsByName('confirmar_contrasena')[0].value;
  const cargo = document.getElementsByName('cargo')[0].value;

  if (tipoDocumento === 'cc' || numeroIdentificacion === '' || nombres === '' || correo === '' || contrasena === '' || confirmarContrasena === '' || cargo === '') {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debes completar todos los campos!',
    });
  } else if (contrasena !== confirmarContrasena) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Las contraseñas no coinciden!',
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'Tu registro se ha completado con éxito.',
      didClose: () => {
        window.location.href = '../html/inicio_sesion.html';
      },
    });
  }
}
