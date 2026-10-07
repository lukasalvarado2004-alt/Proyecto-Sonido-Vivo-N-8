import React, { createContext, useState, useContext } from 'react';

const ContenidoCarritoContext = createContext();

export function ContenidoCarritoProvider({ children }) {
  const [items, setItems] = useState([]);

  const agregarProducto = (producto) => {
    setItems((prevItems) => {
      const existe = prevItems.find((item) => item.id === producto.id || item.nombre === producto.nombre);
      if (existe) {
        return prevItems.map((item) =>
          (item.id === producto.id || item.nombre === producto.nombre)
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevItems, { ...producto, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, cantidad: nuevaCantidad } : item))
    );
  };

  const eliminarProducto = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setItems([]);

  const totalProductos = items.reduce((acc, item) => acc + item.cantidad, 0);
  const precioTotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <ContenidoCarritoContext.Provider
      value={{
        items,
        agregarProducto,
        actualizarCantidad,
        eliminarProducto,
        vaciarCarrito,
        totalProductos,
        precioTotal,
      }}
    >
      {children}
    </ContenidoCarritoContext.Provider>
  );
}

export const useContenidoCarrito = () => useContext(ContenidoCarritoContext);
