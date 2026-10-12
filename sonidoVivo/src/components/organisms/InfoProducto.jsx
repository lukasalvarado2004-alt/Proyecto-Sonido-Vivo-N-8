import React, { useState } from 'react';
import ImagenProducto from '../atoms/ImagenProducto';
import Precio from '../atoms/Precio';
import EtiquetaStock from '../atoms/EtiquetaStock';
import Boton from '../atoms/Boton';
import SelectorCantidad from '../molecules/SelectorCantidad';

export default function InfoProducto(props) {
  const [cantidad, setCantidad] = useState(1);

  // Leemos la propiedad desde props.producto
  const producto = props.producto;

  if (!producto) return <p>Cargando producto...</p>;

  const tieneStock = producto.stock > 0;

  return (
    <div className="row g-4 my-2">
      {/* Columna Izquierda: Galería/Imagen */}
      <div className="col-12 col-md-6 text-center">
        <div className="border rounded p-4 bg-light shadow-sm">
          <ImagenProducto urlImagen={producto.imagen} altTexto={producto.nombre} />
        </div>
      </div>

      {/* Columna Derecha: Información del Producto */}
      <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className="text-muted text-uppercase fw-bold small">{producto.marca}</span>
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

        {/* Acciones e interacción con el carrito */}
        <div className="border-top pt-3">
          {tieneStock ? (
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <span className="fw-semibold">Cantidad:</span>
                <SelectorCantidad
                  cantidad={cantidad}
                  onIncrementar={() => setCantidad(prev => Math.min(prev + 1, producto.stock))}
                  onDecrementar={() => setCantidad(prev => Math.max(prev - 1, 1))}
                  maxStock={producto.stock}
                />
              </div>

              <Boton
                textoBoton={`Añadir al carrito (${cantidad})`}
                variante="warning"
                esBloque={true}
                alHacerClic={() => props.onAgregarAlCarrito(producto, cantidad)}
              />
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