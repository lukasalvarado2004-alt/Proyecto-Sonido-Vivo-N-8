import React from "react";
import { Link } from "react-router-dom";
import Boton from "../atoms/Boton";
import ImagenProducto from "../atoms/ImagenProducto";
import Precio from "../atoms/Precio";
import EtiquetaStock from "../atoms/EtiquetaStock";
import { useAgregarAlCarrito } from "../../hooks/useAgregarAlCarrito";

function TarjetaProducto(props) {
  const tieneStock = props.stock > 0;
  const agregarAlCarrito = useAgregarAlCarrito();

  const manejarClickComprar = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    agregarAlCarrito(props);
  };

  return (
    <div className="card tarjeta-producto-custom shadow-sm h-100 d-flex flex-column p-3">
      
      {/* ZONA 1: Clic en cualquier parte de la tarjeta -> Va a Detalle */}
      <Link 
        to={`/producto/${props.id}`} 
        className="flex-grow-1 text-decoration-none text-dark d-flex flex-column"
      >
        <ImagenProducto 
          urlImagen={props.imagen} 
          altTexto={props.nombre} 
        />

        <div className="card-body d-flex flex-column p-0 mt-3 flex-grow-1">
          <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
            <div className="d-flex align-items-center gap-1 flex-wrap">
              <h5 className="card-title fs-6 mb-0 fw-bold">{props.nombre}</h5>
              {props.esOferta && (
                <span className="badge bg-danger text-white fw-bold">🔥 Oferta</span>
              )}
            </div>
            <EtiquetaStock stock={props.stock} />
          </div>

          <p className="card-text text-muted small mb-2">
            {props.marca} {props.modelo && `· ${props.modelo}`}
          </p>

          <div className="mt-auto mb-2">
            <Precio monto={props.precio} precioAnterior={props.precioAnterior} />
          </div>
        </div>
      </Link>

      {/* ZONA 2: Clic en el Botón -> Agrega al Carrito */}
      <div className="mt-auto pt-2">
        <Boton 
          textoBoton={tieneStock ? "Agregar al Carrito" : "Sin Stock"} 
          alHacerClic={manejarClickComprar} 
          variante={tieneStock ? "warning" : "secondary"} 
          disabled={!tieneStock}
        />
      </div>

    </div>
  );
}

export default TarjetaProducto;