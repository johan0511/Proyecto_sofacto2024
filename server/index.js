const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const datosRouter = require("./Routers/datosRouter");
const rutaCargos = require("./Routers/Nombre_cargo");
const proveedorRouter = require("./Routers/ProveedorRouter");
const usuariosRouter = require("./Routers/nuevousuario");
const ventasRouter = require("./Routers/ventasRouter");
const loginRouter = require("./Routers/login");
const rutaSelect = require("./Routers/InputSelect");
const rutaIdSelect = require("./Routers/IdSelect");
const rutaFacturas = require("./Routers/RutasFactura");
// const recuperarContrasenaRouter = require("./Routers/recuperarcontrasena");

const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET,POST,PUT,DELETE",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/", datosRouter);
app.use("/cargos", rutaCargos);
app.use("/proveedor", proveedorRouter);
app.use("/ventas", ventasRouter);
app.use("/usuarios", usuariosRouter);
app.use("/login", loginRouter);
app.use("/select", rutaSelect);
app.use("/id", rutaIdSelect);
app.use("/fact", rutaFacturas);
// app.use("/recuperar-contrasena", recuperarContrasenaRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
