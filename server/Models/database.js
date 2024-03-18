// Usamos esta arquitectura escalable y buenas practicas.
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sofacto",
});

db.connect((err) => {
  if (err) {
    console.error("Errorr al conectar en la base de datos", err);
    return;
  }
  console.log("Conexion Existosa a la base de datos.");
});

process.on("SIGINT", () => {
  db.end();
  process.exit();
});

module.exports = db;
