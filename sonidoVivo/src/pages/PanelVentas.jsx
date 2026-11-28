import React, { useState } from 'react';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import ControlSolicitudes from '../components/organisms/ControlSolicitudes';
import TablaStockVentas from '../components/organisms/TablaStockVentas';
import { useProductos } from '../context/ProductosContext';
import { useMisPedidos } from '../hooks/useMisPedidos';
import { obtenerMensajeError } from '../services/obtenerMensajeError';
import EncabezadoPanel from '../components/molecules/EncabezadoPanel';

export default function PanelVentas({ titulo }) {
  const { productos, error: errorCatalogo, actualizarStockProducto } = useProductos();

  
  const { pedidos, mensaje } = useMisPedidos();
  const [error, setError] = useState('');
  const solicitudes = pedidos.map(p => ({
    id: p.idPedido, codigo: p.codigoSeguimiento, cliente: p.idUsuario,
    destino: p.direccionEnvio, estado: p.estadoSeguimiento, total: p.total
  }));
  async function manejarActualizarStock(id, stock) {
    setError('');
    try {
      await actualizarStockProducto(id, stock);
      return true;
    } catch (e) {
      setError(obtenerMensajeError(e));
      return false;
    }
  }

  return (
    <PlantillaAdmin>
      <div className="container py-2 d-flex flex-column gap-4">
        {errorCatalogo && <p role="alert">{errorCatalogo}</p>}
        <EncabezadoPanel 
          titulo={titulo} 
          subtitulo="Gestión de Solicitudes de Despacho, Control de Envíos e Inventario de Stock" 
        />

        {mensaje ? <p role="status">{mensaje}</p> : <ControlSolicitudes solicitudes={solicitudes} />}
        {error && <p role="alert">{error}</p>}

        <TablaStockVentas
          productos={productos}
          onActualizarStock={manejarActualizarStock}
        />
      </div>
    </PlantillaAdmin>
  );
}
