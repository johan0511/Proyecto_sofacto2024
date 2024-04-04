const db = require("../Models/database").promise();

const obtenerEmpleados = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Empleados");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ error: "Error al obtener empleados." });
  }
};

const obtenerEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("SELECT * FROM Empleados WHERE ID = ?", [
      id,
    ]);
    res.json(result[0] || {});
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener el empleado." });
  }
};

const crearEmpleado = async (req, res) => {
  try {
    const { body } = req;
    const [result] = await db.query(
      "INSERT INTO Empleados (Nombre, Nombre_cargo_FK) VALUES (?, ?)",
      [body.Nombre, body.Nombre_cargo_FK]
    );
    res.json({ message: "Empleado creado correctamente", id: result.insertId });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al crear el empleado." });
  }
};

const actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    await db.query(
      "UPDATE Empleados SET Nombre = ?, Nombre_cargo_FK = ? WHERE ID = ?",
      [body.Nombre, body.Nombre_cargo_FK, id]
    );
    res.json({ message: "Empleado actualizado correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al actualizar el empleado." });
  }
};

const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Empleados WHERE ID = ?", [id]);
    res.json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al eliminar el empleado." });
  }
};

module.exports = {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
};
