const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const randomize = require("randomatic");

const app = express();
const PORT = 3002;

app.use(bodyParser.json());

app.post("http://localhost:3000/recuperar_contrasena/", (req, res) => {
  const { correo } = req.body;

  // Generar código de recuperación de 6 dígitos
  const codigoRecuperacion = randomize("0", 6);

  // Configurar el transportador de correo electrónico
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chatcomunitationsoporte@gmail.com",
      pass: "1075624127",
    },
  });

  // Opciones del correo electrónico
  const mailOptions = {
    from: "chatcomunitationsoporte@gmail.com",
    to: correo,
    subject: "Hola, Código de recuperación de contraseña",
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
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
