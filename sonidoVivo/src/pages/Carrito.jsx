import React from "react";
import { useContenidoCarrito } from "../data/ContenidoCarrito";
import ItemCarrito from "../components/molecules/ItemCarrito";
import Boton from "../components/atoms/Boton";

function Carrito() {
  const { items, precioTotal, vaciarCarrito } = useContenidoCarrito();

  return (
    <div className="container py-5 text-white">
      <div className="card bg-dark text-white p-4 shadow-lg border-secondary">
        <div className="card-header border-secondary mb-3">
          <h2 className="h4 mb-0 fw-bold text-warning">🛒 Tu Carrito de Compras</h2>
        </div>

        <div className="card-body">
          {items.length === 0 ? (
            <p className="text-muted text-center py-4 fs-5">El carrito está completamente vacío.</p>
          ) : (
            <div className="d-flex flex-column">
              {items.map((item) => (
                <ItemCarrito key={item.id || item.nombre} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="card-footer border-secondary pt-3 mt-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fs-5 text-muted">Total General:</span>
              <strong className="fs-3 text-warning">${precioTotal.toLocaleString()}</strong>
            </div>
            <div className="d-flex gap-3 justify-content-end">
              <Boton 
                textoBoton="Vaciar Lista" 
                alHacerClic={vaciarCarrito} 
                variante="outline-danger" 
              />
              <Boton 
                textoBoton="Finalizar Pago" 
                variante="warning" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;
