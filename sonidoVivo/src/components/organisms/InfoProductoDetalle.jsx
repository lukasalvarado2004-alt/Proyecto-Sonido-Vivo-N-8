import React, { useState } from 'react';
import ImagenProducto from '../atoms/ImagenProducto';
import Precio from '../atoms/Precio';
import EtiquetaStock from '../atoms/EtiquetaStock';
import Boton from '../atoms/Boton';
import { useAgregarAlCarrito } from "../../hooks/useAgregarAlCarrito";

export default function InfoProductoDetalle(props) {
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
  const agregarAlCarrito = useAgregarAlCarrito();

  const producto = props.producto;

  if (!producto) return <p>Cargando producto...</p>;

  const tieneStock = producto.stock > 0;

  const manejarClickComprar = (e) => {
    if (props.onComprar) props.onComprar();
    agregarAlCarrito(producto, 1, e);
    setMensajeConfirmacion(`¡"${producto.nombre}" se añadió al carrito!`);
  };

  return (
    <div className="row g-4 my-2">
     
      <div className="col-12 col-md-6 text-center">
        <div className="border rounded p-4 bg-light shadow-sm">
          <ImagenProducto 
            urlImagen={producto.imagen} 
            altTexto={producto.nombre} 
          />
        </div>
      </div>

      
      <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className="text-warning text-uppercase fw-bold small">{producto.marca}</span>
            <EtiquetaStock stock={producto.stock} />
          </div>

          <h2 className="fw-bold mb-1">{producto.nombre}</h2>
          <p className="text-secondary small mb-3">Modelo: {producto.modelo || 'N/A'}</p>

          <div className="mb-4">
            <Precio monto={producto.precio} />
          </div>

          <p className="lh-base text-body mb-4">
            {producto.descripcion || 'Sin descripción disponible para este producto.'}
          </p>
        </div>

       
        <div className="border-top pt-3">
          {tieneStock ? (
            <div className="d-flex flex-column gap-2">
              <Boton
                textoBoton="Añadir al carrito"
                variante="warning"
                esBloque={true}
                alHacerClic={manejarClickComprar}
              />

              {mensajeConfirmacion && (
                <div className="alert alert-success py-2 px-3 small text-center mb-0 mt-2" role="alert">
                  {mensajeConfirmacion}
                </div>
              )}
            </div>
          ) : (
            <Boton
              textoBoton="Producto Agotado"
              variante="secondary"
              esBloque={true}
              disabled={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}