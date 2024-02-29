import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./componentes/Nav.jsx";
import { IniciarSesion } from "./componentes/login.jsx";
import { RegistroUsuario } from "./componentes/Nuevo_usuario.jsx";
import { Inventario } from "./componentes/Inventario.jsx";
import Encargado from "./componentes/empleados.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/nuevousuario" element={<RegistroUsuario />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/empleados" element={<Encargado />} />
      </Routes>
    </NextUIProvider>
  </BrowserRouter>
);
