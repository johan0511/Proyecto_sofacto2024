import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Nav } from "./componentes/Nav.jsx";
import { IniciarSesion } from "./componentes/login.jsx";
import { RegistroUsuario } from "./componentes/Nuevo_usuario.jsx";
import NuevoUsuario from "./componentes/Usuario_nuevo.jsx";
import { Proveedor } from "./componentes/Proveedor.jsx";
import { Inventario } from "./componentes/Inventario.jsx";
import Inventario_empleado from "./componentes/Empleado/Inventario_empleado.jsx";
import Contacto from "./componentes/contactenos.jsx";
import InterfazInvent from "./componentes/InterfazInvent.jsx";
import InterfazEmple from "./componentes/InterfazEmple.jsx";
import { Factura } from "./componentes/factura.jsx";
import Factura_empleado from "./componentes/Empleado/factura_empleado.jsx";
import Encargado from "./componentes/empleados.jsx";
import Inf from "./componentes/Informe_venta.jsx";
import Generar_venta from "./componentes/Registro_venta.jsx";
import Ayuda from "./componentes/ayuda.jsx";
import ProtectedRoute from "../components/utils/ProtectedRoute.jsx";
import { useLocalStorage } from "react-use";

function App() {
  const [user, setUser] = useLocalStorage("user");

  return (
    <BrowserRouter>
      <NextUIProvider>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/login" element={<IniciarSesion />} />
          <Route path="/nuevousuario" element={<RegistroUsuario />} />
          <Route path="/registrarusuario" element={<NuevoUsuario />} />
          <Route
            element={<ProtectedRoute canActivate={user} RedirectPath="/" />}
          >
            <Route path="/proveedor" element={<Proveedor />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route
              path="/inventario_empleado"
              element={<Inventario_empleado />}
            />
            <Route path="/menuadmin" element={<InterfazInvent />} />
            <Route path="/menuemple" element={<InterfazEmple />} />
            <Route path="/infventa" element={<Inf />} />
            <Route path="/factura" element={<Factura />} />
            <Route path="/factura_empleado" element={<Factura_empleado />} />
            <Route path="/empleados" element={<Encargado />} />
            <Route path="/venta" element={<Generar_venta />} />
            <Route path="/ayuda" element={<Ayuda />} />
          </Route>
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </NextUIProvider>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
