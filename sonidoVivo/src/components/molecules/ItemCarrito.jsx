import React from "react";
import { useContenidoCarrito } from "../../context/ContenidoCarrito";
import { obtenerImagenUrl } from "../../utils/obtenerImagen";

export function ItemCarrito(props) {
  const { actualizarCantidad, eliminarProducto } = useContenidoCarrito();
  
  const subtotal = props.item.producto.precio * props.item.cantidad;
  const stockDisponible = props.item.producto.stock !== undefined && props.item.producto.stock !== null
    ? Number(props.item.producto.stock)
    : Infinity;
  const alcanoStockMaximo = props.item.cantidad >= stockDisponible;

  return (
    <li className="list-group-item d-flex flex-wrap align-items-center justify-content-between gap-3 bg-transparent border-0 text-white py-3">
   
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <img 
          src={obtenerImagenUrl(props.item.producto.imagen)} 
          alt={props.item.producto.nombre} 
          className="img-fluid rounded border border-secondary img-item-carrito"
        />
        
        <div>
          <span className="fw-semibold fs-5">{props.item.producto.nombre}</span>
          <span className="badge bg-secondary ms-2">x{props.item.cantidad}</span>
        </div>
      </div>

      
      <div className="d-flex align-items-center gap-3">
        <span className="fw-bold fs-5">${subtotal.toLocaleString('es-CL')}</span>
        
        <div className="d-flex align-items-center gap-1">
          <button 
            className="btn btn-outline-light btn-sm px-2" 
            onClick={() => actualizarCantidad(props.item.producto.id, props.item.cantidad + 1)}
            disabled={alcanoStockMaximo}
          >
            +
          </button>
          
          <span className="mx-1 fw-bold">{props.item.cantidad}</span>

          <button 
            className="btn btn-outline-light btn-sm px-2" 
            onClick={() => actualizarCantidad(props.item.producto.id, props.item.cantidad - 1)}
            disabled={props.item.cantidad <= 1}
          >
            -
          </button>
        </div>

        <button 
          className="btn btn-danger btn-sm" 
          onClick={() => eliminarProducto(props.item.producto.id)}
        >
          Quitar
        </button>
      </div>
    </li>
  );
}

export default ItemCarrito;