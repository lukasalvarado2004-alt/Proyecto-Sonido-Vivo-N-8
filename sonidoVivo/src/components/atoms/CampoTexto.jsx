import React from 'react';

export default function CampoTexto(props) {
  return (
    <input
      type={props.tipo || 'text'}
      value={props.valor || ''} // Evita advertencias de inputs descontrolados
      // 🛠️ EXTRACCIÓN REAL: Captura el valor del input nativo e.target.value al escribir
      onChange={(e) => props.alCambiar(e.target.value)} 
      placeholder={props.placeholder}
      className="formulario-input-native"
    />
  );
}
