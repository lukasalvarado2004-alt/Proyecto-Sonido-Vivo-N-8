import React from "react";
// Importamos useNavigate para cambiar de página
import { useNavigate } from "react-router-dom";
import { useContenidoCarrito } from "../context/ContenidoCarrito";
import { ItemCarrito } from "../components/molecules/ItemCarrito";
import Boton from "../components/atoms/Boton";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useTituloPagina } from '../hooks/useTituloPagina';
// IMPORTANTE: Importamos la función desde utilidades
import { irAConfirmarCompra } from "../utils/compraUtils";

function Carrito(props) {
  const { items, precioTotal, vaciarCarrito } = useContenidoCarrito();
  // Inicializamos el hook de navegación
  const navigate = useNavigate();

  useTituloPagina('Carrito');

  return (
    <PlantillaPublica>
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
                  <ItemCarrito key={item.producto.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="card-footer border-secondary pt-3 mt-3">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fs-5 text-muted">Total General:</span>
                <strong className="fs-3 text-warning">${precioTotal.toLocaleString('es-CL')}</strong>
              </div>
              <div className="d-flex gap-3 justify-content-end">
                <Boton 
                  textoBoton="Vaciar Lista" 
                  alHacerClic={vaciarCarrito} 
                  variante="outline-danger" 
                />
                {/* CORREGIDO: Conectamos la acción al hacer clic usando la utilidad */}
                <Boton 
                  textoBoton="Finalizar Pago" 
                  alHacerClic={() => irAConfirmarCompra(navigate)} 
                  variante="warning" 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </PlantillaPublica>
  );
}

export default Carrito;
