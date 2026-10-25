import React from 'react';

export default function CampoTexto(props) {
  return (
    <input
      id={props.id}
      type={props.tipo || 'text'}
      value={props.valor || ''}
      onChange={(e) => props.alCambiar && props.alCambiar(e.target.value)} 
      placeholder={props.placeholder}
      className="formulario-input-nativo"
    />
  );
}