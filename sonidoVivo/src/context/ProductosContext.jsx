import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as servicio from '../service/productoService';
import { obtenerMensajeError } from '../services/obtenerMensajeError';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const lectura = useRef(null);

  const recargarProductos = useCallback(async () => {
    lectura.current?.abort();
    const controller = new AbortController();
    lectura.current = controller;
    setCargando(true);
    setError('');
    try {
      const lista = await servicio.listarProductos(controller.signal);
      if (!controller.signal.aborted) setProductos(lista);
    } catch (e) {
      if (!controller.signal.aborted) setError(obtenerMensajeError(e));
    } finally {
      if (!controller.signal.aborted) setCargando(false);
    }
  }, []);
  useEffect(() => {
    recargarProductos();
    return () => lectura.current?.abort();
  }, [recargarProductos]);

  async function crear(datos) {
    await servicio.crearProducto(datos);
    await recargarProductos();
  }
  async function actualizar(id, datos) {
    await servicio.actualizarProducto(id, datos);
    await recargarProductos();
  }
  async function eliminar(id) {
    await servicio.eliminarProducto(id);
    await recargarProductos();
  }
  function actualizarStockProducto(id, stock) {
    const producto = productos.find(p => p.id === id);
    return actualizar(id, { ...producto, stock });
  }
  return <ProductosContext.Provider value={{ productos, cargando, error, crear, actualizar,
    eliminar, actualizarStockProducto, recargarProductos }}>{children}</ProductosContext.Provider>;
}
export function useProductos() {
  return useContext(ProductosContext);
}
