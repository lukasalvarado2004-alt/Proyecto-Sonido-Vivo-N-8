import React from "react";
import { useContenidoCarrito } from "../../data/ContenidoCarrito";

function ItemCarrito(props) {
  const { actualizarCantidad, eliminarProducto } = useContenidoCarrito();
  const { id, imagen, nombre, precio, cantidad } = props.item;

  const handleRestar = () => {
    if (cantidad > 1) {
      actualizarCantidad(id, cantidad - 1);
    } else {
      eliminarProducto(id);
    }
  };

  return (
    /* Reemplazamos las clases de Bootstrap por nuestra clase personalizada */
    <div className="tarjeta-carrito bg-secondary rounded mb-2 text-white">
      <div className="d-flex align-items-center gap-3">
        <img 
          src={imagen} 
          alt={nombre} 
          style={{ width: "50px", height: "50px", objectFit: "cover" }} 
          className="rounded" 
        />
        <div>
          <h6 className="mb-0 fw-bold">{nombre}</h6>
          <small className="text-light">
            ${precio.toLocaleString()} x {cantidad}
          </small>
        </div>
      </div>
      
      <div className="d-flex align-items-center gap-2">
        <button 
          className="btn btn-sm btn-light py-0 px-2" 
          onClick={handleRestar}
        >
          -
        </button>
        <span className="fw-bold">{cantidad}</span>
        <button 
          className="btn btn-sm btn-light py-0 px-2" 
          onClick={() => actualizarCantidad(id, cantidad + 1)}
        >
          +
        </button>
        <button 
          className="btn btn-sm btn-danger ms-2" 
          onClick={() => eliminarProducto(id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ItemCarrito;
