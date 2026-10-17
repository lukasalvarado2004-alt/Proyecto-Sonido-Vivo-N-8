import React, { createContext, useState, useContext } from 'react';

const ContenidoCarritoContext = createContext();

export function ContenidoCarritoProvider(props) {
  const [items, setItems] = useState([]);

  const agregarProducto = (producto) => {
    setItems((prevItems) => {
      const existe = prevItems.find((item) => item.producto.id === producto.id);
      if (existe) {
        return prevItems.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevItems, { producto: producto, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) => (item.producto.id === id ? { ...item, cantidad: nuevaCantidad } : item))
    );
  };

  const eliminarProducto = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.producto.id !== id));
  };

  const vaciarCarrito = () => setItems([]);

  const totalProductos = items.reduce((acc, item) => acc + item.cantidad, 0);
  const precioTotal = items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

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
      
      {props.children}
    </ContenidoCarritoContext.Provider>
  );
}

export const useContenidoCarrito = () => useContext(ContenidoCarritoContext);
