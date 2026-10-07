import React from "react";
import { useContenidoCarrito } from "../../data/ContenidoCarrito";

function ItemCarrito({ item }) {
  const { actualizarCantidad, eliminarProducto } = useContenidoCarrito();

  return (
    <div className="d-flex align-items-center justify-content-between p-3 bg-secondary rounded mb-2 text-white">
      <div className="d-flex align-items-center gap-3">
        <img src={item.imagen} alt={item.nombre} style={{ width: "50px", height: "50px", objectFit: "cover" }} className="rounded" />
        <div>
          <h6 className="mb-0 fw-bold">{item.nombre}</h6>
          <small className="text-light">${item.precio.toLocaleString()} x {item.cantidad}</small>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-sm btn-light py-0 px-2" onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>-</button>
        <span>{item.cantidad}</span>
        <button className="btn btn-sm btn-light py-0 px-2" onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
        <button className="btn btn-sm btn-danger ms-2" onClick={() => eliminarProducto(item.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default ItemCarrito;
