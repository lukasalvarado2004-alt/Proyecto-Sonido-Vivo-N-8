import React from 'react';

export default function CampoTexto(props) {
  return (
    <input
      type={props.tipo || 'text'}
      value={props.valor || ''} // Evita advertencias de inputs descontrolados
     r
      onChange={(e) => props.alCambiar(e.target.value)} 
      placeholder={props.placeholder}
      className="formulario-input-native"
    />
  );
}
