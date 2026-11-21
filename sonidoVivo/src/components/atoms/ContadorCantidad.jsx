import React from 'react';

export default function ContadorCantidad(props) {
  const cantidad = props.cantidad ?? 1;
  const variante = props.variante || 'secondary';

  return (
    <span className={`badge bg-${variante} fs-6 px-3 py-2 fw-bold`}>
      {cantidad} {cantidad === 1 ? 'unidad' : 'unidades'}
    </span>
  );
}