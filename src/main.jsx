import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./componentes/Nav.jsx";
import { IniciarSesion } from "./componentes/login.jsx";
import { RegistroUsuario } from "./componentes/Nuevo_usuario.jsx";
import { Proveedor } from "./componentes/Proveedor.jsx";
import { Inventario } from "./componentes/Inventario.jsx";
import InterfazInvent from "./componentes/InterfazInvent.jsx";
import { Factura } from "./componentes/factura.jsx";
import Encargado from "./componentes/empleados.jsx";
import Generar_venta from "./componentes/Registro_venta.jsx";
import Ayuda from "./componentes/ayuda.jsx";
// import Recuperar_contraseña from "./componentes/recuperar_contraseña.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/nuevousuario" element={<RegistroUsuario />} />
        <Route path="/proveedor" element={<Proveedor />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/menu" element={<InterfazInvent />} />
        <Route path="/factura" element={<Factura />} />
        <Route path="/empleados" element={<Encargado />} />
        <Route path="/venta" element={<Generar_venta />} />
        <Route path="/ayuda" element={<Ayuda />} />
        {/* <Route path="/contrasena" element={<Recuperar_contraseña />} /> */}
      </Routes>
    </NextUIProvider>
  </BrowserRouter>
);
