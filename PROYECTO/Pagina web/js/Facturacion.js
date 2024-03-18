document.addEventListener("DOMContentLoaded", function () {
  const agregarProductoBtn = document.querySelector(".agregar-producto");
  const borrarProductoBtn = document.querySelector(".borrar-producto");
  const tableBody = document.querySelector("table tbody");

  agregarProductoBtn.addEventListener("click", agregarProducto);
  borrarProductoBtn.addEventListener("click", borrarProducto);

  let itemCounter = 1;

  function agregarProducto() {
    const fila = `
    <tr>
        <td>${itemCounter}</td>
        <td><input type="text" name="descripcion[]" placeholder="Descripción" required></td>
        <td><input type="number" name="cantidad[]" placeholder="Cantidad" required></td>
        <td><input type="number" name="precio[]" placeholder="Precio Unitario" required></td>
        <td class="total-producto">0</td>
    </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", fila);
    itemCounter++;
}
// Generar número de factura único
function generarNumeroFactura() {
    // Genera un número aleatorio entre 1000 y 9999
    const numeroFactura = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    // Asigna el número de factura al campo de input
    document.getElementById("numero").value = numeroFactura;
}

// Ejecutar la función al cargar la página
window.addEventListener("DOMContentLoaded", generarNumeroFactura);

function borrarProducto() {
    const filas = tableBody.querySelectorAll("tr");
    if (filas.length > 1) {
    tableBody.removeChild(filas[filas.length - 1]);
    itemCounter--;
    }
}

tableBody.addEventListener("input", calcularTotalProducto);

function calcularTotalProducto(event) {
    const fila = event.target.closest("tr");
    const cantidad = parseInt(fila.querySelector('input[name="cantidad[]"]').value);
    const precio = parseFloat(fila.querySelector('input[name="precio[]"]').value);
    const totalProducto = fila.querySelector(".total-producto");
    const total = cantidad * precio;
    totalProducto.textContent = formatCurrency(total);
}

function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    });
    return formatter.format(amount);
}
});




