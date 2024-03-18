function validarFormulario(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener los valores de los campos del formulario
    var identificacion = document.getElementById("identificacion").value;
    var producto = document.getElementById("producto").value;
    var cantidad = document.getElementById("cantidad").value;
    var categoria = document.getElementById("categoria").value;
    var fechaVencimiento = document.getElementById("fechaVencimiento").value;
    var descripcion = document.getElementById("descripcion").value;
    var precio = document.getElementById("precio").value;

    // Verificar que todos los campos estén completos
    if (
      identificacion.trim() === "" ||
      producto.trim() === "" ||
      cantidad.trim() === "" ||
      categoria.trim() === "" ||
      fechaVencimiento.trim() === "" ||
      descripcion.trim() === "" ||
      precio.trim() === ""
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }

    // Convertir el precio a formato de pesos colombianos con decimales
    precio = parseFloat(precio).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Mostrar los datos ingresados en una ventana emergente
    var mensaje =
      "Identificación: " +
      identificacion +
      "\nProducto: " +
      producto +
      "\nCantidad: " +
      cantidad +
      "\nCategoría: " +
      categoria +
      "\nFecha de vencimiento: " +
      fechaVencimiento +
      "\nDescripción: " +
      descripcion +
      "\nPrecio: " +
      precio;
    alert(mensaje);

    // Restablecer el formulario
    document.getElementById("formulario").reset();
  }

  function volver() {
    history.back();
  }