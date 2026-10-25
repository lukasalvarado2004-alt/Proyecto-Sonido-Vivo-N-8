// src/hooks/useAgregarAlCarrito.js
import { useContenidoCarrito } from "../context/ContenidoCarrito";

export function useAgregarAlCarrito() {
  const { agregarProducto } = useContenidoCarrito();

  const agregarConFormato = (producto, cantidad = 1, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    agregarProducto({
      id: producto.id || producto.codigo || producto.nombre,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      marca: producto.marca,
      modelo: producto.modelo,
      stock: producto.stock, 
      cantidad: cantidad
    });
  };

  return agregarConFormato;
}