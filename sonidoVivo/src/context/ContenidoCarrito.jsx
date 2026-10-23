import React, { createContext, useState, useContext } from 'react';

const ContenidoCarritoContext = createContext();

export function ContenidoCarritoProvider(props) {
  const [items, setItems] = useState([]);
  const [mensajeErrorStock, setMensajeErrorStock] = useState('');

  // Función para desplegar la notificación y borrarla automáticamente en 3.5s
  const notificarErrorStock = (mensaje) => {
    setMensajeErrorStock(mensaje);
    setTimeout(() => {
      setMensajeErrorStock('');
    }, 3500);
  };

  const agregarProducto = (producto) => {
    setItems((prevItems) => {
      const existe = prevItems.find((item) => item.producto.id === producto.id);
      const stockMaximo = producto.stock !== undefined && producto.stock !== null 
        ? Number(producto.stock) 
        : Infinity;
      const cantidadASumar = producto.cantidad || 1;

      if (existe) {
        const nuevaCantidad = existe.cantidad + cantidadASumar;
        if (nuevaCantidad > stockMaximo) {
          notificarErrorStock(`⚠️ No puedes agregar más unidades. El stock disponible de "${producto.nombre}" es de ${stockMaximo} un.`);
          return prevItems.map((item) =>
            item.producto.id === producto.id
              ? { ...item, cantidad: stockMaximo }
              : item
          );
        }
        return prevItems.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: nuevaCantidad }
            : item
        );
      }

      if (cantidadASumar > stockMaximo) {
        notificarErrorStock(`No puedes agregar más unidades. El stock disponible de "${producto.nombre}" es de ${stockMaximo} un.`);
        return [...prevItems, { producto: producto, cantidad: stockMaximo }];
      }

      return [...prevItems, { producto: producto, cantidad: cantidadASumar }];
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.producto.id === id) {
          const stockMaximo = item.producto.stock !== undefined && item.producto.stock !== null
            ? Number(item.producto.stock)
            : Infinity;
          
          if (nuevaCantidad > stockMaximo) {
            notificarErrorStock(`Stock máximo alcanzado (${stockMaximo} un.) para "${item.producto.nombre}".`);
            return item;
          }
          return { ...item, cantidad: nuevaCantidad };
        }
        return item;
      })
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
        mensajeErrorStock // Se expone el estado de notificación en el contexto
      }}
    >
      {props.children}
    </ContenidoCarritoContext.Provider>
  );
}

export const useContenidoCarrito = () => useContext(ContenidoCarritoContext);