window.onload = function() {
    document.getElementById("informe").addEventListener("click", function() {
      // Crear un nuevo objeto jsPDF
      const doc = new jsPDF();
  
      // Obtener la tabla por su ID
      const table = document.getElementById("tabla-ventas");
  
      // Obtener todas las filas de la tabla
      const rows = table.querySelectorAll("tr");
  
      // Obtener las fechas seleccionadas
      const fechaInicial = new Date(document.getElementById("fecha-inicial").value);
      const fechaFinal = new Date(document.getElementById("fecha-final").value);
  
      // Definir las columnas y filas del PDF
      const columns = ["Fecha", "Producto", "Cantidad", "Precio"];
      const data = [];
  
      // Recorrer las filas de la tabla y agregar los datos al array de datos
      for (let i = 1; i < rows.length - 1; i++) {
        const row = rows[i];
  
        // Obtener la fecha de la fila actual
        const fecha = new Date(row.cells[0].innerText);
  
        // Verificar si la fecha está dentro del rango seleccionado
        if (fecha >= fechaInicial && fecha <= fechaFinal) {
          const rowData = [];
  
          // Obtener las celdas de la fila actual
          const cells = row.querySelectorAll("td");
  
          // Recorrer las celdas y agregar los valores al array de datos
          cells.forEach((cell) => {
            rowData.push(cell.innerText);
          });
  
          // Agregar la fila de datos al array de datos
          data.push(rowData);
        }
      }
  
      // Configurar el estilo de la tabla en el PDF
      const tableStyle = {
        margin: { top: 20 },
      };
  
      // Generar la tabla en el PDF
      doc.autoTable(columns, data, tableStyle);
  
      // Guardar el PDF como archivo descargable
      doc.save("informe_ventas.pdf");
    });
  };
  