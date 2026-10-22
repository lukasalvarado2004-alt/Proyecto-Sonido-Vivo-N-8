// src/pages/PanelVentas.jsx
import React, { useState } from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import ControlSolicitudes from '../components/organisms/ControlSolicitudes';
import TablaStockVentas from '../components/organisms/TablaStockVentas';
import { useProductos } from '../context/ProductosContext';
import comprasIniciales from '../data/CompraData.json';

export default function PanelVentas() {
  const { productos, actualizarStockProducto } = useProductos();

  // Mapeo automático desde CompraData.json
  const [solicitudes, setSolicitudes] = useState(() =>
    comprasIniciales.map((compra, index) => ({
      id: compra.nroSolicitud || index + 1,
      codigo: compra.nroSolicitud,
      cliente: compra.nombre,
      destino: `${compra.direccion}, ${compra.comuna}`,
      estado: compra.estado || 'Pendiente',
      total: compra.total
    }))
  );

  const manejarCambiarEstado = (idSolicitud, nuevoEstado) => {
    setSolicitudes((prev) =>
      prev.map((sol) => (sol.id === idSolicitud ? { ...sol, estado: nuevoEstado } : sol))
    );
  };

  const manejarActualizarStock = (identificador, nuevoStock) => {
    actualizarStockProducto(identificador, nuevoStock);
  };

  return (
    <PlantillaAdmin>
      <div className="container py-2 d-flex flex-column gap-4">
        {/* Encabezado del Panel */}
        <div className="card bg-dark text-light border-secondary p-3 rounded">
          <h2 className="h4 fw-bold mb-1">Panel de Ventas</h2>
          <p className="text-secondary small mb-0">
            Gestión de Solicitudes de Despacho, Control de Envíos e Inventario de Stock
          </p>
        </div>

        {/* 1. Tabla de Solicitudes */}
        <ControlSolicitudes
          solicitudes={solicitudes}
          onCambiarEstado={manejarCambiarEstado}
        />

        {/* 2. Tabla de Stock */}
        <TablaStockVentas
          productos={productos}
          onActualizarStock={manejarActualizarStock}
        />
      </div>
    </PlantillaAdmin>
  );
}