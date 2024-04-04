const db = require("../Models/database").promise();

// Función para obtener los datos de correo, contraseña y cargo de todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const [usuarios] = await db.query(
      "SELECT Correo, Contrasena, IdCargo FROM usuario_existente"
    );
    res.json({ usuarios });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Función para obtener los datos de correo, contraseña y cargo de un usuario por su ID
const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [usuario] = await db.query(
      "SELECT Correo, Contrasena, IdCargo FROM usuario_existente WHERE IdUsuario = ?",
      [id]
    );
    if (usuario.length > 0) {
      res.json({ usuario: usuario[0] });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const [usuario] = await db.query(
      "SELECT * FROM usuario_existente WHERE Correo = ? AND Contrasena = ?",
      [correo, contrasena]
    );
    if (usuario.length > 0) {
      res.json({ message: "Inicio de sesión exitoso", usuario: usuario[0] });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

const obtenerUsuarioPorCorreoYContrasena = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const [usuario] = await db.query(
      "SELECT * FROM usuario_existente WHERE Correo = ? AND Contrasena = ?",
      [correo, contrasena]
    );
    if (usuario.length > 0) {
      res.json({ usuario: usuario[0] });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  iniciarSesion,
  obtenerUsuarioPorCorreoYContrasena,
};
