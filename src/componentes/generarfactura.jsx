import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { generarFacturaPDF } from "./factura";

export function DescargarFactura() {
  const { numeroFactura } = useParams();
  const [factura, setFactura] = useState(null);

  useEffect(() => {
    const obtenerFactura = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/facturas/${numeroFactura}`);
        setFactura(response.data);
      } catch (error) {
        console.error("Error al obtener la factura:", error);
      }
    };

    obtenerFactura();
  }, [numeroFactura]);

  useEffect(() => {
    if (factura) {
      generarFacturaPDF(factura).then(() => {
        // Inicia la descarga del PDF
        const link = document.createElement("a");
        link.href = "factura.pdf";
        link.download = `factura_${numeroFactura}.pdf`;
        link.click();
      });
    }
  }, [factura, numeroFactura]);

  return <div>Descargando factura...</div>;
}