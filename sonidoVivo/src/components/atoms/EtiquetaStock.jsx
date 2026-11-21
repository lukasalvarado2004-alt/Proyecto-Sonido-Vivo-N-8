import React from 'react';

export default function EtiquetaStock(props) {
  if (props.stock === undefined || props.stock === null) return null;

  const colorBadge = props.stock > 5 
    ? 'bg-success' 
    : props.stock > 0 
      ? 'bg-warning text-dark' 
      : 'bg-danger';

  const textoBadge = props.stock > 0 ? `${props.stock} un.` : 'Agotado';

  return (
    <span className={`badge ${colorBadge}`}>
      {textoBadge}
    </span>
  );
}