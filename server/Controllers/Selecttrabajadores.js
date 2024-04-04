// Controllers/EmpleadosController.js
const db = require("../Models/database").promise();

const obtenerEmpleadosActivos = async (req, res) => {
  try {
    // Modificamos la consulta para obtener el nombre de los empleados con estado actual 'Activo'
    const [result] = await db.query(
      "SELECT Nombre FROM Empleado WHERE Estado_actual = 'Activo'"
    );
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener los empleados activos." });
  }
};

module.exports = {
  obtenerEmpleadosActivos,
};
