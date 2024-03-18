const bcrypt = require('bcrypt');
const db = require("../Models/database").promise();

const obtenerUsuarios = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM usuario');
        res.json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al obtener usuarios.' });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('SELECT * FROM usuario WHERE IdUsuario = ?', [id]);
        res.json(result[0] || {});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al obtener el usuario.' });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const { body } = req;

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(body.Contrasena, 10);

        // Usar la contraseña encriptada en lugar de la original
        const [result] = await db.query('INSERT INTO usuario (IdTipo_identificacion, IdUsuario, Correo, Contrasena, Verificar_Contrasena, IdCargo) VALUES (?, ?, ?, ?, ?, ?)', [body.IdTipo_identificacion, body.IdUsuario, body.Correo, hashedPassword, hashedPassword, body.IdCargo]);
        res.json({ message: 'Usuario creado correctamente', id: result.insertId });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al crear el usuario.' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        delete body.IdUsuario; // No permitir actualizar el IdUsuario

        await db.query('UPDATE usuario SET ? WHERE IdUsuario = ?', [body, id]);
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al actualizar el usuario.' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM usuario WHERE IdUsuario = ?', [id]);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al eliminar el usuario.' });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
