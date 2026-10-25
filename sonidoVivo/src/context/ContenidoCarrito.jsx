import React, { createContext, useState, useContext, useEffect } from 'react';

const ContenidoCarritoContext = createContext();
const CLAVE_CARRITO = 'sv_carrito';

export function ContenidoCarritoProvider(props) {
  const [items, setItems] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_CARRITO);
      return guardado ? JSON.parse(guardado) : [];
    } catch (e) {
      return [];
    }
  });
  const [mensajeErrorStock, setMensajeErrorStock] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
    } catch (e) {
      // Ignorar errores de escritura en localStorage
    }
  }, [items]);

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
          notificarErrorStock(` No puedes agregar más unidades. El stock disponible de "${producto.nombre}" es de ${stockMaximo} un.`);
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
        mensajeErrorStock 
      }}
    >
      {props.children}
    </ContenidoCarritoContext.Provider>
  );
}

export const useContenidoCarrito = () => useContext(ContenidoCarritoContext);