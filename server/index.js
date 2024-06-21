const express = require("express");
const cors = require("cors");
const rutaSelect = require("./Routers/InputSelect");
const NombreProveedor = require("./Routers/NombreProveedor");
const bodyParser = require("body-parser");
const datosRouter = require("./Routers/datosRouter");
const rutaCargos = require("./Routers/Nombre_cargo");
const proveedor = require("./Routers/ProveedorRouter");
const usuarios = require("./Routers/nuevousuario");
const nuevousuario = require("./Routers/nuevousuario");
const ventas = require("./Routers/ventasRouter");
const login = require("./Routers/login");
const rutaIdSelect = require("./Routers/IdSelect");
const rutaFacturas = require("./Routers/RutasFactura");
const rutaPago = require("./Routers/rutaPago");
const productosController = require("./Routers/IdSelectproductos");
const rutaSelecttrabajador = require("./Routers/IdSelecttrabajador");
const ventasgeneradas = require("./Routers/ventasRouter");

// const recuperar_contrasena = require("./Routers/recuperarcontrasena");

const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET,POST,PUT,DELETE",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/", datosRouter);
app.use("/Cargos", rutaCargos);
app.use("/producto", productosController);
app.use("/Proveedor", proveedor);
app.use("/vent", ventas);
app.use("/usuario", usuarios);
app.use("/login", login);
app.use("/id", rutaIdSelect);
app.use("/nuevousuario", nuevousuario);
app.use("/select", rutaSelect);
app.use("/facturas_vendidas", ventasgeneradas);
app.use("/selectnombre", rutaSelecttrabajador);
app.use("/proveedores", NombreProveedor);
app.use("/selectid", rutaIdSelect);
app.use("/facturas", rutaFacturas);
app.use("/pago", rutaPago); 
// app.use("/recuperar_contrasena", recuperar_contrasena);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
