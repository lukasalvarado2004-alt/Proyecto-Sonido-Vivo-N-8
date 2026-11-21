import React from 'react';

export default function Error(props) {
 
  const variante = props.variante || "danger";

  if (!props.mensaje) return null;

  return (
    <div className={`alert alert-${variante} py-2 px-3 small text-center mb-1`} role="alert">
      {props.mensaje}
    </div>
  );
}
