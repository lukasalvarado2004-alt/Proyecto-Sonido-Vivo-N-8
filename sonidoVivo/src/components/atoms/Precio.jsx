import React from 'react';

export default function Precio({ monto }) {
  // Formateo automático de moneda chilena
  const precioFormateado = typeof monto === 'number'
    ? `$${monto.toLocaleString('es-CL')}`
    : '$0';

  return (
    <span className="fw-bold fs-5 text-purple">
      {precioFormateado}
    </span>
  );
}