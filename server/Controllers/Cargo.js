const db = require("../Models/database").promise();

// Funciones relacionadas con la tabla "Cargo"
const obtenerCargos = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Empleado;");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener cargos:", error);
    res.status(500).json({ error: "Error al obtener cargos." });
  }
};

const obtenerCargoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("SELECT * FROM Empleado WHERE Id = ?", [
      id,
    ]);
    res.json(result[0] || {});
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener el cargo." });
  }
};

const crearCargo = async (req, res) => {
  try {
    const { body } = req;
    const [result] = await db.query(
      "INSERT INTO Empleado (Id, Nombre, Nombre_cargo, Estado_actual) VALUES (?, ?, ?, ?)",
      [body.Id, body.Nombre, body.Nombre_cargo, body.Estado_actual]
    );
    res.json({ message: "Cargo creado correctamente", id: result.insertId });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al crear el cargo." });
  }
};

const actualizarCargo = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    await db.query(
      "UPDATE Empleado SET Id = ?, Nombre = ?, Nombre_cargo = ?, Estado_actual = ? WHERE Id = ?",
      [body.Id, body.Nombre, body.Nombre_cargo, body.Estado_actual, id]
    );
    res.json({ message: "Cargo actualizado correctamente" });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al actualizar el cargo." });
  }
};

const eliminarCargo = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Empleado WHERE Id = ?", [id]);
    res.json({ message: "Cargo eliminado correctamente" });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al eliminar el cargo." });
  }
};

// Funciones relacionadas con la tabla "Empleado"
const obtenerEmpleados = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Empleado;");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ error: "Error al obtener empleados." });
  }
};

const obtenerEmpleadoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("SELECT * FROM Cargo WHERE Id = ?", [id]);
    res.json(result[0] || {});
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener el empleado." });
  }
};

const agregarEmpleado = async (req, res) => {
  try {
    const { body } = req;
    const [result] = await db.query(
      "INSERT INTO Cargo (Id, Nombre, Cargo, Estado_actual) VALUES (?, ?, ?, ?)",
      [body.Id, body.Nombre, body.Cargo, body.Estado_actual]
    );
    res.json({
      message: "Empleado agregado correctamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al agregar el empleado." });
  }
};

const modificarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    await db.query(
      "UPDATE Cargo SET Id = ?, Nombre = ?, Cargo = ?, Estado_actual = ? WHERE Id = ?",
      [body.Id, body.Nombre, body.Cargo, body.Estado_actual, id]
    );
    res.json({ message: "Empleado modificado correctamente" });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al modificar el empleado." });
  }
};

const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Cargo WHERE Id = ?", [id]);
    res.json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al eliminar el empleado." });
  }
};

module.exports = {
  obtenerCargos,
  obtenerCargoPorId,
  crearCargo,
  actualizarCargo,
  eliminarCargo,
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  agregarEmpleado,
  modificarEmpleado,
  eliminarEmpleado,
};
