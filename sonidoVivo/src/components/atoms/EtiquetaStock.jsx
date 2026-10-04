import React from 'react';

export default function EtiquetaStock({ stock }) {
  if (stock === undefined || stock === null) return null;

  // Cambia el color según la disponibilidad
  const colorBadge = stock > 5 
    ? 'bg-success' 
    : stock > 0 
      ? 'bg-warning text-dark' 
      : 'bg-danger';

  const textoBadge = stock > 0 ? `${stock} un.` : 'Agotado';

  return (
    <span className={`badge ${colorBadge}`}>
      {textoBadge}
    </span>
  );
}