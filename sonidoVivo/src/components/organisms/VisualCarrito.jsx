import React from "react";
import { useContenidoCarrito } from "../../data/ContenidoCarrito";
import ItemCarrito from "../molecules/ItemCarrito";
import Boton from "../atoms/Boton";

function VisualCarrito() {
  const { items, precioTotal, vaciarCarrito } = useContenidoCarrito();

  return (
    <div className="card bg-dark text-white p-4 shadow-lg border-secondary">
      <div className="card-header border-secondary d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0 fw-bold text-warning">🛒 Tu Carrito de Compras</h2>
      </div>

      <div className="card-body">
        {items.length === 0 ? (
          <p className="text-muted text-center py-4 fs-5">El carrito está completamente vacío.</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {items.map((item) => (
              <ItemCarrito key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="card-footer border-secondary pt-3 mt-2">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="fs-5 text-muted">Subtotal a pagar:</span>
            <strong className="fs-3 text-warning">${precioTotal.toLocaleString()}</strong>
          </div>
          <div className="d-flex gap-3 justify-content-end">
            <Boton 
              textoBoton="Vaciar Lista" 
              alHacerClic={vaciarCarrito} 
              variante="outline-danger" 
            />
            <Boton 
              textoBoton="Finalizar y Pagar" 
              variante="warning" 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VisualCarrito;
