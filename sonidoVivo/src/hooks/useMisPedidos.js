import { useState, useEffect } from 'react';
import { listarMisPedidos } from '../service/pedidoService';
import { obtenerMensajeError } from '../services/obtenerMensajeError';

export function useMisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState('Cargando pedidos…');
  useEffect(() => {
    const controller = new AbortController();
    listarMisPedidos(controller.signal).then(lista => {
      if (controller.signal.aborted) return;
      setPedidos(lista);
      setMensaje(lista.length ? '' : 'Esta cuenta aún no tiene pedidos.');
    }).catch(e => {
      if (!controller.signal.aborted) setMensaje(obtenerMensajeError(e));
    });
    return () => controller.abort();
  }, []);
  return { pedidos, mensaje };
}
