const bcrypt = require("bcrypt");
const db = require("../Models/database").promise();
const nodemailer = require("nodemailer");
const randomize = require("randomatic");

const generarCodigoRecuperacion = () => {
  return randomize("0", 6); 
};

const obtenerRecuperarContrasenas = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM recuperar_contrasena");
    res.json(result);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al obtener contraseñas." });
  }
};

const crearRecuperarContrasena = async (req, res) => {
  try {
    const { body } = req;

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(body.Contrasena, 10);

    // Insertar la contraseña encriptada en la tabla recuperar_contrasena
    const [result] = await db.query(
      "INSERT INTO recuperar_contrasena (Correo, Contrasena) VALUES (?, ?)",
      [body.Correo, hashedPassword]
    );
    res.json({
      message: "Contraseña creada correctamente",
      id: result.insertId,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al crear la contraseña." });
  }
};

const actualizarRecuperarContrasena = async (req, res) => {
  try {
    const { correo } = req.body;

    // Verificar si el correo está presente en la tabla de usuarios
    const [result] = await db.query("SELECT * FROM usuario WHERE Correo = ?", [
      correo,
    ]);

    if (result.length === 0) {
      return res
        .status(400)
        .json({ error: "El correo proporcionado no está registrado." });
    }

    // Generar un código de recuperación de contraseña
    const codigoRecuperacion = generarCodigoRecuperacion();

    // Configurar el transportador de correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "chatcomunitationsoporte@gmail.com",
        pass: "1075624127", // <-- Coloca aquí tu contraseña de Gmail
      },
    });

    // Opciones del correo electrónico
    const mailOptions = {
      from: "chatcomunitationsoporte@gmail.com",
      to: correo,
      subject: "Código de recuperación de contraseña",
      text: `Tu código de recuperación de contraseña es: ${codigoRecuperacion}`,
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
        res
          .status(500)
          .json({ error: "Error al enviar el correo de recuperación." });
      } else {
        console.log("Correo enviado:", info.response);
        res.status(200).json({
          message: "Correo de recuperación enviado exitosamente.",
          codigoRecuperacion,
        });
      }
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al actualizar la contraseña." });
  }
};

const eliminarRecuperarContrasena = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM recuperar_contrasena WHERE id = ?", [id]);
    res.json({ message: "Contraseña eliminada correctamente" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Error al eliminar la contraseña." });
  }
};

module.exports = {
  obtenerRecuperarContrasenas,
  crearRecuperarContrasena,
  actualizarRecuperarContrasena,
  eliminarRecuperarContrasena,
};
