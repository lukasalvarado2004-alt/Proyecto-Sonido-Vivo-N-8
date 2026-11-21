import React, { useState } from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import ControlSolicitudes from '../components/organisms/ControlSolicitudes';
import TablaStockVentas from '../components/organisms/TablaStockVentas';
import { useProductos } from '../context/ProductosContext';
import comprasIniciales from '../data/CompraData.json';
import EncabezadoPanel from '../components/molecules/EncabezadoPanel';

export default function PanelVentas() {
  const { productos, actualizarStockProducto } = useProductos();

  
  const [solicitudes, setSolicitudes] = useState(() => {
    const historialGuardado = localStorage.getItem("sv_todas_compras");
    const base = historialGuardado ? JSON.parse(historialGuardado) : comprasIniciales;

    return base.map((compra, index) => ({
      id: compra.nroSolicitud || index + 1,
      codigo: compra.nroSolicitud,
      cliente: compra.nombre,
      destino: `${compra.direccion || ''}, ${compra.comuna || ''}`,
      estado: compra.estado || 'Pendiente',
      total: compra.total
    }));
  });

  const manejarCambiarEstado = (idSolicitud, nuevoEstado) => {
    setSolicitudes((prev) => {
      const actualizadas = prev.map((sol) =>
        sol.id === idSolicitud ? { ...sol, estado: nuevoEstado } : sol
      );

      
      const historial = JSON.parse(localStorage.getItem("sv_todas_compras")) || [];
      const historialActualizado = historial.map((c) =>
        c.nroSolicitud === idSolicitud ? { ...c, estado: nuevoEstado } : c
      );
      localStorage.setItem("sv_todas_compras", JSON.stringify(historialActualizado));

      return actualizadas;
    });
  };

  const manejarActualizarStock = (identificador, nuevoStock) => {
    actualizarStockProducto(identificador, nuevoStock);
  };

  return (
    <PlantillaAdmin>
      <div className="container py-2 d-flex flex-column gap-4">
        <EncabezadoPanel 
          titulo="Panel de Ventas" 
          subtitulo="Gestión de Solicitudes de Despacho, Control de Envíos e Inventario de Stock" 
        />

        <ControlSolicitudes
          solicitudes={solicitudes}
          onCambiarEstado={manejarCambiarEstado}
        />

        <TablaStockVentas
          productos={productos}
          onActualizarStock={manejarActualizarStock}
        />
      </div>
    </PlantillaAdmin>
  );
}