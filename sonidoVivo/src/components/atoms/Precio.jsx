import React from 'react';

export default function Precio(props) {
  const monto = props.monto;
  const precioAnterior = props.precioAnterior;

  const precioFormateado = typeof monto === 'number'
    ? `$${monto.toLocaleString('es-CL')}`
    : '$0';

  const precioAnteriorFormateado = typeof precioAnterior === 'number'
    ? `$${precioAnterior.toLocaleString('es-CL')}`
    : null;

  return (
    <div className="d-flex align-items-center gap-2 flex-wrap">
      <span className="fw-bold fs-5 text-purple">
        {precioFormateado}
      </span>
      {precioAnteriorFormateado && (
        <span className="text-muted text-decoration-line-through small">
          {precioAnteriorFormateado}
        </span>
      )}
    </div>
  );
}