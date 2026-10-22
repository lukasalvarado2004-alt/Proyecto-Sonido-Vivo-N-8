import React from "react";
import { useContenidoCarrito } from "../../context/ContenidoCarrito";

export function ItemCarrito(props) {
  const { actualizarCantidad, eliminarProducto } = useContenidoCarrito();
  
  const subtotal = props.item.producto.precio * props.item.cantidad;

  return (
    <li className="list-group-item d-flex flex-wrap align-items-center justify-content-between gap-3 bg-transparent border-0 text-white py-3">
      
      {/* Contenedor de Imagen, Nombre y Cantidad */}
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        {/* IMAGEN DEL PRODUCTO (Añadida siguiendo la estructura de props) */}
        <img 
          src={props.item.producto.imagen} 
          alt={props.item.producto.nombre} 
          className="img-fluid rounded border border-secondary"
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />
        
        <div>
          <span className="fw-semibold fs-5">{props.item.producto.nombre}</span>
          <span className="badge bg-secondary ms-2">x{props.item.cantidad}</span>
        </div>
      </div>

      {/* Precio y Controles de acción */}
      <div className="d-flex align-items-center gap-3">
        <span className="fw-bold fs-5">${subtotal.toLocaleString('es-CL')}</span>
        
        <div className="d-flex align-items-center gap-1">
          <button 
            className="btn btn-outline-light btn-sm px-2" 
            onClick={() => actualizarCantidad(props.item.producto.id, props.item.cantidad + 1)}
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
