// src/context/ProductosContext.jsx
import React, { createContext, useContext, useState } from 'react';
import * as productoService from '../service/productoService';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(() => productoService.listarProductos());

  const recargarProductos = () => {
    setProductos(productoService.listarProductos());
  };

  const crear = (datos) => {
    productoService.crearProducto(datos);
    recargarProductos();
  };

  const actualizar = (identificador, cambios) => {
    productoService.actualizarProducto(identificador, cambios);
    recargarProductos();
  };

  const actualizarStockProducto = (identificador, nuevoStock) => {
    actualizar(identificador, { stock: Number(nuevoStock) });
  };

  const eliminar = (identificador) => {
    if (window.confirm('¿Seguro que deseas eliminar este artículo?')) {
      productoService.eliminarProducto(identificador);
      recargarProductos();
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        crear,
        actualizar,
        actualizarStockProducto,
        eliminar,
        recargarProductos
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  const contexto = useContext(ProductosContext);
  if (!contexto) {
    throw new Error('useProductos debe usarse dentro de un ProductosProvider');
  }
  return contexto;
}